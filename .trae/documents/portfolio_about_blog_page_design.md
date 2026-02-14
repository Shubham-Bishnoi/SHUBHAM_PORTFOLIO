# Page Design Spec — About + Blog

## Global (applies to all pages)
**Layout**: Desktop-first, centered container (max-width ~1100–1200px) with flexible gutters; primary layout via Flexbox for horizontal alignment and CSS Grid for cards/lists.

**Meta (defaults)**
- Title template: `{Page Title} | {Your Name}`
- Description: short portfolio summary + page-specific suffix
- Open Graph: `og:title`, `og:description`, `og:type=website`, `og:url` (route), `og:image` (existing social image if any)

**Global styles (tokens)**
- Background: `#0b0f14` (or existing site bg)
- Surface/card: slightly lighter than background
- Text: high-contrast (near-white) with muted secondary text
- Accent: reuse existing brand accent color for links and primary buttons
- Typography: 
  - H1 40–48px, H2 28–32px, body 16–18px, line-height 1.6 for reading
- Links: underline on hover; keep focus-visible outline for accessibility
- Buttons: primary (accent fill) + secondary (outline); hover = slight brightness increase

**Shared components**
- Navbar: left logo/name; right nav items (Home, Projects/Skills if they exist, **Blog**, Contact). Active route style (underline or accent).
- Footer: compact links + small copyright.

---

## 1) Home (/)
**Meta**: Title “Home”; Description “Portfolio highlights and links.”

**Page structure**: Existing sections unchanged + add pre-footer section.

**Sections & components**
1. Navbar (shared)
2. Existing home content (keep as-is)
3. **Pre-footer blocks (new)**
   - Layout: 2-up Grid on desktop (2 columns), stacked on small screens
   - Block A: “My story”
     - Content: 1–2 sentence teaser
     - CTA: “Read my story” → `/about`
   - Block B: “Coding”
     - Content: 1–2 sentence teaser focusing on engineering interests
     - CTA: “See how I code” → `/about#coding` (or scroll target within About)
4. Footer (shared)

---

## 2) About — My story (/about)
**Meta**: Title “My story”; Description “Background, values, and what I build.”

**Page structure**: Stacked reading page with clear section anchors.

**Sections & components**
1. Navbar (shared)
2. Hero / header
   - Title: “My story”
   - Optional subtitle: 1 line positioning (who you are / what you do)
3. “My story” section
   - Layout: single-column prose (comfortable line length ~65–80 chars)
   - Components: paragraphs + optional mini timeline list
4. Spacer / divider
5. **Coding section (near footer)**
   - Anchor: `#coding`
   - Layout: 2-column on desktop (left: principles/stack; right: highlights)
   - Components: bullet list for principles + small cards for “What I like building”
6. Cross-links (small)
   - “Read the Blog” → `/blog`
   - “Back to Home” → `/`
7. Footer (shared)

---

## 3) Blog index (/blog)
**Meta**: Title “Blog”; Description “Writing about my work and ideas.”

**Page structure**: Header + list of posts.

**Sections & components**
1. Navbar (shared)
2. Page header
   - Title: “Blog”
   - Subtext: 1 line what to expect
3. Post list
   - Layout: vertical list or 2-up card grid (desktop) depending on existing aesthetic
   - Each post item: title, excerpt, (optional date), “Read” link
   - Initial required entry: “My story” → `/blog/my-story`
4. Footer (shared)

---

## 4) Blog post (/blog/my-story)
**Meta**: Title “My story”; Description uses excerpt; `og:type=article`.

**Page structure**: Article reading layout.

**Sections & components**
1. Navbar (shared)
2. Breadcrumb / back link
   - “← Back to Blog” → `/blog`
3. Article header
   - Title: “My story”
   - Optional: date and reading time (only if you already show these elsewhere)
4. Article body
   - Layout: single-column; max-width ~720–800px for readability
   - Typography: larger line-height; consistent spacing for headings and lists
5. End-of-article links
   - “About” → `/about`
   - “Back to Blog” → `/blog`
6. Footer (shared)
