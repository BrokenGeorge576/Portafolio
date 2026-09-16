import Phaser from 'phaser';

const C = {
  sky: 0x090211,
  purple: 0x5f1b8f,
  magenta: 0xff2bd6,
  violet: 0x8b5cf6,
  cyan: 0x53e7ff,
  asphalt: 0x12091d,
  glass: 0x190824,
  dark: 0x07030b,
  white: 0xf6e9ff,
};

export class CrossroadsScene extends Phaser.Scene {
  constructor() {
    super('Crossroads');
  }

  create() {
    this.cameras.main.setBackgroundColor(C.sky);
    this.drawSky();
    this.drawCity();
    this.drawRoads();
    this.drawSigns();
    this.drawCarInterior();
    this.drawRain();
  }

  private drawSky() {
    const g = this.add.graphics();
    g.fillStyle(0x130421, 1).fillRect(0, 0, 640, 190);
    g.fillStyle(0x2b0738, 0.65).fillRect(0, 70, 640, 120);
    g.fillStyle(C.magenta, 0.12).fillRect(0, 145, 640, 45);

    for (let x = 0; x < 640; x += 32) {
      g.fillStyle(x % 64 === 0 ? C.violet : C.magenta, 0.08).fillRect(x, 0, 16, 190);
    }
  }

  private drawCity() {
    const g = this.add.graphics();
    const buildings = [
      [0, 78, 58, 120], [47, 48, 74, 150], [108, 93, 54, 105],
      [154, 33, 62, 165], [212, 74, 48, 124], [258, 20, 58, 178],
      [316, 50, 42, 148], [358, 62, 70, 136], [426, 26, 66, 172],
      [486, 84, 48, 114], [528, 42, 72, 156], [590, 96, 50, 102],
    ];

    buildings.forEach(([x, y, w, h], index) => {
      g.fillStyle(index % 2 ? 0x12051d : 0x180624, 1).fillRect(x, y, w, h);
      g.lineStyle(1, index % 3 === 0 ? C.magenta : C.violet, 0.3).strokeRect(x, y, w, h);
      for (let wy = y + 10; wy < y + h - 8; wy += 13) {
        for (let wx = x + 8; wx < x + w - 6; wx += 13) {
          const lit = ((wx + wy + index * 7) % 4) !== 0;
          g.fillStyle(lit ? (index % 2 ? C.magenta : C.cyan) : 0x24102f, lit ? 0.55 : 0.3);
          g.fillRect(wx, wy, 4, 2);
        }
      }
    });

    g.fillStyle(C.magenta, 0.8).fillRect(315, 14, 3, 176);
    g.fillStyle(C.violet, 0.35).fillRect(309, 14, 15, 176);
  }

  private drawRoads() {
    const g = this.add.graphics();
    g.fillStyle(C.asphalt, 1).fillRect(0, 188, 640, 172);

    // left branch
    g.fillStyle(0x160a20, 1);
    g.fillTriangle(290, 190, 0, 360, 222, 360);
    // center branch
    g.fillStyle(0x100717, 1);
    g.fillTriangle(292, 190, 348, 190, 430, 360);
    g.fillTriangle(292, 190, 210, 360, 430, 360);
    // right branch
    g.fillStyle(0x160a20, 1);
    g.fillTriangle(350, 190, 418, 360, 640, 360);

    g.lineStyle(2, C.magenta, 0.75).lineBetween(294, 193, 226, 360);
    g.lineStyle(2, C.cyan, 0.75).lineBetween(347, 193, 414, 360);

    for (let y = 212; y < 350; y += 28) {
      const half = Math.floor((y - 190) * 0.25) + 2;
      g.fillStyle(C.violet, 0.8).fillRect(320 - half, y, half * 2, 3);
    }

    // wet road reflections
    for (let y = 205; y < 350; y += 11) {
      const alpha = 0.08 + ((y % 33) / 330);
      g.fillStyle(y % 22 === 0 ? C.cyan : C.magenta, alpha).fillRect(50, y, 540, 2);
    }
  }

  private drawSigns() {
    this.pixelSign(56, 161, 138, 29, '← QUICK VIEW', C.cyan);
    this.pixelSign(229, 148, 183, 34, '↑ EXPERIENCE', C.magenta);
    this.pixelSign(448, 161, 146, 29, 'PROJECTS →', C.cyan);
  }

  private pixelSign(x: number, y: number, width: number, height: number, text: string, color: number) {
    const g = this.add.graphics();
    g.fillStyle(0x0c0713, 0.96).fillRect(x, y, width, height);
    g.lineStyle(2, color, 0.95).strokeRect(x, y, width, height);
    this.add.text(x + width / 2, y + height / 2, text, {
      fontFamily: 'monospace',
      fontSize: '10px',
      color: `#${color.toString(16).padStart(6, '0')}`,
      fontStyle: 'bold',
    }).setOrigin(0.5).setResolution(1);
  }

  private drawCarInterior() {
    const g = this.add.graphics();
    // windshield frame
    g.fillStyle(C.dark, 1).fillRect(0, 0, 15, 360);
    g.fillStyle(C.dark, 1).fillRect(625, 0, 15, 360);
    // dashboard
    g.fillStyle(0x050208, 1).fillRect(0, 302, 640, 58);
    g.fillStyle(0x0f0715, 1).fillRect(0, 298, 640, 8);
    g.fillStyle(C.magenta, 0.12).fillRect(0, 299, 640, 2);

    // pixel steering wheel
    g.lineStyle(12, 0x09050d, 1).strokeCircle(160, 360, 83);
    g.lineStyle(2, C.violet, 0.28).strokeCircle(160, 360, 83);
    g.fillStyle(0x09050d, 1).fillRect(153, 321, 14, 39);
    g.fillTriangle(160, 338, 108, 360, 212, 360);

    this.add.text(448, 324, 'BROKENFM', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#ff2bd6',
      fontStyle: 'bold',
    }).setOrigin(0.5).setResolution(1);
  }

  private drawRain() {
    const g = this.add.graphics();
    for (let i = 0; i < 55; i++) {
      const x = (i * 47) % 640;
      const y = (i * 83) % 295;
      const length = 2 + (i % 4);
      g.lineStyle(1, i % 3 === 0 ? C.cyan : C.white, 0.16).lineBetween(x, y, x - 2, y + length);
    }
  }
}
