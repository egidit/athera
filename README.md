# Athera Technologies — Corporate Website

The proof of concept website for **Athera Technologies, UAB** — a technology company delivering automation, data engineering, cyber security, and custom software development for businesses across the EU.

> **Live site:** [www.athera.egidit.com](https://www.athera.egidit.com)

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [SEO & Meta](#seo--meta)
- [Performance & Security](#performance--security)
- [Browser Support](#browser-support)
- [License](#license)

---

## Overview

A modern, single-page corporate website with a dedicated service catalogue page. Fully static — no frameworks, no build tools, no server-side dependencies. Designed to be deployed anywhere that serves HTML.

### Key Features

- **Fullpage scroll snapping** on desktop (≥1024px) with smooth section-to-section navigation via mouse wheel, keyboard, and touch
- **Ambient animated background** with parallax scroll effect
- **Responsive design** — mobile-first with breakpoints at 600px, 768px, and 900px
- **Dark theme** with CSS custom properties for easy theming
- **MAILTO-based contact** — no backend, no form processing, no CORS issues
- **Comprehensive SEO** — Open Graph, Twitter Cards, JSON-LD structured data, sitemap, robots.txt
- **Accessibility** — semantic HTML5 landmarks (`<main>`, `<nav>`, `<footer>`), ARIA labels, `<noscript>` fallback
- **Production-ready** — `.htaccess` (Apache), `_headers`/`_redirects` (Netlify/Cloudflare), web manifest

---

## Tech Stack

| Category       | Technology                              |
| -------------- | --------------------------------------- |
| **Markup**     | HTML5 (semantic, accessible)            |
| **Styling**    | CSS3 (custom properties, flexbox, grid) |
| **Scripting**  | Vanilla JavaScript (ES5-compatible)     |
| **Typography** | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts) |
| **Icons**      | Inline SVG                              |
| **Build**      | None — zero dependencies                |

---

## Project Structure

```
Athera/
├── index.html              # Main landing page (hero, services, careers, contact)
├── services.html           # Full service catalogue with expandable sections
├── css/
│   └── styles.css          # All site styles (~940 lines)
├── js/
│   └── main.js             # All interactivity (~190 lines)
├── assets/
│   ├── logo.svg            # Horizontal logo (nav bar)
│   ├── logo-stacked.svg    # Stacked logo (footer)
│   ├── og-image.svg        # Open Graph social preview image
│   ├── favicon.ico         # Browser favicon
│   └── favicon.svg         # SVG favicon (legacy)
├── robots.txt              # Crawler directives + sitemap reference
├── sitemap.xml             # XML sitemap for search engines
├── site.webmanifest        # PWA web app manifest
├── humans.txt              # Team & technology credits
├── .htaccess               # Apache: HTTPS, compression, caching, security headers
├── _headers                # Netlify/Cloudflare: security & caching headers
├── _redirects              # Netlify: domain redirect rules
└── README.md               # This file
```

---

## Getting Started

### Prerequisites

None. This is a static site — all you need is a web browser.

### Local Development

**Option 1 — VS Code Live Server (recommended):**

1. Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension
2. Open the project folder in VS Code
3. Right-click `index.html` → **Open with Live Server**

**Option 2 — Python:**

```bash
cd Athera
python -m http.server 8000
# Open http://localhost:8000
```

**Option 3 — Node.js:**

```bash
npx serve .
```

**Option 4 — Just open it:**

Double-click `index.html` in your file explorer. Everything works without a server.

---

## Deployment

This site is designed to be **drag-and-drop ready** on any static hosting platform. No build step required.

### GitHub Pages

1. Push this repository to GitHub
2. Go to **Settings → Pages**
3. Set source to the branch containing these files (e.g., `main`)
4. Your site will be live at `https://<username>.github.io/<repo>/`

To use a custom domain (`www.atheratech.com`):

1. Add a `CNAME` file with your domain: `www.atheratech.com`
2. Configure DNS:
   - **A records** pointing to GitHub's IPs (see [GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site))
   - **CNAME record** for `www` → `<username>.github.io`
3. Enable **Enforce HTTPS** in GitHub Pages settings

### Netlify

1. Connect your GitHub repository (or drag-and-drop the folder)
2. No build command needed — leave it blank
3. Publish directory: `/` (root)
4. The `_headers` and `_redirects` files will be automatically picked up

### Cloudflare Pages

1. Connect your GitHub repository
2. Framework preset: **None**
3. Build command: (leave empty)
4. Build output directory: `/`
5. The `_headers` file will be respected automatically

### Traditional Hosting (Apache/Nginx)

Upload all files to your web root. The `.htaccess` file handles:
- HTTP → HTTPS redirect
- non-www → www redirect
- Gzip compression
- Browser caching
- Security headers
- Directory listing prevention

---

## SEO & Meta

The site includes production-grade SEO out of the box:

| Feature                | Details                                                   |
| ---------------------- | --------------------------------------------------------- |
| **Meta tags**          | Title, description, keywords, author, robots              |
| **Open Graph**         | Full `og:` tags for Facebook/LinkedIn/social sharing      |
| **Twitter Cards**      | `summary_large_image` with dedicated preview image        |
| **JSON-LD**            | `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`    |
| **Canonical URLs**     | Prevents duplicate content indexing                       |
| **Sitemap**            | `sitemap.xml` with all pages, lastmod, priority           |
| **Robots.txt**         | Allows all crawlers, references sitemap                   |
| **Geo tags**           | Region (LT) and placename (Lithuania)                     |
| **Structured data**    | Company info, VAT, contacts, social profiles              |

### OG Image

The `assets/og-image.svg` file is used for social media previews. It embeds the actual logo SVG paths (not text) so it renders consistently everywhere. For platforms that don't support SVG in `og:image`, convert it to a 1200×630 PNG and update the meta tags.

---

## Performance & Security

### Performance

- **Zero dependencies** — no npm, no bundler, no framework overhead
- **Deferred scripts** — `<script defer>` for non-blocking page load
- **Preconnected fonts** — `rel="preconnect"` to Google Fonts
- **Minimal CSS** — single stylesheet, no unused code
- **`<noscript>` fallback** — content visible even with JS disabled
- **Browser caching** — assets cached for up to 1 year via `.htaccess` / `_headers`
- **Gzip compression** — configured in `.htaccess` for Apache

### Security Headers

Configured via `.htaccess` (Apache) and `_headers` (Netlify/Cloudflare):

| Header                    | Value                                              |
| ------------------------- | -------------------------------------------------- |
| `X-Content-Type-Options`  | `nosniff`                                          |
| `X-Frame-Options`         | `SAMEORIGIN`                                       |
| `X-XSS-Protection`        | `1; mode=block`                                    |
| `Referrer-Policy`         | `strict-origin-when-cross-origin`                  |
| `Permissions-Policy`      | `camera=(), microphone=(), geolocation=(), payment=()` |
| `Strict-Transport-Security` | Commented out — enable after confirming HTTPS    |

---

## Browser Support

| Browser         | Version |
| --------------- | ------- |
| Chrome          | 60+     |
| Firefox         | 60+     |
| Safari          | 12+     |
| Edge            | 79+     |
| Mobile Chrome   | 60+     |
| Mobile Safari   | 12+     |

The site uses ES5-compatible JavaScript (`var`, `Array.prototype.slice.call`, etc.) for maximum compatibility.

---

## License

This project is proprietary software. All rights reserved by **Athera Technologies, UAB**.

- The source code, design, and content are the intellectual property of Athera Technologies
- Unauthorized copying, modification, or distribution is prohibited
- The Athera Technologies name, logo, and branding are registered trademarks

---

<p align="center">
  <strong>Athera Technologies, UAB</strong><br>
  VAT: LT100016921313 · Entity code: 306720328<br>
  <a href="mailto:info@atheratech.com">info@atheratech.com</a> · <a href="tel:+37061520993">+370 61 520 993</a><br>
  <a href="https://www.linkedin.com/company/athera-tech/">LinkedIn</a>
</p>



