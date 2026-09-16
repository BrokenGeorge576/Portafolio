import type { RefObject } from 'react';

type Props = { hostRef: RefObject<HTMLDivElement | null>; hasTracks: boolean };

export function YouTubeScreen({ hostRef, hasTracks }: Props) {
  return (
    <div className="youtube-screen" aria-label="BrokenFM video screen">
      <div className="youtube-mount" ref={hostRef} />
      {!hasTracks && <span className="youtube-empty">NO SIGNAL</span>}
    </div>
  );
}
