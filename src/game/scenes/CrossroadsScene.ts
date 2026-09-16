import Phaser from 'phaser';
import { BUILDINGS } from '../worldDesign';

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
    this.drawRain();
    this.drawCarInterior();
  }

  private drawSky() {
    const g = this.add.graphics();
    // Horizontal bands brighten towards the horizon without a smooth blur.
    for (let y = 0; y < 190; y += 2) {
      const color = Phaser.Display.Color.Interpolate.ColorWithColor(
        Phaser.Display.Color.ValueToColor(0x050817),
        Phaser.Display.Color.ValueToColor(0x382044), 190, y,
      );
      g.fillStyle(Phaser.Display.Color.GetColor(color.r, color.g, color.b));
      g.fillRect(0, y, 640, 2);
    }
    for (let i = 0; i < 65; i++) {
      const x = (i * 97 + 23) % 640;
      const y = (i * 31 + 9) % 120;
      g.fillStyle(C.white, i % 5 === 0 ? 0.65 : 0.25).fillRect(x, y, 1, 1);
    }
    // Crescent moon and narrow, stepped clouds.
    g.fillStyle(0xbec8e5).fillCircle(397, 43, 15);
    g.fillStyle(0x0f1024).fillCircle(404, 38, 14);
    for (const [x, y, width] of [[30, 40, 115], [360, 66, 145], [190, 92, 98]]) {
      g.fillStyle(0x24213c, 0.65).fillRect(x, y, width, 4);
      g.fillStyle(0x24213c, 0.4).fillRect(x + 19, y - 3, width - 35, 3);
    }
  }

  private drawCity() {
    const g = this.add.graphics();
    // Distant skyline: subdued colors keep the foreground readable.
    for (let i = 0; i < 28; i++) {
      const height = 24 + (i * 37) % 65;
      g.fillStyle(i % 2 ? 0x252039 : 0x211b32).fillRect(i * 24, 188 - height, 20, height);
      g.fillStyle(0x82718f, 0.3).fillRect(i * 24 + 5, 194 - height, 2, 8);
    }
    BUILDINGS.forEach(({ x, width: w, height: h, style, neon }, index) => {
      const y = 194 - h;
      g.fillStyle(index % 2 ? 0x100e20 : 0x171226).fillRect(x, y, w, h);
      // Side facade adds volume.
      g.fillStyle(0x080b17).fillRect(x + w - 10, y, 10, h);
      g.lineStyle(1, neon, 0.45).lineBetween(x, y, x + w - 10, y);
      if (style === 'steps') {
        g.fillStyle(0x171226).fillRect(x + 7, y - 10, w - 24, 10);
        g.fillRect(x + 14, y - 18, w - 38, 8);
        g.fillStyle(neon, 0.7).fillRect(x + 14, y - 18, w - 38, 1);
      } else if (style === 'antenna') {
        g.fillStyle(0x171226).fillRect(x + 9, y - 7, w - 28, 7);
        g.lineStyle(1, 0x77718d).lineBetween(x + 20, y - 7, x + 20, y - 26);
        g.fillStyle(C.magenta).fillRect(x + 19, y - 27, 3, 2);
      } else if (style === 'terraces') {
        for (let floor = y + 14; floor < 185; floor += 19) {
          g.fillStyle(0x33233e).fillRect(x - 3, floor, w + 3, 3);
          g.fillStyle(neon, 0.35).fillRect(x - 3, floor, w - 7, 1);
        }
      }
      for (let row = 0, wy = y + 8; wy < 184; row++, wy += 10) {
        for (let col = 0, wx = x + 5; wx < x + w - 14; col++, wx += 8) {
          const lit = (row * 7 + col * 3 + index * 11) % 9 > 3;
          g.fillStyle(lit ? (index % 3 === 0 ? 0xe7b981 : neon) : 0x2a2137, lit ? 0.65 : 0.5);
          g.fillRect(wx, wy, style === 'glass' ? 5 : 3, style === 'glass' ? 6 : 3);
        }
      }
      if (style === 'glass') {
        g.fillStyle(neon, 0.65).fillRect(x + w - 12, y + 2, 1, h - 2);
      }
      // Ground-floor storefront and a vertical neon panel.
      g.fillStyle(neon, 0.45).fillRect(x + 4, 185, w - 19, 2);
      if (index % 3 === 1) {
        g.fillStyle(0x291331).fillRect(x + w - 7, y + 21, 8, 31);
        for (let n = 0; n < 4; n++) {
          g.fillStyle(neon, 0.85).fillRect(x + w - 5, y + 24 + n * 7, 4, 3);
        }
      }
    });
  }

  private drawRoads() {
    const g = this.add.graphics();
    g.fillStyle(0x181321).fillRect(0, 194, 640, 166);
    // Three routes meet in one broad foreground intersection.
    g.fillStyle(C.asphalt);
    g.fillPoints([new Phaser.Math.Vector2(299, 194), new Phaser.Math.Vector2(341, 194), new Phaser.Math.Vector2(448, 360), new Phaser.Math.Vector2(192, 360)], true);
    g.fillPoints([new Phaser.Math.Vector2(0, 212), new Phaser.Math.Vector2(0, 251), new Phaser.Math.Vector2(269, 306), new Phaser.Math.Vector2(306, 247)], true);
    g.fillPoints([new Phaser.Math.Vector2(640, 212), new Phaser.Math.Vector2(640, 251), new Phaser.Math.Vector2(371, 306), new Phaser.Math.Vector2(334, 247)], true);
    // Curbs follow the same vanishing point as the center lane.
    for (const [near, far, color] of [[192, 299, C.magenta], [448, 341, C.cyan]]) {
      g.lineStyle(5, 0x30253b).lineBetween(far, 195, near, 360);
      g.lineStyle(1, color, 0.6).lineBetween(far, 195, near, 360);
    }
    g.lineStyle(2, 0x63506c, 0.5).lineBetween(0, 212, 277, 258);
    g.lineBetween(640, 212, 363, 258);
    // Lane dashes grow in both width and length towards the viewer.
    for (const [y, length, width] of [[201, 4, 1], [214, 7, 2], [235, 12, 3], [270, 21, 5]]) {
      g.fillStyle(0xc6b1c9, 0.65).fillRect(320 - Math.floor(width / 2), y, width, length);
    }
    // Broken reflections, restricted to the road instead of full-width stripes.
    for (let i = 0; i < 65; i++) {
      const y = 204 + (i * 17) % 94;
      const spread = (y - 194) * 0.6;
      const x = Math.round(320 + Math.sin(i * 7) * spread);
      g.fillStyle(i % 2 ? C.magenta : C.cyan, 0.08 + (i % 3) * 0.035);
      g.fillRect(x, y, 2 + (i % 8), 1);
    }
    for (const side of [-1, 1]) {
      for (let i = 0; i < 3; i++) {
        const x = 320 + side * (34 + i * 28);
        const y = 205 + i * 32;
        const height = 19 + i * 9;
        g.lineStyle(1, 0x77647d).lineBetween(x, y, x, y - height);
        g.fillStyle(C.cyan, 0.12).fillRect(x - 5, y - height - 2, 10, 4);
        g.fillStyle(0xc5faff).fillRect(x - 3, y - height, 6, 1);
      }
    }
  }

  private drawSigns() {
    this.pixelSign(56, 161, 138, 29, C.cyan);
    this.pixelSign(229, 148, 183, 34, C.magenta);
    this.pixelSign(448, 161, 146, 29, C.cyan);
  }

  private pixelSign(x: number, y: number, width: number, height: number, color: number) {
    const g = this.add.graphics();
    g.fillStyle(0x0c0713, 0.96).fillRect(x, y, width, height);
    g.lineStyle(2, color, 0.95).strokeRect(x, y, width, height);

  }

  private drawCarInterior() {
    const g = this.add.graphics();
    // Angled windshield pillars and roof lining.
    g.fillStyle(0x090911).fillRect(0, 0, 640, 7);
    g.fillTriangle(0, 0, 30, 0, 0, 286);
    g.fillTriangle(640, 0, 610, 0, 640, 286);
    g.lineStyle(2, 0x34213f).lineBetween(21, 7, 7, 269);
    g.lineBetween(619, 7, 633, 269);
    // Rear-view mirror: reflected skyline and tinted glass.
    g.fillStyle(0x252030).fillRect(314, 7, 10, 9);
    g.fillStyle(0x08090e).fillRoundedRect(276, 14, 88, 24, 3);
    g.lineStyle(1, 0x55415f).strokeRoundedRect(276, 14, 88, 24, 3);
    g.fillStyle(0x18192d).fillRect(280, 18, 80, 16);
    for (let i = 0; i < 10; i++) {
      const height = 3 + (i * 7) % 10;
      g.fillStyle(0x090d18).fillRect(282 + i * 8, 34 - height, 6, height);
      g.fillStyle(C.magenta, 0.5).fillRect(284 + i * 8, 32 - height, 1, 2);
    }
    // Dashboard top, stitching, demister vents and windshield wipers.
    g.fillStyle(0x191321).fillRect(0, 269, 640, 91);
    g.fillStyle(0x090910).fillRect(0, 282, 640, 78);
    g.lineStyle(2, 0x493052).lineBetween(0, 271, 640, 271);
    for (let x = 25; x < 620; x += 8) {
      g.fillStyle(0x5f3b61, 0.5).fillRect(x, 277, 3, 1);
    }
    for (const x of [55, 245, 478]) {
      g.fillStyle(0x05070c).fillRect(x, 272, 77, 3);
      for (let n = 0; n < 9; n++) g.fillStyle(0x302337).fillRect(x + n * 8, 272, 1, 3);
    }
    g.lineStyle(2, 0x090c13).lineBetween(103, 268, 278, 259);
    g.lineBetween(360, 268, 525, 259);
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
