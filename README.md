# replacepicoswithchipotle.com

Landing page for the Mustang Market campaign.  
Built with **Next.js (App Router)** and deployed to **Cloudflare Workers** using **OpenNext**.

## Stack

- Next.js 15 + React 19 + TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`) + `tw-animate-css`
- Motion (`motion/react`) + `canvas-confetti` for UI animation
- Cloudflare Workers deployment via `@opennextjs/cloudflare`

## How we set this up

If you need to recreate this project pattern from scratch:

### 1) Bootstrap a Next.js App Router project

```bash
npx create-next-app@latest replacepicoswithchipotle --ts --eslint --app
```

### 2) Add runtime/UI packages

```bash
npm install motion canvas-confetti lucide-react clsx class-variance-authority tailwind-merge qrcode.react
```

### 3) Add Cloudflare + styling toolchain

```bash
npm install -D @opennextjs/cloudflare wrangler tailwindcss @tailwindcss/postcss @tailwindcss/typography tw-animate-css autoprefixer
```

### 4) Configure files

- `next.config.ts` for standalone output, image host allowlist, and `motion` transpilation.
- `open-next.config.ts` with `defineCloudflareConfig`.
- `wrangler.jsonc` with:
  - `main: .open-next/worker.js`
  - `assets.directory: .open-next/assets`
  - compatibility flags + worker service binding
- `postcss.config.mjs` using `@tailwindcss/postcss` and `autoprefixer`.
- `app/globals.css` using `@import "tailwindcss";` and project theme tokens.

## Project setup (what we have now)

- App code lives in `app/`:
  - `app/layout.tsx`: root layout + Google fonts (`Inter`, `Space Grotesk`)
  - `app/page.tsx`: main landing page and vote flow UI
  - `app/globals.css`: Tailwind imports + theme tokens (Mustang green/gold)
- Path alias `@/*` is configured in `tsconfig.json`.
- `next.config.ts` is configured for:
  - strict mode
  - standalone output
  - `motion` transpilation
  - `picsum.photos` remote image allowlist
- Cloudflare runtime is configured in:
  - `open-next.config.ts`
  - `wrangler.jsonc` (worker name, compat flags, assets binding, service binding)

## Getting started locally

### 1) Install dependencies

```bash
npm install
```

### 2) Run local development server

```bash
npm run dev
```

Open `http://localhost:3000`.

### 3) Lint

```bash
npm run lint
```

## Build and Cloudflare preview

These scripts are already wired in `package.json`:

- `npm run build` -> Next.js production build only
- `npm run preview` -> OpenNext build + local Cloudflare Worker preview
- `npm run upload` -> OpenNext build + upload worker artifacts
- `npm run deploy` -> OpenNext build + deploy worker

If this is your first deployment machine/session:

```bash
npx wrangler login
```

## Cloudflare setup

This project is deployed as a Worker named `replacepicoswithchipotle`.

### 1) DNS (proxied/orange cloud required)

Cloudflare Dashboard -> `replacepicoswithchipotle.com` -> DNS

Create proxied records:

- `A` `@` -> `192.0.2.1` (placeholder "no-origin" IP)
- `A` `www` -> `192.0.2.1` (or `CNAME www -> @`)
- Optional: `A` `*` -> `192.0.2.1` for wildcard subdomains

### 2) Worker routes

Cloudflare Dashboard -> `replacepicoswithchipotle.com` -> Workers Routes

Attach routes to worker `replacepicoswithchipotle`:

- `replacepicoswithchipotle.com/*`
- `*.replacepicoswithchipotle.com/*`

### 3) HTTPS

Cloudflare Dashboard -> SSL/TLS -> Edge Certificates

- Enable **Always Use HTTPS**
- Optional: enable **Automatic HTTPS Rewrites**

### 4) Verify

- `https://replacepicoswithchipotle.com`
- `https://www.replacepicoswithchipotle.com`

## Notes

- `.env*` is gitignored by default (`.env.example` is allowed if needed).
- Wrangler local files (`.wrangler`, `.dev.vars*`) are ignored.
