# Page Design Spec (Desktop-first)

## Global Styles (All Pages)
- Layout system: CSS Grid for page-level splits; Flexbox for local alignment.
- Breakpoints: Desktop ≥1024px is primary; collapse to single-column at <1024px.
- Design tokens
  - Background: #ffffff (main), #f6f6f6 (subtle panels)
  - Text: #111111 (primary), #555555 (secondary)
  - Accent: #111111 (links/CTAs), hover uses underline + slight opacity
  - Typography: 16px base; H1 44–56px, H2 28–34px; line-height 1.4–1.6
  - Buttons: solid dark background + white text; focus ring visible
  - Inputs: 44px height; 1px border (#d0d0d0); error state border (#d33)
- Interaction: 150–200ms transitions for hover/focus; avoid heavy animations.

## Page: Home (/)
### Meta Information
- Title: “Your Name — Portfolio”
- Description: “Selected work and ways to contact me.”
- OG: title/description + optional preview image.

### Page Structure
- Stacked sections with generous whitespace; max-width container (1100–1200px).

### Sections & Components
1. Top Nav
   - Left: wordmark/name
   - Right: links (Work/Projects, Contact) with “Contact” as primary CTA
2. Hero
   - Large headline + 1–2 lines subcopy
   - Optional small list of roles/skills
3. Featured Projects
   - Grid of cards (2–3 columns desktop)
   - Card: title, 1–2 sentence summary, tags, links
4. Footer
   - Minimal links (GitHub/LinkedIn/Email) + copyright

## Page: Contact (/contact)
### Meta Information
- Title: “Contact — Your Name”
- Description: “Send a message and I’ll get back to you.”
- OG: title/description.

### Page Structure (Dannaway-inspired split)
- Desktop: 2-column grid (left text/social/form, right hero image) with strong vertical rhythm.
- Mobile: single column; info section above form.

### Sections & Components
1. Split Layout Container
   - Left Panel (Info)
     - Title: “contact.”
     - Subtitle: “Get in touch with me via social media or send me an email.”
     - Social links list: Twitter, Facebook, LinkedIn, Instagram
     - Form section title: “Send me an email”
     - Fields: Name, Email, Message
     - Submit button aligned right with “Δ”
   - Right Panel (Hero)
     - Placeholder image loaded from `/images/half-face.jpg`
2. Validation + States
   - Inline field errors under inputs
   - Form-level status area above submit: “Sending…”, success, or error
3. Success Behavior
   - On success: show a concise confirmation message; optionally clear fields
   - On error: keep user-entered values and show retry guidance

### Responsive Behavior
- <1024px: collapse to single column, reduce H1 size, maintain 16px base text.
- Ensure keyboard navigation order: left panel links then form fields.
