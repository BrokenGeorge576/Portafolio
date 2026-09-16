// Coordinates use a 640 × 360 canvas. Buildings stand on y = 194.
// Change these values to compose your own skyline.
type Building = {
  x: number;
  width: number;
  height: number;
  style: 'steps' | 'antenna' | 'terraces' | 'glass';
  neon: number;
};

export const BUILDINGS: Building[] = [
  { x: 0, width: 55, height: 97, style: 'terraces', neon: 0x8b5cf6 },
  { x: 49, width: 65, height: 132, style: 'steps', neon: 0xff2bd6 },
  { x: 117, width: 39, height: 85, style: 'glass', neon: 0x53e7ff },
  { x: 159, width: 58, height: 142, style: 'antenna', neon: 0x8b5cf6 },
  { x: 220, width: 54, height: 101, style: 'terraces', neon: 0xff2bd6 },
  { x: 277, width: 35, height: 115, style: 'glass', neon: 0x53e7ff },
  { x: 329, width: 43, height: 89, style: 'steps', neon: 0x8b5cf6 },
  { x: 379, width: 54, height: 105, style: 'terraces', neon: 0x53e7ff },
  { x: 439, width: 57, height: 151, style: 'steps', neon: 0xff2bd6 },
  { x: 500, width: 38, height: 98, style: 'glass', neon: 0x53e7ff },
  { x: 545, width: 54, height: 128, style: 'antenna', neon: 0x8b5cf6 },
  { x: 603, width: 42, height: 78, style: 'terraces', neon: 0xff2bd6 },
];
