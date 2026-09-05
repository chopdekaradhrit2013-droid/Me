# Adhrit Chopdekar — Portfolio

Cinematic scroll site in the style of [stewin.me](https://www.stewin.me/).

**Repo:** https://github.com/chopdekaradhrit2013-droid/Me

Static files only. No build step.

## Files

- `index.html` — markup, sections, project cards
- `styles.css` — layout, type, cards, loader, mobile
- `hero.css` — studio portrait as a CSS data URI (no extra image request)
- `app.js` — scroll progress 0–1, lerp, section fades, typewriter
- `hero.jpg` — optional standalone portrait (loader fallback)

## Run locally

Open `index.html` in a browser, or:

```bash
npx serve .
```

## GitHub Pages

1. Repo **Settings → Pages**
2. Source: **Deploy from a branch**
3. Branch: `main` / folder: `/ (root)`
4. Site will be at `https://chopdekaradhrit2013-droid.github.io/Me/`

## Vercel

Import this repo → Framework Preset: **Other** → output is the folder root → Deploy.

## Edit copy

All text lives in `index.html`. Scroll ranges are `data-start` / `data-end` on each `.panel`.
Lerp feel is in `app.js` (`0.11` desktop, `0.2` mobile).
