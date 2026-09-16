import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { tracks } from '../data/tracks';
import { BrokenFMController } from '../services/brokenFM';
import { loadYouTubeAPI, type YouTubePlayer } from '../services/youtube';

export function useBrokenFM() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [controller] = useState(() => new BrokenFMController(tracks));
  const [attempt, setAttempt] = useState(0);
  const state = useSyncExternalStore(controller.subscribe, controller.getSnapshot);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || !tracks.length) return;
    let cancelled = false;
    let player: YouTubePlayer | undefined;
    let volumeTimer: number | undefined;
    let readyTimer: number | undefined;
    // YouTube replaces this child, never the DOM node owned by React.
    const mount = document.createElement('div');
    host.append(mount);
    controller.disconnect();

    loadYouTubeAPI().then((api) => {
      if (cancelled) return;
      readyTimer = window.setTimeout(() => {
        if (!cancelled) controller.connectionFailed('YouTube is taking too long. Check your connection and retry.');
      }, 20000);
      player = new api.Player(mount, {
        width: '100%', height: '100%',
        playerVars: { autoplay: 0, controls: 1, playsinline: 1, origin: window.location.origin, rel: 0 },
        events: {
          onReady: ({ target }) => {
            if (cancelled) return;
            window.clearTimeout(readyTimer);
            target.getIframe().title = 'BrokenFM — YouTube video player';
            controller.connect(target);
            volumeTimer = window.setInterval(() => controller.syncVolume(), 500);
          },
          onStateChange: ({ target, data }) => { if (!cancelled) controller.onStateChange(target, data); },
          onError: ({ data }) => { if (!cancelled) controller.onError(data); },
          onAutoplayBlocked: () => { if (!cancelled) controller.onBlocked(); },
        },
      });
    }).catch((error: unknown) => {
      if (!cancelled) controller.connectionFailed(error instanceof Error ? error.message : 'YouTube is unavailable.');
    });

    return () => {
      cancelled = true;
      window.clearTimeout(readyTimer);
      window.clearInterval(volumeTimer);
      player?.destroy();
      host.replaceChildren();
      controller.disconnect();
    };
  }, [controller, attempt]);

  return {
    ...state,
    track: tracks[state.trackIndex],
    hasTracks: tracks.length > 0,
    hostRef,
    toggle: controller.toggle,
    next: controller.next,
    previous: controller.previous,
    setVolume: controller.setVolume,
    reconnect: () => setAttempt((value) => value + 1),
  };
}
