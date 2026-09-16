import { useEffect, useRef, useState } from 'react';
import { Howl } from 'howler';
import { tracks } from '../data/tracks';

export function BrokenFM() {
  const [trackIndex, setTrackIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const soundRef = useRef<Howl | null>(null);
  const track = tracks[trackIndex];

  useEffect(() => {
    soundRef.current?.unload();
    soundRef.current = null;
    setPlaying(false);

    if (!track.src) return;

    soundRef.current = new Howl({
      src: [track.src],
      html5: true,
      volume: 0.45,
      onend: () => setTrackIndex((current) => (current + 1) % tracks.length),
    });

    return () => soundRef.current?.unload();
  }, [track]);

  const toggle = () => {
    if (!soundRef.current) return;
    if (playing) soundRef.current.pause();
    else soundRef.current.play();
    setPlaying((value) => !value);
  };

  const next = () => setTrackIndex((current) => (current + 1) % tracks.length);
  const previous = () => setTrackIndex((current) => (current - 1 + tracks.length) % tracks.length);

  return (
    <aside className="broken-fm" aria-label="BrokenFM player">
      <div className="fm-header">
        <span>BROKEN</span><strong>FM</strong>
        <span className="frequency">87.6</span>
      </div>
      <div className="track-screen">
        <span className="track-number">0{trackIndex + 1}</span>
        <div>
          <strong>{track.title}</strong>
          <small>{track.artist}</small>
        </div>
      </div>
      <div className="equalizer" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => <i key={index} />)}
      </div>
      <div className="fm-controls">
        <button onClick={previous} aria-label="Previous track">◀◀</button>
        <button onClick={toggle} disabled={!track.src} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? 'Ⅱ' : '▶'}
        </button>
        <button onClick={next} aria-label="Next track">▶▶</button>
      </div>
      {!track.src && <p className="fm-note">ADD YOUR TRACKS // public/assets/audio</p>}
    </aside>
  );
}
