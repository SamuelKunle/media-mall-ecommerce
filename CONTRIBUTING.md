# Contributing

Thanks for helping improve MediaMall.

## Local setup

1. **Node.js** — use **20.x or 22.x** LTS (see `engines` in `package.json`).
2. Install dependencies: `npm ci` (preferred) or `npm install`.
3. Copy env template if you use integrations: `cp .env.example .env.local` and fill values locally.
4. Run **http://localhost:8080**: `npm run dev`.

Before opening a PR, run:

```sh
npm run lint
npm test
npm run build
```

## Guidelines

- Keep changes focused on one concern per PR when possible.
- Do **not** commit `.env.local` or secrets.
- This repo is a **demo storefront**: payments and inventory stay optional until wired via `src/integrations/*`.

## Questions

Open a GitHub issue for bugs or feature ideas.
