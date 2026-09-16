import { BrokenFM } from './BrokenFM';

export function CarDashboard() {
  return (
    <section className="car-dashboard" aria-label="Car dashboard — parked, decorative instruments">
      <div className="instrument-binnacle">
        <div className="dash-indicators" aria-label="Parking brake engaged, headlights on">
          <span className="indicator-dim">◀</span>
          <span className="indicator-amber">(P) PARK</span>
          <span className="indicator-cyan">LIGHTS</span>
          <span className="indicator-dim">▶</span>
        </div>
        <div className="gauges">
          <div className="analog-gauge" aria-hidden="true">
            <span className="gauge-title">RPM × 1000</span>
            <div className="gauge-ticks" />
            <span className="gauge-min">0</span><span className="gauge-max">8</span>
            <i className="gauge-needle" />
          </div>
          <div className="speed-display" aria-label="Speed 0 kilometers per hour, gear park">
            <span className="speed-value">000</span>
            <span className="speed-unit">km/h <b>P</b></span>
          </div>
          <div className="fuel-display" aria-hidden="true">
            <span>FUEL</span>
            <div className="fuel-bars">▮▮▮▮<span>▮</span></div>
            <span>E ── F</span>
          </div>
        </div>
        <div className="dash-footer"><span>ODO 000000</span><span>ENGINE IDLE</span></div>
        <div className="steering-wheel" aria-hidden="true">
          <span className="wheel-stitching" />
          <span className="wheel-center-mark" />
          <span className="wheel-spoke wheel-spoke-left"><i /><i /></span>
          <span className="wheel-spoke wheel-spoke-right"><i /><i /></span>
          <span className="wheel-spoke wheel-spoke-bottom" />
          <div className="wheel-hub">
            <span className="wheel-bolt wheel-bolt-left" />
            <span className="wheel-emblem">BC</span>
            <span className="wheel-bolt wheel-bolt-right" />
            <span className="wheel-hub-label">DRIVE</span>
          </div>
        </div>
      </div>
      <div className="center-console">
        <div className="console-top" aria-hidden="true"><span className="air-vent" /><span className="hazard-light">△</span><span className="air-vent" /></div>
        <BrokenFM />
      </div>
      <div className="passenger-trim" aria-hidden="true"><div className="air-vent" /><span>NIGHT<br />EDITION</span><div className="glovebox" /></div>
    </section>
  );
}
