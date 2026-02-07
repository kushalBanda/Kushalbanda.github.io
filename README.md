<div align="center">

# kushalbanda.github.io

**Personal portfolio & digital presence for Kushal Banda**

AI Engineer | Multi-Agent Systems | RAG | Production ML Infrastructure

[![Live](https://img.shields.io/badge/live-kushalbanda.github.io-0a0a0a?style=flat-square&logo=github&logoColor=white)](https://kushalbanda.github.io)
[![LinkedIn](https://img.shields.io/badge/linkedin-kushalbanda-0a66c2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/kushalbanda/)
[![Medium](https://img.shields.io/badge/medium-@kushalbanda-000?style=flat-square&logo=medium&logoColor=white)](https://medium.com/@kushalbanda)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)

</div>

---

## Overview

A zero-dependency, static portfolio built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step, no package manager. Ships directly via GitHub Pages.

The site features a dual-mode interface (human-readable / agent-readable), light/dark theming, ambient audio, a built-in pomodoro timer, and QR code sharing -- all without a single `node_module`.

## Architecture

```
.
├── index.html                    # Single entry point — all sections rendered here
├── assets/
│   ├── css/
│   │   ├── miyoko-rebuild.css    # Active design system (light/dark, glassmorphism, dock nav)
│   │   ├── attio.css             # Legacy dark theme system (neon cyan/purple accents)
│   │   ├── bento.css             # Bento grid layout utilities
│   │   └── style.css             # Legacy base styles
│   ├── js/
│   │   ├── miyoko-content.js     # Structured content data (experience, education, tech stack)
│   │   ├── miyoko-rebuild.js     # Runtime — rendering, theme toggle, pomodoro, interactions
│   │   └── main.js               # Legacy GSAP scroll animation controller
│   ├── media/                    # Images, audio (lofi ambient, timer jingle)
│   ├── icons/                    # SVG tech icons (AWS, Azure, OpenAI, etc.)
│   └── vendor/                   # Vendored icon libraries (Remixicon, Boxicons)
└── CLAUDE.md                     # AI agent context file
```

**Design decisions:**

| Decision | Rationale |
|---|---|
| No framework | Zero JS bundle, instant TTFB, trivial deployment via GitHub Pages |
| Content in JS objects | Structured data without a CMS — single source of truth in `miyoko-content.js` |
| CSS custom properties | Full theme system (light/dark) controlled from one file |
| Dual human/agent view | Toggle between polished UI and machine-parseable text representation |

## Key Features

- **Dual-mode rendering** — Human view (styled sections) and Agent view (structured plain text) toggled via dock switch
- **Light / Dark theme** — CSS custom property-driven, persisted to `localStorage`
- **Ambient audio** — Lofi background track with one-click toggle
- **Pomodoro timer** — 25m focus / 5m break with audio notification
- **QR sharing** — Generates scannable QR code for the live URL
- **GitHub contribution graph** — Rendered inline from contribution data
- **Collapsible sections** — Product journey panel with expand/collapse
- **Floating dock nav** — macOS-style bottom dock with social links and controls

## Local Development

```bash
# Any static file server works. No install required.
python3 -m http.server 8000

# Then open http://localhost:8000
```

There is no build step. Edit files, refresh the browser.

## Modifying Content

All portfolio content lives in **`assets/js/miyoko-content.js`** as structured JavaScript objects:

- Experience entries
- Education history
- Tech stack categories
- About/intro copy
- Library (reading list)

Update the data objects there. The rendering logic in `miyoko-rebuild.js` picks them up automatically.

## External Dependencies

| Dependency | Loaded via | Purpose |
|---|---|---|
| [Sora](https://fonts.google.com/specimen/Sora) + [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) | Google Fonts | Typography |
| Remixicon, Boxicons | Vendored (`assets/vendor/`) | Icon sets |

No CDN JavaScript dependencies in the active build. GSAP references in `main.js` are from the legacy version.

## License

[MIT](LICENSE) -- fork it, make it yours.

</div>
