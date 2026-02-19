# Blog Section Implementation Guide - CURSOR TRAIL EFFECT

## Preview
Your blog section preview is live at: **https://nxodlmvkugofw.ok.kimi.link**

**How it works**: Move your cursor around the screen and images will spawn/trail behind your cursor movement!

---

## What Was Created

A **cursor-following image trail effect** where:
- **No images visible initially** - just the title text
- **Images spawn at cursor position** as you move the mouse
- **Images trail behind cursor movement** creating a scattered collage effect
- **Images fade in and out** with a lifecycle of ~2-3 seconds
- **Maximum 20 images** kept on screen for performance
- **Custom cursor dot** follows your mouse

---

## How to Use in Your Project

### Step 1: Copy the Component

Copy the file `src/sections/BlogSection.tsx` from this project to your portfolio's `src/sections/` folder.

### Step 2: Install Dependencies

Make sure you have framer-motion installed:

```bash
npm install framer-motion
```

### Step 3: Replace Your Current Blog Section

In your main App.tsx or wherever your blog section is, replace it with:

```tsx
import BlogSection from './sections/BlogSection';

// Replace your existing blog section with:
<BlogSection
  title="BLOG"
  subtitle="Creative Insights"
  description="Your custom description here"
/>
```

### Step 4: Add Your Images

1. Create folder: `public/blog_images/`
2. Add your blog images to this folder
3. Update the `blogImageSources` array in BlogSection.tsx:

```tsx
const blogImageSources = [
  '/blog_images/your-image-1.jpg',
  '/blog_images/your-image-2.jpg',
  '/blog_images/your-image-3.jpg',
  // Add more images...
];
```

---

## How It Works

### Image Spawning Logic

```typescript
// Images spawn when:
// 1. Cursor moves more than 30px from last spawn position
// 2. At least 80ms has passed since last spawn
// 3. Images appear at random offset around cursor (±80px)
```

### Image Properties (Randomized)

| Property | Range | Description |
|----------|-------|-------------|
| `width` | 120-300px | Random width |
| `height` | 100-300px | Random height |
| `rotation` | -15° to 15° | Random rotation |
| `offsetX` | ±80px | Random X offset from cursor |
| `offsetY` | ±80px | Random Y offset from cursor |
| `lifetime` | 2-4 seconds | How long image stays visible |

### Image Lifecycle

1. **Spawn** - Image appears at cursor position with scale 0.5 → 1
2. **Visible** - Image stays for 2-4 seconds
3. **Fade Out** - Image fades out and gets removed

---

## Customization Options

### Props Available

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | string | "BLOG" | Main title text |
| `subtitle` | string | undefined | Subtitle below title |
| `description` | string | "Exploring creativity..." | Bottom description |
| `customImages` | string[] | blogImageSources | Array of image paths |
| `backgroundColor` | string | "#0a0a0a" | Section background color |
| `textColor` | string | "#ffffff" | Text color |

### Adjusting Spawn Behavior

In the component, modify these values:

```typescript
// In handleMouseMove:
if (distance > 30 && timeSinceLastSpawn > 80) {
  // distance > 30 = spawn every 30px of cursor movement
  // timeSinceLastSpawn > 80 = minimum 80ms between spawns
}

// In useEffect (image lifetime):
const lifetime = 2000 + index * 150; // 2-4 seconds

// Maximum images on screen:
if (updated.length > 20) {
  return updated.slice(updated.length - 20);
}
```

### Adjusting Image Sizes

```typescript
const randomWidth = 120 + Math.random() * 180;  // min 120, max 300
const randomHeight = 100 + Math.random() * 200; // min 100, max 300
const offsetX = -80 + Math.random() * 160;      // ±80px from cursor
```

---

## Files Included

```
/mnt/okcomputer/output/
├── app/
│   ├── src/
│   │   └── sections/
│   │       └── BlogSection.tsx    # Main component
│   └── public/
│       └── blog_images/           # Sample images
├── blog_images/                   # Copy of sample images
└── BLOG_SECTION_GUIDE.md         # This guide
```

---

## Performance Notes

- Maximum 20 images kept on screen at once
- Images automatically removed after their lifetime
- Uses `AnimatePresence` for smooth enter/exit animations
- Images are `pointer-events-none` so they don't interfere with cursor

---

## Need Help?

The component is fully typed with TypeScript. Key functions:
- `generateImageProps()` - Creates random image properties
- `handleMouseMove()` - Spawns images on cursor movement
- `useEffect` with timeouts - Handles image lifecycle/removal
