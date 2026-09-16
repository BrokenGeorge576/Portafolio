import type { Track } from '../data/tracks';
import type { YouTubePlayer } from './youtube';

export type RadioStatus = 'loading' | 'ready' | 'playing' | 'paused' | 'buffering' | 'blocked' | 'error';
export type RadioState = {
  trackIndex: number;
  status: RadioStatus;
  volume: number;
  ready: boolean;
  message: string;
};

// Playback intent is separate from the observed YouTube state. Paused navigation
// only cues videos; playing navigation and ENDED load the next video immediately.
export class BrokenFMController {
  private state: RadioState = { trackIndex: 0, status: 'loading', volume: 45, ready: false, message: '' };
  private listeners = new Set<() => void>();
  private player: YouTubePlayer | null = null;
  private wantsPlayback = false;
  private playedCurrent = false;

  constructor(private readonly playlist: readonly Track[]) {}

  getSnapshot = () => this.state;
  subscribe = (listener: () => void) => {
    this.listeners.add(listener);
    return () => { this.listeners.delete(listener); };
  };

  private update(patch: Partial<RadioState>) {
    this.state = { ...this.state, ...patch };
    this.listeners.forEach((listener) => listener());
  }

  private currentTrack() { return this.playlist[this.state.trackIndex]; }

  connect(player: YouTubePlayer) {
    this.player = player;
    this.wantsPlayback = false;
    this.playedCurrent = false;
    player.setVolume(this.state.volume);
    const track = this.currentTrack();
    this.update({ ready: Boolean(track), status: 'ready', message: track ? '' : 'No tracks configured.' });
    if (track) player.cueVideoById(track.youtubeVideoId);
  }

  disconnect() {
    this.player = null;
    this.wantsPlayback = false;
    this.playedCurrent = false;
    this.update({ ready: false, status: 'loading', message: '' });
  }

  connectionFailed(message: string) {
    this.wantsPlayback = false;
    this.update({ ready: false, status: 'error', message });
  }

  toggle = () => {
    if (!this.player || !this.state.ready) return;
    if (this.wantsPlayback) {
      this.wantsPlayback = false;
      this.player.pauseVideo();
    } else {
      const retryVideo = this.state.status === 'error';
      this.wantsPlayback = true;
      this.update({ status: 'buffering', message: '' });
      if (retryVideo) this.player.loadVideoById(this.currentTrack().youtubeVideoId);
      else this.player.playVideo();
    }
  };

  private select(offset: number, play = this.wantsPlayback) {
    if (!this.playlist.length) return;
    const trackIndex = (this.state.trackIndex + offset + this.playlist.length) % this.playlist.length;
    this.wantsPlayback = play;
    this.playedCurrent = false;
    this.update({ trackIndex, status: this.state.ready ? (play ? 'buffering' : 'ready') : 'loading', message: '' });
    if (!this.player || !this.state.ready) return;
    const videoId = this.currentTrack().youtubeVideoId;
    if (play) this.player.loadVideoById(videoId);
    else this.player.cueVideoById(videoId);
  }

  next = () => this.select(1);
  previous = () => this.select(-1);

  setVolume = (volume: number) => {
    const value = Math.max(0, Math.min(100, volume));
    this.update({ volume: value });
    this.player?.setVolume(value);
    if (value > 0) this.player?.unMute();
  };

  syncVolume() {
    if (!this.player || !this.state.ready) return;
    const volume = this.player.isMuted() ? 0 : Math.round(this.player.getVolume());
    if (Number.isFinite(volume) && volume !== this.state.volume) this.update({ volume });
  }

  private matchesCurrent(player: YouTubePlayer) {
    return player === this.player && player.getVideoData().video_id === this.currentTrack()?.youtubeVideoId;
  }

  onStateChange(player: YouTubePlayer, state: number) {
    // Late events from a previous track must not advance or relabel this one.
    if (!this.matchesCurrent(player)) return;
    if (state === 0 && this.playedCurrent) {
      this.playedCurrent = false;
      this.select(1, true);
    } else if (state === 1) {
      this.wantsPlayback = true;
      this.playedCurrent = true;
      this.update({ status: 'playing', message: '' });
    } else if (state === 2) {
      this.wantsPlayback = false;
      this.update({ status: 'paused' });
    } else if (state === 3) {
      this.wantsPlayback = true;
      this.update({ status: 'buffering', message: '' });
    } else if (state === 5) {
      this.update({ status: this.wantsPlayback ? 'buffering' : 'ready' });
    }
  }

  onBlocked() {
    this.wantsPlayback = false;
    this.update({ status: 'blocked', message: 'Press play in the video screen to continue.' });
  }

  onError(code: number) {
    this.wantsPlayback = false;
    const message = code === 101 || code === 150
      ? 'This video cannot play here. Try the next track or open YouTube.'
      : code === 100 ? 'This video is unavailable. Try another track.'
      : code === 153 ? 'YouTube could not verify this site. Open it via localhost or HTTPS.'
      : 'YouTube could not play this video. Retry or choose another track.';
    this.update({ status: 'error', message });
  }
}
