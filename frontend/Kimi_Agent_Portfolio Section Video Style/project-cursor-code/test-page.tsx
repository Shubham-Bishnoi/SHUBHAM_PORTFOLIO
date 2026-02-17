// Test page to verify custom cursor is working
// Use this to test before integrating into your main projects page

"use client";

import { useState } from "react";
import CustomCursor from "./CustomCursor";

export default function TestPage() {
  const [cursorSize, setCursorSize] = useState(100);
  const [hoverScale, setHoverScale] = useState(1.3);

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Custom Cursor */}
      <CustomCursor
        cursorSize={cursorSize}
        cursorColor="rgba(255, 255, 255, 0.9)"
        arrowColor="#000"
        hoverScale={hoverScale}
      />

      {/* Test Content */}
      <div className="max-w-4xl mx-auto px-8 py-20">
        <h1 className="text-5xl font-bold mb-8">Custom Cursor Test</h1>
        
        <p className="text-xl text-gray-400 mb-12">
          Move your mouse around. You should see a large circle cursor following your movement.
          Hover over the buttons and links below to see the hover effect.
        </p>

        {/* Controls */}
        <div className="bg-gray-900 p-6 rounded-lg mb-12">
          <h2 className="text-2xl font-semibold mb-4">Cursor Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Cursor Size: {cursorSize}px
              </label>
              <input
                type="range"
                min="50"
                max="150"
                value={cursorSize}
                onChange={(e) => setCursorSize(Number(e.target.value))}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Hover Scale: {hoverScale}x
              </label>
              <input
                type="range"
                min="1"
                max="2"
                step="0.1"
                value={hoverScale}
                onChange={(e) => setHoverScale(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Test Interactive Elements */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Test Hover Effects</h2>
          
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-white text-black rounded-full font-medium hover:bg-gray-200 transition-colors">
              Button Test
            </button>
            
            <a
              href="#"
              className="px-8 py-4 border-2 border-white rounded-full font-medium hover:bg-white hover:text-black transition-colors"
            >
              Link Test
            </a>
            
            <div
              data-cursor-hover
              className="px-8 py-4 bg-gray-800 rounded-full font-medium cursor-pointer hover:bg-gray-700 transition-colors"
            >
              data-cursor-hover Test
            </div>
          </div>

          {/* Project Card Test */}
          <div className="project-card mt-8 p-8 bg-gray-900 rounded-xl cursor-pointer hover:bg-gray-800 transition-colors">
            <h3 className="text-2xl font-semibold mb-2">Project Card Test</h3>
            <p className="text-gray-400">
              This div has the &quot;project-card&quot; class. Hovering here should scale up the cursor.
            </p>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 p-6 bg-green-900/20 border border-green-500/30 rounded-lg">
          <h3 className="text-lg font-semibold text-green-400 mb-2">
            ✅ Cursor Working?
          </h3>
          <p className="text-green-300/80">
            If you see a large white circle following your cursor, and it scales up when hovering 
            over interactive elements, the integration is successful! You can now copy the 
            CustomCursor component to your main project.
          </p>
        </div>

        {/* Troubleshooting */}
        <div className="mt-8 p-6 bg-red-900/20 border border-red-500/30 rounded-lg">
          <h3 className="text-lg font-semibold text-red-400 mb-2">
            ❌ Not Working?
          </h3>
          <ul className="text-red-300/80 list-disc list-inside space-y-1">
            <li>Check browser console for errors</li>
            <li>Ensure you&apos;re not on a touch device (cursor is disabled for touch)</li>
            <li>Verify framer-motion and lucide-react are installed</li>
            <li>Check that CSS styles are applied (default cursor should be hidden)</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
