# Experience “Time Tunnel” — Page/Section Design Spec (Desktop-first)

## Global Styles (for this section)
- Theme: light
- Background: off-white (#FBFBFC) with subtle radial/linear gradients behind the “tunnel” (very low contrast)
- Text: near-black (#111827), secondary text (#4B5563)
- Accent: single highlight color (e.g., indigo #4F46E5) used for active states, spine glow, and progress indicator
- Cards: white surface (#FFFFFF), 1px border (#E5E7EB), soft shadow (on hover/active only)
- Typography scale: section title 32–40px, company/role 18–20px, body 14–16px
- Interactions: 150–250ms transitions; disable/limit motion when `prefers-reduced-motion: reduce`

## Meta Information
- Page title: unchanged (site-level)
- Section heading (semantic): `h2` “Experience”
- Section description (optional): short 1–2 line intro for context

## Layout
- Desktop-first: 12-col grid container; section max-width 1100–1200px; generous vertical spacing (48–72px between entries).
- Timeline layout: CSS Grid or Flex hybrid
  - Center column: “tunnel spine” (2–4px) + soft glow
  - Left/right columns: alternating cards aligned to spine via connector dot/line
- Responsive behavior
  - ≥1024px: alternating left/right cards, progress widget pinned within section
  - 640–1023px: reduce card width; keep alternation if space allows
  - <640px: single-column stacked cards; spine becomes left-aligned; progress widget becomes horizontal compact bar or collapsible

## Page Structure (Home / Portfolio page — Experience section only)
1. Section Header
2. Timeline Body (spine + entries)
3. In-section Progress Widget (sticky)

## Sections & Components

### 1) Section Header
- Elements
  - Title: “Experience”
  - Subtitle: one sentence (“A timeline of roles and impact.”)
- Behavior
  - Anchor target for nav jump (e.g., `#experience`)

### 2) Time Tunnel Spine
- Visuals
  - Center vertical line with subtle gradient
  - Milestone nodes aligned with each entry (dot/marker)
  - Active node: larger + accent ring/glow
- Behavior
  - Spine remains visually continuous through the section

### 3) Timeline Entry (Alternating Card)
- Card content (minimum)
  - Role title
  - Company name
  - Date range
  - 2–5 bullet highlights
  - Optional tags (skills) and links (company, project) if you already have them
- States
  - Default: neutral border, no glow
  - Hover (pointer): slight lift/shadow, border tint
  - Active (from IntersectionObserver): stronger border + accent left strip (or top border), marker glow on spine
  - Focus (keyboard): visible outline (2px accent) and skip heavy animations
- Interaction
  - Clicking card does not change route; optional expand/collapse is NOT included unless it already exists

### 4) Active Scroll Highlighting (IntersectionObserver-driven)
- Observation targets
  - Each entry wrapper (preferred) or a small sentinel at the top of each entry
- Active rule (UX)
  - The entry closest to the viewport center (or with highest intersection ratio) becomes active
  - Active updates should feel stable (use a small hysteresis / threshold band)

### 5) In-section Progress Widget (Sticky)
- Placement
  - Desktop: sticky in the right gutter/column of the Experience section (top offset ~96px)
  - Mobile: docked under header or as a thin sticky bar
- Contents
  - Progress bar showing 0–100% through the Experience section
  - Milestone list (company/role short labels) with active indicator
- Interactions
  - Click milestone: smooth scroll to entry; also sets active immediately for feedback
  - Keyboard: milestones are buttons with `aria-current="true"` on active
- Empty/edge behavior
  - When above section: progress shows 0%
  - When past section end: progress shows 100%

## Accessibility
- Semantic structure: `section` + `h2`
- Reduced motion: disable glow pulsing/parallax; use instant scroll
- Contrast: ensure active accent meets WCAG AA on white
- Screen readers: active milestone uses `aria-current`; timeline entries have clear headings

## Minimal animation guidelines
- Active transition: border-color + subtle shadow only (no large transforms)
- Optional: very subtle spine glow that follows active marker (disabled for reduced motion)
