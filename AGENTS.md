# AGENTS.md

## 1. Project purpose

This repository is the personal portfolio of **Jorge Alberto López Ronzón**, a backend/software developer.

This is **not intended to look like a conventional developer portfolio**.

The primary experience should feel like a small retro-futuristic videogame that the visitor can explore.

The portfolio takes place inside a fictional city at night.

The visitor begins inside or controlling a car and arrives at an intersection with three possible paths:

* Left: `QUICK VIEW`
* Forward: `EXPERIENCE DISTRICT`
* Right: `PROJECT DISTRICT`

The visual identity should combine:

* retro videogames
* pixel art
* 1980s futurism
* neon noir
* nighttime city environments
* purple, violet, magenta, pink and cyan lighting
* wet streets and reflections
* CRT / arcade aesthetics
* melancholic nighttime atmosphere
* music as part of the experience

The general emotional target is:

> Driving alone through a beautiful futuristic city at night while exploring someone's career, projects and personality.

This portfolio should feel personal, playful and memorable while still being useful to recruiters.

---

# 2. Core design philosophy

## Personality over generic portfolio design

Avoid conventional portfolio layouts such as:

* hero section
* three project cards
* skills progress bars
* generic gradient backgrounds
* large profile photograph
* corporate dashboard design

Those elements may exist inside `Quick View`, but they must not define the primary experience.

The primary interface is the city itself.

Information should often be represented spatially.

Examples:

* projects can be buildings
* work experience can be locations along a highway
* education can be a station or district
* experiments can be laboratories
* archived projects can be hidden locations
* links can be terminals, signs, doors or interfaces

---

# 3. Visual direction

The visual style must be **pixel art / retro digital art**.

Do not attempt photorealism.

Do not build a realistic cyberpunk city.

Prefer:

* intentional low resolution
* pixel-perfect sprites
* limited color palettes
* silhouettes
* neon lights
* fog represented through simple layered graphics
* parallax backgrounds
* low-resolution animations
* subtle CRT effects
* pixel fonts
* arcade-inspired UI

The visual language should feel cohesive.

A small number of carefully designed assets is preferable to many inconsistent assets.

---

# 4. Critical art rule

## Do not use AI-generated visual assets

The final portfolio must not contain AI-generated:

* backgrounds
* sprites
* buildings
* characters
* cars
* illustrations
* textures
* logos

Temporary geometric placeholders created programmatically are acceptable during development.

Examples of acceptable placeholders:

* rectangles representing buildings
* circles representing lights
* simple Phaser graphics
* colored boxes representing signs
* temporary text labels

Final art should eventually be created manually using tools such as:

* Aseprite
* Piskel
* Photoshop
* Krita
* Blender only when manually authored assets are deliberately required

Do not silently replace placeholders with generated artwork.

---

# 5. Technical direction

Primary stack:

* React
* TypeScript
* Vite
* Phaser
* Howler.js or equivalent lightweight audio layer

Responsibilities should remain separated.

## React

React should manage:

* application shell
* menus
* Quick View
* project information overlays
* CV access
* contact interfaces
* settings
* BrokenFM UI when appropriate
* accessibility alternatives
* non-game fallback experience

## Phaser

Phaser should manage:

* world rendering
* vehicle movement
* collisions
* camera
* map navigation
* environmental interactions
* pixel-art animations
* triggers
* district transitions
* interactive locations

Do not implement business/UI-heavy React interfaces directly inside Phaser unless they genuinely belong to the game world.

## Audio

Audio should be abstracted into its own system.

The audio system should eventually support:

* play
* pause
* previous track
* next track
* volume
* mute
* current track
* optional station changes

The radio is called:

# BrokenFM

BrokenFM is an important part of the identity of the portfolio.

---

# 6. Internal resolution

The experience should intentionally render at a low internal resolution and upscale cleanly.

Current conceptual target:

`640x360`

Use pixel-perfect scaling when practical.

CSS should preserve hard pixel edges.

Prefer:

```css
image-rendering: pixelated;
```

Avoid filters that fake pixel art on high-resolution artwork.

Pixel art should actually originate from low-resolution assets.

---

# 7. Initial scene

The first meaningful scene is called conceptually:

# Crossroads

The user starts at night in a car.

The city should initially reveal three choices.

## Left

### QUICK VIEW

Purpose:

Provide recruiters or visitors with immediate access to useful information without requiring them to play the entire experience.

Quick View should eventually contain:

* short introduction
* backend developer positioning
* technologies
* selected projects
* work experience summary
* GitHub
* LinkedIn if enabled
* contact
* CV

Quick View should be fast, readable and accessible.

It can visually resemble a retro terminal or futuristic roadside location.

---

## Forward

### EXPERIENCE DISTRICT

This road represents Jorge's professional journey.

The forward road should visually feel like the main road.

It can eventually include locations corresponding to professional experiences.

The road should continue beyond the current experience to communicate that the career is still progressing.

Possible future visual concept:

`NEXT DESTINATION — UNKNOWN`

or

`ROAD UNDER CONSTRUCTION`

Do not expose confidential company code, infrastructure, documents or proprietary details.

Professional work should be represented through:

* role
* responsibilities
* technologies
* general architecture concepts
* challenges
* lessons learned

Never expose internal source code without explicit confirmation that it is safe and public.

---

## Right

### PROJECT DISTRICT

This district is where the portfolio becomes more experimental.

Projects should not simply appear as identical cards.

Each important project should eventually have its own thematic location.

Examples:

### V_App

Possible location:

`VICKY ARCHIVES`

Possible visual identity:

* digital archive
* terminal
* document storage facility

### DroneManager

Possible location:

`DRONE CONTROL CENTER`

Possible visual identity:

* hangar
* drone terminal
* industrial building

### Financial transactions ETL/API project

Possible location:

`TRANSACTION PIPELINE`

Possible visual identity:

* industrial pipeline
* processing facility
* data factory

### Perceptual Hash

Possible location:

`IMAGE AUTHENTICATION LAB`

Possible visual identity:

* research laboratory
* two image displays
* hashes
* similarity measurements

These are concepts, not mandatory literal implementations.

The overall city must remain coherent.

---

# 8. BrokenFM

The car contains a radio called:

# BrokenFM

BrokenFM should feel like an actual radio rather than a generic HTML music player.

Possible interface information:

* station name
* track title
* artist
* play/pause
* previous
* next
* volume

Example:

```text
BROKEN FM
───────────────
♫ Track Name
Artist Name

◀  ■  ▶

VOL ▰▰▰▰▱
```

The user will manually select the music used in the portfolio.

## Copyright rule

Do not commit copyrighted commercial music files to the repository unless Jorge explicitly confirms that he has the right to distribute them.

During development use:

* placeholders
* royalty-free audio
* original music
* empty track metadata

The playlist configuration should remain easy to edit.

Example conceptual structure:

```ts
export const tracks = [
  {
    title: "...",
    artist: "...",
    src: "..."
  }
];
```

---

# 9. Interaction model

The long-term target is for visitors to physically navigate the environment.

Preferred controls:

Desktop:

```text
W / Arrow Up       accelerate / move forward
S / Arrow Down     brake / reverse
A / Arrow Left     steer left
D / Arrow Right    steer right

E                  interact
ESC                menu
M                  mute
```

Controls are not final and can evolve.

Game feel matters.

Movement should feel enjoyable even before all content exists.

Prioritize:

* responsive input
* clear feedback
* smooth camera
* predictable collision
* understandable navigation

Avoid overly realistic vehicle physics.

This is an interactive portfolio, not a driving simulator.

---

# 10. Mobile strategy

The project must eventually work on mobile.

Do not assume keyboard input is always available.

Possible mobile approaches:

* touch steering controls
* virtual joystick
* simplified movement
* tap-to-travel between locations

The exact solution can evolve.

Do not compromise desktop development prematurely, but avoid architecture that makes mobile support impossible.

---

# 11. Accessibility and recruiter usability

Creativity must never prevent access to information.

A visitor should not be forced to play the game in order to understand Jorge's profile.

Always preserve the possibility of:

# Quick View

Quick View should eventually work even if:

* Phaser fails
* WebGL performance is poor
* the visitor is on mobile
* the visitor does not want to play
* accessibility requirements make the game difficult

The information contained in the portfolio should ultimately remain accessible through normal HTML.

---

# 12. Performance

Performance matters.

Avoid unnecessary dependencies.

Avoid huge textures.

Avoid excessive particle systems.

Avoid enormous audio files.

Avoid rendering objects that are outside relevant areas when possible.

Prefer:

* sprite atlases
* small pixel-art assets
* compressed audio
* lazy loading
* district-level asset loading
* efficient collision areas

The portfolio should load reasonably on an ordinary laptop and phone.

---

# 13. Architecture principles

Prefer simple, understandable architecture.

Avoid overengineering.

Use components and services when they have clear responsibilities.

Suggested conceptual structure:

```text
src/
├── components/
│   ├── BrokenFM/
│   ├── QuickView/
│   ├── GameCanvas/
│   └── UI/
│
├── game/
│   ├── scenes/
│   ├── entities/
│   ├── systems/
│   ├── maps/
│   └── config/
│
├── data/
│   ├── projects.ts
│   ├── experience.ts
│   └── tracks.ts
│
├── hooks/
├── services/
├── styles/
└── types/
```

This structure is a recommendation, not a rigid requirement.

Do not create unnecessary folders simply to match this tree.

---

# 14. Content should be data-driven

Portfolio content should not be hardcoded deeply inside scenes.

Projects should eventually live in structured data.

Example:

```ts
interface Project {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  demoUrl?: string;
  districtLocation?: string;
}
```

Experience should follow a similar strategy.

This allows the city and Quick View to consume the same information.

The game and conventional interface should share one source of truth.

---

# 15. Development stages

Do not attempt to build the full city immediately.

Development should happen incrementally.

## Stage 1 — Playable foundation

Goal:

Create a small enjoyable playable scene.

Requirements:

* application loads
* Start Engine screen
* Crossroads scene
* player/car movement
* camera
* three roads
* basic collision
* basic interaction system
* BrokenFM interface
* placeholder city
* pixel rendering

The environment may use programmatic placeholders.

Do not spend time building final assets yet.

---

## Stage 2 — Navigation

Implement navigation between:

* Quick View
* Experience District
* Project District

These areas may initially be simple placeholder scenes.

The goal is architectural validation.

---

## Stage 3 — Quick View

Build the conventional recruiter-friendly experience.

This should be responsive HTML/React.

---

## Stage 4 — Experience District

Build the professional timeline as an explorable environment.

---

## Stage 5 — Project District

Integrate projects one at a time.

Do not add a project until its repository and presentation are worth showing.

Quality is more important than quantity.

---

## Stage 6 — Art pass

Replace programmatic placeholders with manually created pixel-art assets.

Establish:

* palette
* sprite sizes
* architecture language
* signage language
* road tiles
* lighting patterns

---

## Stage 7 — Polish

Add:

* environmental animations
* rain
* reflections
* subtle particles
* sound effects
* better BrokenFM interaction
* transitions
* easter eggs
* hidden archive
* mobile controls
* accessibility options

---

# 16. Project portfolio philosophy

Not every GitHub repository belongs in the main portfolio.

The portfolio should prioritize strong and polished work.

Current likely candidates include:

* V_App
* DroneManager
* financial transactions ETL/API project
* Perceptual Hash project

Other repositories may eventually live in an optional:

# Archive

The Archive can contain older experiments and academic work without competing with primary projects.

Do not automatically import repositories simply because they exist.

---

# 17. Repository improvement workflow

When a project is selected for the portfolio, improve that project first.

Preferred workflow:

```text
Existing repository
        ↓
Evaluate usefulness
        ↓
Rename if necessary
        ↓
Refactor
        ↓
Improve project structure
        ↓
Tests
        ↓
README
        ↓
Demo / screenshots
        ↓
Portfolio integration
```

Portfolio integration comes last.

---

# 18. Code quality

TypeScript should use meaningful types.

Avoid unnecessary `any`.

Prefer readable code over clever code.

Functions and components should have focused responsibilities.

Do not add abstractions without a concrete benefit.

Do not add libraries for trivial tasks.

Before adding a dependency, consider whether the functionality can reasonably be implemented with the existing stack.

---

# 19. Naming

Use English for:

* source code
* variables
* functions
* component names
* file names
* technical documentation when practical

The portfolio UI may use English because the target includes professional/recruiting contexts.

Important fictional/location names currently include:

* BrokenFM
* Quick View
* Experience District
* Project District
* Archive

Do not rename these casually.

---

# 20. Git workflow

Prefer small, focused commits.

Examples:

```text
feat: add car movement controller
feat: create BrokenFM player
feat: add crossroads scene
feat: implement project interaction trigger
fix: prevent radio state reset on scene change
refactor: move portfolio data into shared config
style: improve pixel HUD spacing
```

Avoid giant commits containing unrelated work.

For substantial changes, prefer feature branches such as:

```text
feat/crossroads
feat/car-controller
feat/broken-fm
feat/quick-view
feat/project-district
```

---

# 21. When modifying existing code

Before changing architecture:

1. inspect the existing implementation
2. understand why it exists
3. preserve working behavior
4. make the smallest reasonable change
5. run relevant checks
6. report what changed

Do not rewrite working systems simply because another architecture is possible.

---

# 22. Verification

After meaningful changes, run appropriate checks.

At minimum:

```bash
npm run build
```

If linting or tests are available, run them as well.

Do not claim something works without verifying it when verification is possible.

---

# 23. Do not fabricate portfolio claims

Never invent:

* metrics
* performance improvements
* user counts
* business impact
* company responsibilities
* project capabilities

All portfolio descriptions should correspond to real implementations or real professional experience.

If something has not been implemented yet, describe it as planned rather than complete.

---

# 24. Security

Never commit:

* `.env`
* API secrets
* access tokens
* refresh tokens
* passwords
* private keys
* company credentials

Use:

```text
.env.example
```

for environment variable documentation.

Never expose confidential employer code or documents inside this portfolio.

---

# 25. What success looks like

The finished experience should make a visitor feel:

> “This developer clearly knows how to build software, but he also has taste, personality and curiosity.”

The portfolio should communicate three things simultaneously:

1. Jorge is a backend/software developer.
2. Jorge can build real technical projects.
3. Jorge is not presenting himself through another generic developer template.

The site should be memorable because of the experience, not because it is visually excessive.

---

# 26. Immediate objective

The current priority is **not** to populate the portfolio with all projects.

The immediate objective is:

```text
START ENGINE
      ↓
Crossroads
      ↓
Driveable car
      ↓
BrokenFM
      ↓
Choose one of three roads
      ↓
Transition to placeholder district
```

Build this vertical slice first.

Until this interaction feels good, avoid spending significant effort on:

* detailed project pages
* final pixel art
* complex animations
* large city maps
* advanced menus
* decorative effects

First make the core experience fun and technically solid.

---

# 27. Final principle

When choosing between:

* more features
* better experience

prefer the better experience.

When choosing between:

* more projects
* better projects

prefer the better projects.

When choosing between:

* visual complexity
* coherent art direction

prefer coherent art direction.

When choosing between:

* impressive code
* maintainable code

prefer maintainable code.

This portfolio should grow slowly and deliberately.

Design note:
The radio screen should feel like a built-in car stereo display, not like a regular website video embed.
Prefer a compact embedded screen framed by the existing dashboard UI.
Preserve the current dashboard proportions and the pixel-art identity.
