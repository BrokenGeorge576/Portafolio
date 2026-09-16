import { useBrokenFM } from '../hooks/useBrokenFM';
import { YouTubeScreen } from './YouTubeScreen';
import type { RadioStatus } from '../services/brokenFM';

const statusLabels: Record<RadioStatus, string> = {
  loading: 'CONNECTING...', ready: 'READY TO PLAY', playing: 'PLAYING',
  paused: 'PAUSED', buffering: 'TUNING...', blocked: 'PRESS VIDEO PLAY', error: 'NO SIGNAL',
};

export function BrokenFM() {
  const radio = useBrokenFM();
  const playing = radio.status === 'playing';
  const canPause = playing || radio.status === 'buffering';

  return (
    <aside className={`broken-fm${playing ? ' is-playing' : ''}`} aria-label="BrokenFM player">
      <div className="fm-header">
        <span>BROKEN</span><strong>FM</strong>
        <span className="frequency">87.6 <small>MHz</small></span>
      </div>
      <div className="fm-information">
        <div className="track-screen">
          <span className="track-number">{String(radio.trackIndex + 1).padStart(2, '0')}</span>
          <div className="track-info">
            <strong>{radio.track?.title ?? 'NO TRACKS'}</strong>
            <small>{radio.track?.artist ?? 'BROKENFM'}</small>
          </div>
        </div>
        <div className="equalizer" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, index) => <i key={index} />)}
        </div>
        <p className="fm-status" role="status">{radio.hasTracks ? statusLabels[radio.status] : 'NO SIGNAL'}</p>
        <span className="fm-source">{radio.track?.station ?? 'NIGHT DRIVE'}<br />YouTube</span>
      </div>
      <YouTubeScreen hostRef={radio.hostRef} hasTracks={radio.hasTracks} />
      <div className="fm-controls">
        <button onClick={radio.previous} disabled={!radio.hasTracks} aria-label="Previous track">◀◀</button>
        <button onClick={radio.toggle} disabled={!radio.ready} aria-label={canPause ? 'Pause' : 'Play'}>
          {canPause ? 'Ⅱ' : '▶'}
        </button>
        <button onClick={radio.next} disabled={!radio.hasTracks} aria-label="Next track">▶▶</button>
      </div>
      <label className="volume-control">
        <span>VOL</span>
        <input type="range" min="0" max="100" step="1" value={radio.volume}
          onChange={(event) => radio.setVolume(Number(event.target.value))} aria-label="Radio volume" />
        <output>{radio.volume}</output>
      </label>
      {radio.message && (
        <div className="fm-feedback">
          <p>{radio.message}</p>
          {!radio.ready && <button onClick={radio.reconnect}>RECONNECT</button>}
          {radio.status === 'error' && radio.track && (
            <a href={`https://www.youtube.com/watch?v=${radio.track.youtubeVideoId}`} target="_blank" rel="noopener noreferrer">OPEN YOUTUBE ↗</a>
          )}
        </div>
      )}
    </aside>
  );
}
