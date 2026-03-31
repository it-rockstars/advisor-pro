# advisor-pro

Financial Advisor Dashboard — Nuxt 3 + Tailwind + AdviceObjects showcase.

## Setup

```bash
npm install
```

## Development Server

```bash
npm run dev
```

Runs on http://localhost:3000

## Local Preview via Tunnel (cloudflared)

Preferred method for sharing a test URL:

```bash
# 1. Start dev server on custom port
PORT=3456 npm run dev

# 2. In another terminal — start cloudflare tunnel
cloudflared tunnel --url http://localhost:3456
```

Generates a public `https://*.trycloudflare.com` URL — no login required.

> Note: localtunnel (loca.lt) works too but requires a password prompt.

## Production Build

```bash
npm run build
npm run preview
```
