# Agent Instructions: Static Website Project

## 1. Project Overview
- **Project Name:** Personal Portfolio
- **Category:** Personal Portfolio
- **Description:** A modern, accessible, and responsive personal developer portfolio showcasing skills, featured projects, and contact channels.
- **Primary Goal:** Showcase portfolio pieces, demonstrate technical competencies, and drive contact/inquiries.

## 2. Technical Stack & Constraints
- **Core Stack:** Plain HTML5, CSS3, Vanilla JavaScript (ES6+).
- **Zero External Dependencies:** Do NOT use external build tools, package managers (npm/yarn), or third-party CSS/JS frameworks (no Tailwind CDN, Bootstrap, React, or jQuery).
- **Font & Icon Constraints:** Modern web-safe system font stacks or Google Fonts via `<link>` tag. Use inline SVGs or local SVG files in `assets/` for icons.
- **Paths:** All internal links, stylesheets, scripts, and asset references must use **relative paths** (e.g., `./assets/profile.jpg`, `./style.css`, `./script.js`) to ensure compatibility with GitHub Pages subdirectory hosting.

## 3. Directory Layout
```text
portfolio-website/
├── AGENTS.md
├── index.html
├── style.css
├── script.js
└── assets/
    ├── profile.jpg
    └── profile.png
```

## 4. UI/UX & Design Guidelines
- **Color Palette:**
  - Primary: `#1E293B` (Slate Navy)
  - Accent / CTA: `#3B82F6` (Vibrant Blue)
  - Background: `#F8FAFC` (Off-white / Light) or `#0F172A` (Dark)
  - Text: `#0F172A` (High-contrast dark neutral) or `#F8FAFC` (Light text for dark mode)
- **Typography:** Clean, accessible sans-serif system stack (`system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif`).
- **Layout Approach:** Mobile-first design using CSS Flexbox and CSS Grid.
- **Responsiveness:** Fluid breakpoints (Mobile: < 640px, Tablet: 640px - 1024px, Desktop: > 1024px).

## 5. Required Sections
- **Header / Navbar:** Brand logo/title, navigation links (`#about`, `#skills`, `#projects`, `#contact`), mobile hamburger menu toggle button, and interactive Dark/Light mode toggle button.
- **Hero Section:** Clear value proposition / headline, short introduction, call-to-action buttons, and featured profile image (`./assets/profile.jpg`).
- **About Me Section:** Background story, developer interests, experience, and educational highlights.
- **Skills Section:** Organized categories of developer competencies (Frontend, Backend, Developer Tools & Workflow) with semantic lists and skill badges.
- **Projects Section:** Grid of featured project cards (`<article>`) with project titles, descriptions, technology badges, live preview links, and source code links.
- **Interactive Feature:** Dark/Light mode theme switch with `aria-label`, `aria-pressed`, and smooth theme persistence.
- **Contact / CTA Section:** Semantic contact form (`<form>`) with accessible input labels, required attributes, validation feedback, and direct contact card details (email, location, social links).
- **Footer:** Semantic `<footer>` with copyright notice, quick navigation links, and accessible social media profile links.

## 6. Agent Rules of Engagement
- Always generate complete, functional code blocks—avoid placeholders, ellipsis comments, or truncated snippets.
- Ensure semantic HTML tags are prioritized (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`).
- Keep CSS organized with clear section headers, CSS custom properties (`:root`), and smooth transitions.
- Keep JavaScript modular, event-driven, and scoped without polluting global namespace.
