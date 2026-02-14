# Skills Avalanche — Page Design Spec (Desktop-first)

## Global Styles (inherit from existing theme)
- Use existing tokens for:
  - Colors: background/surface, text primary/secondary, border, accent
  - Radius: pill radius matches your current chip/button rounding
  - Shadows: subtle elevation consistent with cards/buttons
  - Typography: same font family and scale as About body text
- Interactive states:
  - Hover: slight lift + stronger shadow (desktop)
  - Active/drag: “pressed” shadow and higher z-index
  - Focus: visible outline using your accent token (WCAG-friendly)

## Page: About

### Meta Information
- Title: “About”
- Description: Keep existing About metadata; no changes required.
- Open Graph: Keep existing About OG tags; no changes required.

### Layout
- Layout system: existing About layout (keep current grid/flex structure).
- The Skills section becomes a two-layer block:
  1) Text/heading (unchanged)
  2) Playground container (new), sized for comfortable interaction on desktop.

### Page Structure (Skills section only)
1. Section header row
   - Title: “Skills” (existing)
   - Optional helper text: short instruction line (“Drag pills, toss them, Reset to replay.”)
2. Playground panel (replaces skills list)
   - A bounded “arena” with a subtle surface background, border, and soft shadow.
   - Contains the physics pills.
3. Controls row
   - Primary control: “Reset” button (replays avalanche)
   - Secondary indicator (optional): “Paused” when off-screen/tab hidden
4. Accessibility fallback
   - If reduced motion is enabled: show a static pill grid with the same pills and styling (no canvas motion).

### Sections & Components

#### 1) SkillsAvalancheSection (wrapper)
- Responsibilities:
  - Own section spacing consistent with other About sections.
  - Provide anchor for scroll initialization.

#### 2) SkillsAvalancheArena (playground container)
- Visuals:
  - Background: theme “surface” token
  - Border: 1px using theme border token
  - Radius: matches card radius
  - Min height (desktop): ~360–420px; max height doesn’t exceed viewport
- Behavior:
  - Initializes when ~30–50% visible.
  - Pauses when out of view.

#### 3) SkillPill (physics body render)
- Content:
  - Skill label text (from existing skills list)
- Styling:
  - Pill shape, consistent padding, readable font size
  - Color variants derived from theme accent palette (avoid random colors that clash)
- Interaction:
  - Drag with mouse; throw on release
  - Click/tap nudge: small impulse for delight without chaos

#### 4) Controls
- Reset button:
  - Align right on desktop; stack under arena on mobile
  - Uses existing button styles

### Responsive behavior
- Desktop-first:
  - Arena is wide and prominent; controls sit on same row as helper text.
- Tablet/mobile:
  - Arena height reduces; pills slightly larger for touch.
  - Controls stack below arena; instruction text short.

### Motion & performance
- Reduced motion:
  - Replace arena animation with a static grid layout of the same pills.
- Performance:
  - Cap pill count to the actual skills list length; avoid decorative extras.
  - Pause simulation when tab is hidden or arena is off-screen.
