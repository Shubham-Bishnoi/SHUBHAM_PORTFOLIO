# Trello Integration Prompt - CURSOR TRAIL EFFECT

Copy and paste this into your Trello card or send to your developer:

---

## Trello Card Title
Implement Blog Section with Cursor-Following Image Trail Effect

---

## Trello Card Description

### Overview
Replace the current blog section with a new interactive design where images spawn and trail behind the cursor as the user moves their mouse.

### Preview
Live preview: https://nxodlmvkugofw.ok.kimi.link

**How to test**: Move your cursor around the screen - images will appear and trail behind your cursor movement!

### Behavior
- No images visible initially (only title text)
- As user moves cursor, images spawn at cursor position
- Images trail behind cursor movement creating scattered collage
- Images fade out after 2-4 seconds
- Maximum 20 images on screen at once

### Implementation Steps

#### 1. Install Dependency
```bash
npm install framer-motion
```

#### 2. Add Component File
Create `src/sections/BlogSection.tsx` with the provided code.

#### 3. Replace Existing Blog Section
In the main App file, remove the current blog section and import:
```tsx
import BlogSection from './sections/BlogSection';

// Use:
<BlogSection
  title="BLOG"
  subtitle="Creative Insights"
  description="Exploring creativity through design, photography, and visual storytelling."
/>
```

#### 4. Add Images
- Create folder: `public/blog_images/`
- Add blog images to this folder
- Update the `blogImageSources` array in BlogSection.tsx with your image paths

### Key Features
- **Cursor tracking**: Images spawn based on cursor movement
- **Random properties**: Each image has random size, rotation, and offset
- **Lifecycle management**: Images auto-fade after 2-4 seconds
- **Performance optimized**: Max 20 images, automatic cleanup
- **Custom cursor**: Small dot follows cursor

### Customization

#### Spawn Rate (in handleMouseMove)
```typescript
if (distance > 30 && timeSinceLastSpawn > 80) {
  // distance = pixels cursor must move
  // timeSinceLastSpawn = minimum ms between spawns
}
```

#### Image Size Range
```typescript
const randomWidth = 120 + Math.random() * 180;  // 120-300px
const randomHeight = 100 + Math.random() * 200; // 100-300px
```

#### Image Lifetime
```typescript
const lifetime = 2000 + index * 150; // 2-4 seconds
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "BLOG" | Main title |
| `subtitle` | string | - | Subtitle text |
| `description` | string | - | Bottom description |
| `customImages` | string[] | - | Array of image paths |
| `backgroundColor` | string | "#0a0a0a" | Background color |
| `textColor` | string | "#ffffff" | Text color |

### Acceptance Criteria
- [ ] No images visible on initial load
- [ ] Images spawn when moving cursor
- [ ] Images trail behind cursor movement
- [ ] Images fade out after their lifetime
- [ ] Maximum 20 images on screen
- [ ] Smooth animations with framer-motion
- [ ] Old blog section completely removed
- [ ] Responsive on all devices

### Files to Receive
- BlogSection.tsx component file
- Sample images for testing

---

## Checklist for Developer

- [ ] Install framer-motion
- [ ] Copy BlogSection.tsx to src/sections/
- [ ] Add blog images to public/blog_images/
- [ ] Update image paths in component
- [ ] Update App.tsx to use new BlogSection
- [ ] Remove old blog section code
- [ ] Test cursor trail effect
- [ ] Test performance with rapid cursor movement
- [ ] Deploy and verify

---

## Questions?

Refer to the full guide: BLOG_SECTION_GUIDE.md
