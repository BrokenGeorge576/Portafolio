// Only the official IFrame API surface used by BrokenFM.
export interface YouTubePlayer {
  cueVideoById(videoId: string): void;
  loadVideoById(videoId: string): void;
  playVideo(): void;
  pauseVideo(): void;
  setVolume(volume: number): void;
  getVolume(): number;
  isMuted(): boolean;
  unMute(): void;
  getVideoData(): { video_id?: string };
  getIframe(): HTMLIFrameElement;
  destroy(): void;
}

export interface YouTubeAPI {
  Player: new (host: HTMLElement, options: {
    width: string;
    height: string;
    playerVars: { autoplay: 0; controls: 1; playsinline: 1; origin: string; rel: 0 };
    events: {
      onReady(event: { target: YouTubePlayer }): void;
      onStateChange(event: { target: YouTubePlayer; data: number }): void;
      onError(event: { target: YouTubePlayer; data: number }): void;
      onAutoplayBlocked(event: { target: YouTubePlayer }): void;
    };
  }) => YouTubePlayer;
}

declare global {
  interface Window {
    YT?: YouTubeAPI;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YouTubeAPI> | undefined;

export function loadYouTubeAPI(): Promise<YouTubeAPI> {
  if (window.YT?.Player) return Promise.resolve(window.YT);
  if (apiPromise) return apiPromise;

  apiPromise = new Promise<YouTubeAPI>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://www.youtube.com/iframe_api';
    script.async = true;
    const previousCallback = window.onYouTubeIframeAPIReady;
    const cleanup = () => {
      window.clearTimeout(timeout);
      script.onerror = null;
      if (window.onYouTubeIframeAPIReady === onReady) {
        window.onYouTubeIframeAPIReady = previousCallback;
      }
    };
    const fail = () => {
      cleanup();
      script.remove();
      reject(new Error('YouTube could not connect. Check your connection and retry.'));
    };
    const onReady = () => {
      cleanup();
      if (window.YT?.Player) resolve(window.YT);
      else reject(new Error('YouTube player is unavailable.'));
      previousCallback?.();
    };
    const timeout = window.setTimeout(fail, 15000);
    window.onYouTubeIframeAPIReady = onReady;
    script.onerror = fail;
    document.head.append(script);
  }).catch((error: unknown) => {
    apiPromise = undefined;
    throw error;
  });
  return apiPromise;
}
