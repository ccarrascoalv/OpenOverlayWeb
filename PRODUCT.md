# Product

<!-- impeccable:product-schema 1 -->

Source of truth for all product facts and copy: `LANDING-PAGE.md` (v0.12.0, 12-oct-2026). This file only summarizes what future design work must preserve.

## Platform

web

## Stack

Astro, static output, hand-written CSS with custom properties, in `website/`. Must build to a static site deployable on GitHub Pages. No UI frameworks, analytics, cookies or trackers.

## Users

Spanish-speaking iRacing drivers and streamers on Windows 10/11 PCs, who want a free alternative to paid overlays such as RaceLab. They arrive from forums, Discord or GitHub, decide in seconds whether it's trustworthy and lightweight, and download the installer.

## Product Purpose

OpenOverlay is a free, open-source (MIT) telemetry overlay for iRacing: floating widgets over the sim (relative, standings, fuel, flags, weather and more), configured in a control panel with a live preview. The landing page exists so people can download it, and it has to keep working while the app is still unfinished.

## Positioning

Free, with no account and 100 % local: it only reads the public telemetry interface iRacing provides to third-party tools, never game files or memory, and no data leaves the PC. It updates itself in the background.

## Capabilities and Constraints

- 12 widgets: Relative, Standings, Cockpit, Delta, Fuel calculator, Flags, Weather, Track & session, Tires, Pedal trace, Incidents, Track map.
- Layouts with an editor, global shortcuts, size 65–200 %, per-widget opacity, auto-hide.
- Never advertise: the second-monitor dashboard (at most "próximamente"), dashboard/Cockpit themes, sizes XXS–XXXL, or a standalone "Fuel" widget.
- The installer is unsigned, so Windows SmartScreen shows a warning; the page must explain this.

## Brand Commitments

- Palette from the control-panel theme (LANDING-PAGE.md §1). Amber `#FFD24D` only for CTAs and active states. Dark theme only.
- Barlow Semi Condensed for headings and figures (it's the font the app's timing tables use); a readable sans for body text.
- Logo: `Assets/logo-512.png`; favicon `Assets/icon.ico`.
- The legal notice in §10 appears word for word in the footer.
- Site language: Spanish; all copy centralized in one file so it can be translated later.

## Evidence on Hand

- Logos, favicon, the Spa background (`Assets/spa2.jpg`), 32 car brand logos (`Assets/CarBrands`), 198 flags (`Assets/Flags`), and the app's locales (`Assets/Locales`).
- No valid screenshots yet: `docs/screenshots/` must not be used. Widgets are shown as HTML/CSS mockups with example data, which must be easy to replace with real screenshots.
- No testimonials, user numbers or benchmarks. Don't invent any.

## Product Principles

1. Show the overlay working, don't describe it: the page should look like the product.
2. Trust before persuasion: free, local, read-only, open source, said plainly.
3. Lightweight like the app: a fast, quiet page with no third parties.
4. Easy to update: version, links and copy live in config and data files, not in the markup.

## Accessibility & Inclusion

WCAG AA contrast, visible focus, full keyboard navigation, semantic HTML, `prefers-reduced-motion` disables all animation.
