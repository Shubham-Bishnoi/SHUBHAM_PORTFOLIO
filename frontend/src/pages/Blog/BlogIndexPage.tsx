import type { MouseEvent } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export function BlogIndexPage() {
  const containerRef = useRef<HTMLElement | null>(null)

  const [trailImages, setTrailImages] = useState<
    Array<{
      id: string
      src: string
      x: number
      y: number
      width: number
      height: number
      rotation: number
    }>
  >([])
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  const removalTimeoutsRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())
  const imageIdCounter = useRef(0)
  const lastSpawnTime = useRef(0)
  const lastSpawnPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 })

  const imageSources = useRef(
    [
      '06e7c0d8-22eb-409f-9db7-40b1f03ae905 (1).jpg',
      '3193b437-f3a5-4e1e-8d4b-7445252831ac.jpg',
      'IMG_0020.jpg',
      'IMG_0315.jpg',
      'IMG_0323.jpg',
      'IMG_0475.jpg',
      'IMG_0534.jpg',
      'IMG_0538.jpg',
      'IMG_0581.jpg',
      'IMG_0680.jpg',
      'IMG_1058.jpg',
      'IMG_1124.jpg',
      'IMG_1211.jpg',
      'IMG_1344.jpg',
      'IMG_1345.jpg',
      'IMG_1348.jpg',
      'IMG_1472.jpg',
      'IMG_1515.jpg',
      'IMG_1525.jpg',
      'IMG_1548.jpg',
      'IMG_1740.jpg',
      'IMG_1762.jpg',
      'IMG_1883.jpg',
      'IMG_2176.jpg',
      'IMG_2197.jpg',
      'IMG_2225.jpg',
      'IMG_2262.jpg',
      'IMG_2629.jpg',
      'IMG_2641.jpg',
      'IMG_2739.jpg',
      'IMG_2786.jpg',
      'IMG_2991.jpg',
      'IMG_3138.jpg',
      'IMG_3544.jpg',
      'IMG_3673.jpg',
      'IMG_3685.jpg',
      'IMG_3832.jpg',
      'IMG_3872.jpg',
      'IMG_3883.jpg',
      'IMG_3964.jpg',
      'IMG_3978.jpg',
      'IMG_4147.jpg',
      'IMG_4262.jpg',
      'IMG_4587.jpg',
      'IMG_5178.jpg',
      'IMG_5230.jpg',
      'IMG_5471.jpg',
      'IMG_5550.jpg',
      'IMG_5558.jpg',
      'IMG_5572.jpg',
      'IMG_5609.jpg',
      'IMG_5634.jpg',
      'IMG_5794.jpg',
      'IMG_6198.jpg',
      'IMG_6223.jpg',
      'IMG_6374.jpg',
      'IMG_6500.jpg',
      'IMG_6551.jpg',
      'IMG_6565.jpg',
      'IMG_6587.jpg',
      'IMG_6639.jpg',
      'IMG_6654.jpg',
      'IMG_7122.jpg',
      'IMG_7283.jpg',
      'IMG_7517.jpg',
      'IMG_7527.jpg',
      'IMG_7540.jpg',
      'IMG_7542.jpg',
      'IMG_7750.jpg',
      'IMG_8007.jpg',
      'IMG_8331.jpg',
      'IMG_8352.jpg',
      'IMG_8388_2.jpg',
      'IMG_8388_3.jpg',
      'IMG_8437.jpg',
      'IMG_8501.jpg',
      'IMG_8575.jpg',
      'IMG_8603.jpg',
      'IMG_8717_2.jpg',
      'IMG_8720.jpg',
      'IMG_8829.jpg',
      'IMG_8849.jpg',
      'IMG_8879.jpg',
      'IMG_8882.jpg',
      'IMG_8950.jpg',
      'IMG_8973.jpg',
      'IMG_8989.jpg',
      'IMG_9045.jpg',
      'IMG_9054.jpg',
      'IMG_9114.jpg',
      'IMG_9189.jpg',
      'IMG_9263.jpg',
      'IMG_9360.jpg',
      'IMG_9589.jpg',
      'IMG_9607.jpg',
      'IMG_9614.jpg',
      'IMG_9736.jpg',
      'IMG_9983_Original.jpg',
      'be5d7783-c6ab-4749-a3a6-9f10e83090c4.jpg',
    ].map((name) => encodeURI(`/blog_images/${name}`))
  )

  const generateImageProps = useCallback(
    (cursorX: number, cursorY: number) => {
      const sources = imageSources.current
      const randomImage = sources[Math.floor(Math.random() * sources.length)]
      const randomWidth = 120 + Math.random() * 180
      const randomHeight = 100 + Math.random() * 200
      const randomRotation = -15 + Math.random() * 30

      const offsetX = -80 + Math.random() * 160
      const offsetY = -80 + Math.random() * 160

      return {
        id: `img-${imageIdCounter.current++}`,
        src: randomImage,
        x: cursorX + offsetX - randomWidth / 2,
        y: cursorY + offsetY - randomHeight / 2,
        width: randomWidth,
        height: randomHeight,
        rotation: randomRotation,
      }
    },
    []
  )

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const el = containerRef.current
      if (!el) return

      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      setMousePosition({ x: e.clientX, y: e.clientY })

      const dx = x - lastSpawnPosition.current.x
      const dy = y - lastSpawnPosition.current.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      const now = Date.now()
      const timeSinceLastSpawn = now - lastSpawnTime.current

      if (distance > 30 && timeSinceLastSpawn > 80) {
        const newImage = generateImageProps(x, y)

        setTrailImages((prev) => {
          const updated = [...prev, newImage]
          if (updated.length > 20) return updated.slice(updated.length - 20)
          return updated
        })

        lastSpawnTime.current = now
        lastSpawnPosition.current = { x, y }
      }
    },
    [generateImageProps]
  )

  useEffect(() => {
    const liveIds = new Set(trailImages.map((img) => img.id))
    for (const [id, timeout] of removalTimeoutsRef.current) {
      if (liveIds.has(id)) continue
      clearTimeout(timeout)
      removalTimeoutsRef.current.delete(id)
    }

    trailImages.forEach((image, index) => {
      if (removalTimeoutsRef.current.has(image.id)) return
      const lifetime = 2000 + index * 150
      const timeout = setTimeout(() => {
        setTrailImages((prev) => prev.filter((img) => img.id !== image.id))
        removalTimeoutsRef.current.delete(image.id)
      }, lifetime)
      removalTimeoutsRef.current.set(image.id, timeout)
    })
  }, [trailImages])

  useEffect(() => {
    const timeouts = removalTimeoutsRef.current
    return () => {
      for (const timeout of timeouts.values()) clearTimeout(timeout)
      timeouts.clear()
    }
  }, [])

  const handleMouseEnter = () => setIsHovering(true)
  const handleMouseLeave = () => {
    setIsHovering(false)
    window.setTimeout(() => setTrailImages([]), 500)
  }

  return (
    <main style={{ margin: 0 }}>
      <section
        ref={containerRef}
        className="relative w-full min-h-screen overflow-hidden cursor-none"
        style={{ backgroundColor: '#0a0a0a' }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
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
              <div className="w-full h-full overflow-hidden shadow-2xl" style={{ borderRadius: '2px' }}>
                <img src={image.src} alt="Blog" className="w-full h-full object-cover" draggable={false} />
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isHovering ? (
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
            <div className="w-3 h-3 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: '#ffffff' }} />
          </motion.div>
        ) : null}

        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] pt-4 sm:pt-8 px-4 sm:px-8">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <motion.div
              className="pointer-events-none select-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.12 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: -1,
              }}
            >
              <span
                className="text-[clamp(64px,20vw,220px)] font-light tracking-[0.25em]"
                style={{ color: '#ffffff', opacity: 0.06 }}
              >
                CASE STUDIES
              </span>
            </motion.div>

            <h1
              className="text-[clamp(48px,8vw,120px)] font-bold tracking-tight leading-none select-none"
              style={{ color: '#ffffff' }}
            >
              SHUBHAM
              <br className="block sm:hidden" />
              <span className="hidden sm:inline"> </span>
              BISHNOI
            </h1>

            <motion.p
              className="mt-4 text-sm sm:text-base md:text-lg tracking-[0.18em] sm:tracking-[0.25em] uppercase"
              style={{ color: '#ffffff', opacity: 0.8 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              AI FULL-STACK ENGINEER
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute bottom-12 left-0 right-0 text-center px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <p
              className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed"
              style={{ color: '#ffffff', opacity: 0.7 }}
            >
              Follow my journey from building real-time AI systems and agentic workflows to
              shipping enterprise products with measurable impact. Here I share case studies,
              engineering decisions, and lessons learned along the way.
            </p>
          </motion.div>

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: trailImages.length === 0 ? 0.4 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-sm tracking-widest uppercase" style={{ color: '#ffffff' }}>
              Move cursor to explore
            </p>
          </motion.div>
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at center, transparent 30%, #0a0a0a90 100%)`,
          }}
        />
      </section>
    </main>
  )
}
