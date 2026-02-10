# Page Design — Projects

## Global (applies to both pages)
### Layout
- Desktop-first, centered content column with a max width (e.g., 1120–1200px).
- Use CSS Grid for card layouts and Flexbox for small alignment rows.
- Spacing system: 4px base (4/8/12/16/24/32/48/64).
- Responsive behavior (minimal):
  - ≥1024px: 3-column card grid.
  - 768–1023px: 2-column card grid.
  - <768px: 1-column stacked.

### Meta Information (defaults)
- Title template: `{Page Title} | Shubham Bishnoi`
- Description: concise, portfolio-friendly summary of the page content.
- Open Graph:
  - `og:type=website`
  - `og:title`, `og:description` follow page title/description.

### Global Styles (monochrome-only)
- Background: `#FFFFFF`
- Surface: `#FFFFFF`
- Text primary: `#111111`
- Text secondary: `#4B5563`
- Border: `#E5E7EB`
- Muted fill (chips/skeleton): `#F3F4F6`
- Focus ring: `#111111` (2px)
- Typography:
  - H1: 36/44, weight 600
  - H2: 24/32, weight 600
  - Body: 16/24, weight 400
  - Small: 14/20
- Buttons/links:
  - Primary button: black bg + white text; hover: `#1F2937`.
  - Secondary button: white bg + black border; hover: light gray fill.
  - Links: underlined on hover only (keep monochrome).
- Cards:
  - White background, 1px gray border, subtle shadow optional using gray-only (no colored shadows).

### Shared Components
- Top navigation (if present in your site shell): include a “Projects” nav item.
- Breadcrumb/back link on detail page.
- Loading skeleton: gray blocks with subtle pulse.
- Error/empty states: monochrome icon (optional), strong heading, one-line explanation, retry/back action.

---

## Page: /projects (Projects)
### Meta
- Title: `Projects`
- Description: `A curated list of projects sourced from profile.json.`

### Page Structure
- Stacked sections with a header area and a card grid.

### Sections & Components
1. Header
   - H1: “Projects”
   - Subtext: one sentence (e.g., “Selected work across AI systems, automation, and cybersecurity.”)
   - Divider line (1px border color).

2. Projects Grid
   - CSS Grid card list.
   - Each Project Card includes:
     - Project name (clickable, navigates to `/projects/:slug`).
     - Year (small, secondary text).
     - Tags row (wrap chips): monochrome chips with border and light fill.
     - Impact preview: show first 1–2 bullets (truncate with line-clamp).
     - Footer actions:
       - “View details” (text link).
       - Optional external links icons/text (“Demo”, “GitHub”) only if `links.demo` / `links.github` are non-empty.

3. States
   - Loading: 6–9 skeleton cards.
   - Empty: “No projects available.”
   - Error: “Unable to load projects.” + “Retry” button.

### Interaction Notes
- Entire card is clickable (with clear focus outline), but external links inside card must be separate interactive targets.
- Keyboard:
  - Tab order: card → internal links.
  - Enter on card opens detail.

---

## Page: /projects/:slug (Project Details)
### Meta
- Title: `{Project Name}`
- Description: first impact bullet if available; else a short fallback.
- Open Graph:
  - `og:title={Project Name}`
  - `og:description` derived from impact[0].

### Page Structure
- Two-column desktop layout:
  - Left: main content (name, impact).
  - Right: sticky sidebar (year, tags, links).

### Sections & Components
1. Top Row
   - Back link: “← All projects” (to `/projects`).
   - Optional breadcrumb style: “Projects / {Project Name}”.

2. Main Header
   - H1: project name.
   - Secondary line: year.

3. Main Content — Impact
   - H2: “Impact”
   - Bullet list rendering the full `impact[]` array from `profile.json`.
   - Typography: readable line-height, comfortable spacing.

4. Sidebar (sticky on desktop)
   - Card container with:
     - Year
     - Tags (wrap chips)
     - Links:
       - Demo (button or link) only if non-empty
       - GitHub (button or link) only if non-empty

5. States
   - Loading: skeleton for header + list.
   - Not found: “Project not found” + action “Back to Projects”.
   - Error: “Unable to load project.” + action “Back to Projects”.

### Interaction Notes
- External links open in a new tab with `rel="noopener noreferrer"`.
- Focus outlines must be clearly visible (2px black) on all interactive elements.
