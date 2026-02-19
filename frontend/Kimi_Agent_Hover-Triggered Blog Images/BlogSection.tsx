import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrailImage {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

interface CursorPosition {
  x: number;
  y: number;
}

// Available blog images - REPLACE THESE WITH YOUR OWN
const blogImageSources = [
  '/blog_images/branding.jpg',
  '/blog_images/poster.jpg',
  '/blog_images/portrait.jpg',
  '/blog_images/illustration.jpg',
  '/blog_images/abstract.jpg',
  '/blog_images/packaging.png',
  '/blog_images/colorful_abstract.jpg',
  '/blog_images/identity.jpg',
  '/blog_images/digital_art.jpg',
];

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  customImages?: string[];
  backgroundColor?: string;
  textColor?: string;
}

const BlogSection = ({
  title = 'BLOG',
  subtitle,
  description = 'Exploring creativity through design, photography, and visual storytelling.',
  customImages,
  backgroundColor = '#0a0a0a',
  textColor = '#ffffff',
}: BlogSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [trailImages, setTrailImages] = useState<TrailImage[]>([]);
  const [mousePosition, setMousePosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const imageIdCounter = useRef(0);
  const lastSpawnTime = useRef(0);
  const lastSpawnPosition = useRef<CursorPosition>({ x: 0, y: 0 });
  
  const images = customImages || blogImageSources;

  // Generate random image properties
  const generateImageProps = useCallback((cursorX: number, cursorY: number): TrailImage => {
    const randomImage = images[Math.floor(Math.random() * images.length)];
    const randomWidth = 120 + Math.random() * 180; // 120-300px width
    const randomHeight = 100 + Math.random() * 200; // 100-300px height
    const randomRotation = -15 + Math.random() * 30; // -15 to 15 degrees
    
    // Add some randomness to position around cursor
    const offsetX = -80 + Math.random() * 160;
    const offsetY = -80 + Math.random() * 160;
    
    return {
      id: `img-${imageIdCounter.current++}`,
      src: randomImage,
      x: cursorX + offsetX - randomWidth / 2,
      y: cursorY + offsetY - randomHeight / 2,
      width: randomWidth,
      height: randomHeight,
      rotation: randomRotation,
    };
  }, [images]);

  // Handle mouse move
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
    
    // Calculate distance from last spawn position
    const distance = Math.sqrt(
      Math.pow(x - lastSpawnPosition.current.x, 2) + 
      Math.pow(y - lastSpawnPosition.current.y, 2)
    );
    
    const now = Date.now();
    const timeSinceLastSpawn = now - lastSpawnTime.current;
    
    // Spawn new image if moved enough distance and enough time passed
    if (distance > 30 && timeSinceLastSpawn > 80) {
      const newImage = generateImageProps(x, y);
      
      setTrailImages(prev => {
        // Keep only last 15-20 images for performance
        const updated = [...prev, newImage];
        if (updated.length > 20) {
          return updated.slice(updated.length - 20);
        }
        return updated;
      });
      
      lastSpawnTime.current = now;
      lastSpawnPosition.current = { x, y };
    }
  }, [generateImageProps]);

  // Remove images after their lifetime
  useEffect(() => {
    if (trailImages.length === 0) return;
    
    const timeouts: ReturnType<typeof setTimeout>[] = [];
    
    trailImages.forEach((image, index) => {
      // Staggered removal - older images fade out first
      const lifetime = 2000 + index * 150;
      
      const timeout = setTimeout(() => {
        setTrailImages(prev => prev.filter(img => img.id !== image.id));
      }, lifetime);
      
      timeouts.push(timeout);
    });
    
    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [trailImages.length]);

  // Handle mouse enter/leave
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => {
    setIsHovering(false);
    // Clear all images when mouse leaves
    setTimeout(() => setTrailImages([]), 500);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden cursor-none"
      style={{ backgroundColor }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trail Images Layer */}
      <AnimatePresence>
        {trailImages.map((image) => (
          <motion.div
            key={image.id}
            className="absolute pointer-events-none"
            style={{
              left: image.x,
              top: image.y,
              width: image.width,
              height: image.height,
            }}
            initial={{ 
              opacity: 0, 
              scale: 0.5,
              rotate: image.rotation - 10,
            }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              rotate: image.rotation,
            }}
            exit={{ 
              opacity: 0, 
              scale: 0.8,
            }}
            transition={{
              opacity: { duration: 0.3 },
              scale: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
              rotate: { duration: 0.4 },
            }}
          >
            <div 
              className="w-full h-full overflow-hidden shadow-2xl"
              style={{
                borderRadius: '2px',
              }}
            >
              <img
                src={image.src}
                alt="Blog"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Custom Cursor */}
      {isHovering && (
        <motion.div
          className="fixed pointer-events-none z-50"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div 
            className="w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2"
            style={{ backgroundColor: textColor }}
          />
        </motion.div>
      )}

      {/* Content Layer */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-8">
        {/* Main Title */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1
            className="text-[15vw] sm:text-[12vw] md:text-[10vw] font-bold tracking-tighter leading-none select-none"
            style={{ color: textColor }}
          >
            {title}
          </h1>
          
          {subtitle && (
            <motion.p
              className="mt-4 text-lg sm:text-xl md:text-2xl tracking-widest uppercase"
              style={{ color: textColor, opacity: 0.8 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              {subtitle}
            </motion.p>
          )}
        </motion.div>

        {/* Description */}
        <motion.div
          className="absolute bottom-12 left-0 right-0 text-center px-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <p
            className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed"
            style={{ color: textColor, opacity: 0.7 }}
          >
            {description}
          </p>
        </motion.div>

        {/* Hint Text */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: trailImages.length === 0 ? 0.4 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <p 
            className="text-sm tracking-widest uppercase"
            style={{ color: textColor }}
          >
            Move cursor to explore
          </p>
        </motion.div>
      </div>

      {/* Subtle gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 30%, ${backgroundColor}90 100%)`,
        }}
      />
    </section>
  );
};

export default BlogSection;
