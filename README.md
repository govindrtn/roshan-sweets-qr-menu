# Roshan Sweets QR Menu

Responsive bilingual digital menu for Roshan Sweets, Salamatpur.

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```

## Admin rate updates

Open `/admin` to update menu rates. The admin login is checked on the
server, not in the public frontend bundle.

For production saves, set `MENU_GITHUB_TOKEN` in Vercel with a GitHub token
that has write access to this repository's contents. The save API updates
`public/menu-prices.json` on `main`.

Built with React, Vite, Tailwind CSS, and CSS animations.
