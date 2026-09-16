# Broken City Portfolio

Interactive pixel-art portfolio concept for Jorge Alberto López Ronzón.

## Concept

A retro-futuristic city at night. The visitor starts inside a car at a three-way intersection:

- **Left — Quick View:** fast, recruiter-friendly profile, CV and contact.
- **Straight — Experience District:** career timeline and education.
- **Right — Project District:** explorable project spaces.

The car radio is **BrokenFM**, a user-controlled soundtrack layer.

## Visual rules

- Pixel art / low internal resolution.
- Night only.
- Purple, magenta, violet and cyan neon palette.
- 1980s retro-futurism / neon-noir mood.
- No AI-generated visual assets in the final site.
- Final sprites should be drawn manually or sourced from assets with compatible licenses.

## Stack

- React + TypeScript for site UI and accessible/quick-view content.
- Phaser for the interactive game world.
- Howler for BrokenFM audio playback.
- Vite for development/build.

## Run

```bash
npm install
npm run dev
```

## Asset workflow

Place hand-made pixel assets in:

```text
public/assets/sprites/
public/assets/fonts/
```

Audio belongs in:

```text
public/assets/audio/
```

Only ship music you have the right to redistribute. `src/data/tracks.ts` intentionally starts with empty audio paths.

## First milestone

The starter uses code-drawn placeholder geometry only. Replace it gradually with handmade sprites after the interaction, scale and layout feel right.

1. Crossroads scene.
2. Keyboard/touch route selection.
3. Drive transitions.
4. Quick View district.
5. Experience district.
6. Project district.
7. BrokenFM real playlist.
8. Save visitor preferences locally.
