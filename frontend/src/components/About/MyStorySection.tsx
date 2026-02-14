import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

import './MyStorySection.css'

type Props = {
  className?: string
}

function makeSvgDataUrl(svg: string): string {
  const encoded = encodeURIComponent(svg)
  return `data:image/svg+xml;charset=utf-8,${encoded}`
}

export function MyStorySection({ className }: Props) {
  const [mainFailed, setMainFailed] = useState(false)
  const [avatarFailed, setAvatarFailed] = useState(false)

  const fallbackMain = useMemo(() => {
    return makeSvgDataUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f6f6f6"/>
            <stop offset="100%" stop-color="#eaeaea"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="750" fill="url(#g)"/>
      </svg>`
    )
  }, [])

  const fallbackAvatar = useMemo(() => {
    return makeSvgDataUrl(
      `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#f1f1f1"/>
            <stop offset="100%" stop-color="#e1e1e1"/>
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r="100" fill="url(#g)"/>
      </svg>`
    )
  }, [])

  const mainSrc = mainFailed ? fallbackMain : '/images/about/my-story.jpg'
  const avatarSrc = avatarFailed ? fallbackAvatar : '/images/shubham.jpeg'

  return (
    <section className={['myStorySection', className].filter(Boolean).join(' ')}>
      <div className="myStoryGrid">
        <div className="myStoryMedia">
          <div className="myStoryCard" aria-hidden="true">
            <img
              className="myStoryCardImage"
              src={mainSrc}
              alt=""
              loading="lazy"
              onError={() => setMainFailed(true)}
            />
          </div>

          <div className="myStoryAvatar" aria-hidden="true">
            <img
              className="myStoryAvatarImage"
              src={avatarSrc}
              alt=""
              loading="lazy"
              onError={() => setAvatarFailed(true)}
            />
          </div>
        </div>

        <div className="myStoryCopy">
          <h2 className="myStoryHeading">My story</h2>
          <p className="myStoryBody">
            Learn a little bit more about me, how I got into building AI systems, and how I’ve built my career as an
            Analyst / AI Full-Stack Engineer. I’ve included key learnings, project decisions, and behind-the-scenes notes
            from building real enterprise systems.
          </p>
          <Link className="myStoryLink" to="/blog/my-story">
            Read my story
          </Link>
        </div>
      </div>
    </section>
  )
}

