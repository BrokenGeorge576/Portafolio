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
- Official YouTube IFrame API for BrokenFM video and audio playback.
- Vite for development/build.

## Run

Vite 6 is used for compatibility with Node.js 18.19.1.

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

## BrokenFM playlist

Edit `src/data/tracks.ts` to add or remove songs. Each entry has `title`, `artist`, and `youtubeVideoId` (the `v` parameter in a YouTube URL), plus an optional `station` label. No music files are stored or served by this app.

BrokenFM cues the first video without autoplay. Play/Pause controls the official visible YouTube player. Previous/Next preserve the playing or paused state; finishing a video starts the next and wraps to the first. YouTube's own controls also update the radio state.

The screen stays at least 200 × 200 CSS pixels. On small displays, the cockpit extends below the windshield rather than shrinking or hiding the player. Videos can be unavailable or disallow embedding; BrokenFM shows an error, allows another track, and offers an external YouTube link. Browser playback restrictions may require pressing the native video play button.

Open the app via `npm run dev` or an HTTPS deployment, not `file://`. The player supplies the page origin; do not strip the HTTP Referer with a `no-referrer` policy. Internet access to YouTube is required. No API key is needed.

- UI: `src/components/BrokenFM.tsx`, `src/components/YouTubeScreen.tsx`
- React lifecycle: `src/hooks/useBrokenFM.ts`
- Playback state: `src/services/brokenFM.ts`
- IFrame API loader and types: `src/services/youtube.ts`

Run `npm test` for playlist/control regression tests and `npm run build` for TypeScript and production compilation.

References: [IFrame API](https://developers.google.com/youtube/iframe_api_reference), [player parameters](https://developers.google.com/youtube/player_parameters).

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

## Customize the visuals

See [Guía de diseño (español)](docs/GUIA-DISENO.md) for building sizes, typography, sky, road, and custom PNG assets.
