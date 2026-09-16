import { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { CrossroadsScene } from '../game/scenes/CrossroadsScene';

type Props = { active: boolean };

export function GameCanvas({ active }: Props) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<Phaser.Game | null>(null);

  useEffect(() => {
    if (!hostRef.current || gameRef.current) return;

    gameRef.current = new Phaser.Game({
      type: Phaser.AUTO,
      parent: hostRef.current,
      width: 640,
      height: 360,
      backgroundColor: '#090211',
      pixelArt: true,
      antialias: false,
      roundPixels: true,
      scene: [CrossroadsScene],
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
    });

    return () => {
      gameRef.current?.destroy(true);
      gameRef.current = null;
    };
  }, []);

  useEffect(() => {
    gameRef.current?.registry.set('portfolio-started', active);
  }, [active]);

  return <div ref={hostRef} className="game-host" aria-label="Interactive portfolio world" />;
}
