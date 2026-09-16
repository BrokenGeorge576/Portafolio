import { useState } from 'react';
import { GameCanvas } from './components/GameCanvas';
import { BrokenFM } from './components/BrokenFM';

export default function App() {
  const [started, setStarted] = useState(false);

  return (
    <main className="app-shell">
      <GameCanvas active={started} />
      <div className="crt-overlay" aria-hidden="true" />

      {!started && (
        <section className="start-screen">
          <p className="eyebrow">BROKEN CITY // 00:00</p>
          <h1>JORGE // NIGHT DRIVE</h1>
          <p className="subtitle">A journey through the things I've built.</p>
          <button className="start-button" onClick={() => setStarted(true)}>
            START ENGINE
          </button>
          <p className="hint">← QUICK VIEW · ↑ EXPERIENCE · → PROJECTS</p>
        </section>
      )}

      {started && (
        <>
          <div className="route-hint">← QUICK VIEW&nbsp;&nbsp; ↑ EXPERIENCE&nbsp;&nbsp; → PROJECTS</div>
          <BrokenFM />
        </>
      )}
    </main>
  );
}
