type Props = { onStart: () => void };

export function StartScreen({ onStart }: Props) {
  return (
    <section className="start-screen" aria-labelledby="welcome-title">
      <div className="welcome-panel">
        <header className="welcome-header">
          <p className="eyebrow">BROKEN CITY // 00:00</p>
          <span className="welcome-led" aria-hidden="true" />
        </header>
        <div className="welcome-content">
          <h1 id="welcome-title"><span className="welcome-name">JORGE //</span><span>NIGHT DRIVE</span></h1>
          <p className="subtitle">A journey through the things I've built.</p>
          <button className="start-button" onClick={onStart}>START ENGINE <span aria-hidden="true">↗</span></button>
        </div>
        <div className="welcome-road" aria-hidden="true"><i /><i /><i /><i /></div>
        <footer className="welcome-routes" aria-label="Destinations">
          <span>← QUICK VIEW</span><span>↑ PROJECTS</span><span>EXPERIENCE →</span>
        </footer>
      </div>
    </section>
  );
}
