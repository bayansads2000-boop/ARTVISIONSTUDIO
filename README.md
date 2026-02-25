# ART VISION STUDIO

A modern, fully static marketing website for **Art Vision Studio** — built with SvelteKit 5, TypeScript, and Vite.

## 🛠 Tech Stack

- **Framework:** [SvelteKit 5](https://svelte.dev/) with TypeScript
- **Build:** [Vite 7](https://vitejs.dev/)
- **Rendering:** Static Site Generation (SSG) via `@sveltejs/adapter-static`
- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com/)
- **3D Graphics:** Three.js
- **UI Components:** Swiper, Markdown rendering via `marked`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## ☁️ Deployment (Cloudflare Pages)

1. Push this repo to GitHub.
2. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/).
3. Create a new project → Connect your GitHub repo.
4. Use these build settings:
   - **Framework preset:** SvelteKit
   - **Build command:** `npm run build`
   - **Build output directory:** `build`
5. Deploy!

## 📁 Project Structure

```
├── src/
│   ├── lib/
│   │   ├── assets/        # Static assets (images, etc.)
│   │   ├── components/    # Reusable Svelte components
│   │   ├── data/          # JSON data (services, packages, settings)
│   │   ├── stores/        # Svelte stores
│   │   └── utils/         # Utility functions
│   ├── routes/            # SvelteKit file-based routing
│   ├── app.css            # Global styles
│   ├── app.html           # HTML template
│   └── app.d.ts           # TypeScript declarations
├── static/                # Public static assets
├── svelte.config.js       # SvelteKit configuration
├── vite.config.ts         # Vite configuration
└── package.json
```

## 📄 License

All rights reserved © Art Vision Studio.
