import { useEffect, useRef, useState } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { StartScreen } from './components/StartScreen';

export default function App() {
  const [started, setStarted] = useState(false);
  const appRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (started) appRef.current?.focus();
  }, [started]);

  return (
    <main className="app-shell" ref={appRef} tabIndex={-1} aria-label="Jorge — Night Drive">
      {started ? <GameCanvas active /> : <StartScreen onStart={() => setStarted(true)} />}
    </main>
  );
}
