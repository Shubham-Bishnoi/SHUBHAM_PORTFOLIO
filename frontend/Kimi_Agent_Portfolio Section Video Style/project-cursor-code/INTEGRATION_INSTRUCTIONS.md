# Project Showcase with Large Custom Cursor - Integration Guide

## Overview
This implementation adds a **large custom cursor** (100px circle with arrow) and a **full-width project showcase section** to your portfolio website, matching the design from the video you provided.

## Files Included

1. **`CustomCursor.tsx`** - The global custom cursor component
2. **`ProjectShowcase.tsx`** - Full-width project gallery with hover effects
3. **`cursor-styles.css`** - Global CSS styles for the cursor
4. **`usage-example.tsx`** - Example of how to use the components

---

## Step-by-Step Integration with Trae

### Step 1: Install Dependencies

In your Trae terminal, run:

```bash
npm install framer-motion lucide-react
```

### Step 2: Add the CSS Styles

Open your global CSS file (usually `src/app/globals.css` or `src/styles/globals.css`) and add the contents of `cursor-styles.css` at the end.

**In Trae:**
1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows)
2. Type "Open Settings (JSON)" and select it
3. Or simply navigate to your CSS file in the file explorer

Add this CSS:

```css
/* Custom Cursor Styles */
body.custom-cursor-active,
body.custom-cursor-active * {
  cursor: none !important;
}

body.custom-cursor-active a,
body.custom-cursor-active button,
body.custom-cursor-active [data-cursor-hover],
body.custom-cursor-active .cursor-pointer {
  cursor: none !important;
}

/* Hide on touch devices */
@media (pointer: coarse) {
  .custom-cursor {
    display: none !important;
  }
  
  body.custom-cursor-active,
  body.custom-cursor-active * {
    cursor: auto !important;
  }
}

/* Project card hover effects */
.project-card img {
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.project-card:hover img {
  transform: scale(1.05);
}
```

### Step 3: Create the Components

In Trae, create two new files:

#### File 1: `src/components/CustomCursor.tsx`

1. Right-click on `src/components` folder → "New File"
2. Name it `CustomCursor.tsx`
3. Copy and paste the entire content from the `CustomCursor.tsx` file provided

#### File 2: `src/components/ProjectShowcase.tsx`

1. Right-click on `src/components` folder → "New File"
2. Name it `ProjectShowcase.tsx`
3. Copy and paste the entire content from the `ProjectShowcase.tsx` file provided

### Step 4: Update Your Projects Page

Open your existing projects page (likely `src/app/projects/page.tsx` or `src/pages/projects.tsx`).

**Replace the content with this structure:**

```tsx
"use client";

import CustomCursor from "@/components/CustomCursor";
import ProjectShowcase from "@/components/ProjectShowcase";

// Your existing project data - update image paths
const projects = [
  {
    id: "project-1",
    title: "Your Project Title",
    category: "Category",
    year: "2025",
    image: "/path/to/your/image.jpg",
    link: "/projects/project-1",
  },
  // ... add all your projects
];

export default function ProjectsPage() {
  return (
    <main className="bg-black min-h-screen">
      {/* Custom Cursor - Place at the top */}
      <CustomCursor
        cursorSize={100}
        cursorColor="rgba(255, 255, 255, 0.9)"
        arrowColor="#000"
        hoverScale={1.3}
      />

      {/* Your existing page content (header, etc.) */}
      
      {/* Project Showcase - Replaces your current grid */}
      <ProjectShowcase
        projects={projects}
        title="Work we're proud of"
        subtitle="Over the years I completed hundreds of projects with several clients. Here is a selection of the best ones."
      />
      
      {/* Your existing footer */}
    </main>
  );
}
```

### Step 5: Update Project Data

Convert your existing project data to match the new format. Your current projects have:
- Title
- Category/tags
- Description
- Image

The new format requires:
- `id` - unique identifier
- `title` - project name
- `category` - main category (e.g., "Audit Analytics")
- `year` - project year
- `image` - image URL/path
- `link` - link to project detail page (optional)

### Step 6: Add Body Class (Important!)

To hide the default cursor, you need to add a class to the body. In your root layout file (`src/app/layout.tsx` or `src/pages/_app.tsx`):

```tsx
// In your layout or _app file
useEffect(() => {
  document.body.classList.add('custom-cursor-active');
  
  return () => {
    document.body.classList.remove('custom-cursor-active');
  };
}, []);
```

Or add it directly to your HTML:

```tsx
<body className="custom-cursor-active">
  {/* your content */}
</body>
```

---

## Customization Options

### Cursor Size
Change the `cursorSize` prop (default is 100px):

```tsx
<CustomCursor cursorSize={120} />  // Larger cursor
<CustomCursor cursorSize={80} />   // Smaller cursor
```

### Cursor Colors
```tsx
<CustomCursor
  cursorColor="rgba(255, 255, 255, 0.9)"  // White border
  arrowColor="#000"                        // Black arrow on hover
/>
```

For a different color scheme:
```tsx
<CustomCursor
  cursorColor="rgba(0, 0, 0, 0.8)"  // Dark border
  arrowColor="#fff"                  // White arrow
/>
```

### Hover Scale
```tsx
<CustomCursor hoverScale={1.5} />  // Scale up more on hover
<CustomCursor hoverScale={1.1} />  // Subtle scale
```

---

## Troubleshooting

### Cursor not appearing?
1. Check that `framer-motion` is installed
2. Verify the component is mounted (add `console.log` to check)
3. Ensure you're on a non-touch device (cursor is hidden on mobile)

### Default cursor still showing?
1. Make sure the CSS is imported in your global styles
2. Check that `custom-cursor-active` class is on the body
3. Verify no other CSS is overriding the cursor styles

### Cursor laggy?
The cursor uses `requestAnimationFrame` for smooth following. If it's laggy:
1. Reduce the `ease` value in CustomCursor.tsx (line ~45)
2. Close other browser tabs/applications
3. Check for heavy animations running simultaneously

### Images not loading?
Update the `image` paths in your project data to match your actual image locations.

---

## Trae-Specific Tips

1. **Auto-import**: Trae should auto-suggest imports when you type component names
2. **Format on save**: Press `Cmd+S` / `Ctrl+S` to auto-format
3. **Error highlighting**: Check the Problems panel (`Cmd+Shift+M`) for TypeScript errors
4. **Preview**: Use Trae's built-in preview or run `npm run dev` in terminal

---

## File Structure After Integration

```
src/
├── components/
│   ├── CustomCursor.tsx      ← NEW
│   └── ProjectShowcase.tsx   ← NEW
├── app/
│   ├── projects/
│   │   └── page.tsx          ← MODIFIED
│   ├── globals.css           ← MODIFIED (add cursor styles)
│   └── layout.tsx            ← MODIFIED (add body class)
└── ...
```

---

## Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Verify all imports are correct
3. Ensure dependencies are installed
4. Try restarting the dev server: `npm run dev`
