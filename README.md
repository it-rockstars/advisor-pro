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
# 1. Start dev server
PORT=3456 npm run dev

# 2. In another terminal
cloudflared tunnel --url http://localhost:3456
```

Generates a public `https://*.trycloudflare.com` URL — no login required.

### Fix: Vite blocked host error

Nuxt/Vite blocks external hosts by default. The `nuxt.config.ts` already includes the fix:

```ts
devServer: {
  host: '0.0.0.0',
},
vite: {
  server: {
    allowedHosts: 'all',
    hmr: {
      clientPort: 443,
      protocol: 'wss',
    }
  }
}
```

This allows all external hosts (e.g. `*.trycloudflare.com`) without manual whitelisting.

## Production Build

```bash
npm run build
npm run preview
```

## Live Code Editing (HMR)

Der Dev-Server läuft mit Vite HMR — Änderungen werden sofort im Browser sichtbar, kein Restart nötig.

**Codewort: `live`**

Beispiel: *"live: mach den Header blau"* → Rainer ändert den Code → Browser updated automatisch.
