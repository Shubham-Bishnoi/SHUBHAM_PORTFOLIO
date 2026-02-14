import { Link } from 'react-router-dom'

import { Container } from '@/components/Layout/Container'
import { getBlogPosts } from '@/content/blog/posts'

import './BlogIndexPage.css'

export function BlogIndexPage() {
  const posts = getBlogPosts()

  return (
    <main className="blogRoot">
      <Container>
        <div className="blogHeader">
          <h1 className="blogH1">blog.</h1>
          <p className="blogSubtitle">Writing about systems, decisions, and behind-the-scenes notes.</p>
        </div>

        <section aria-label="Blog posts" className="blogGrid">
          {posts.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} className="blogCard">
              <div className="blogCover">
                <img
                  src={p.coverImage}
                  alt=""
                  className="blogCoverImg"
                  loading="lazy"
                  onError={(e) => {
                    const img = e.currentTarget
                    img.src =
                      'data:image/svg+xml;charset=utf-8,' +
                      encodeURIComponent(
                        '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="750" viewBox="0 0 1200 750"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f6f6f6"/><stop offset="100%" stop-color="#eaeaea"/></linearGradient></defs><rect width="1200" height="750" fill="url(#g)"/></svg>'
                      )
                    img.onerror = null
                  }}
                />
              </div>

              <div className="blogCardBody">
                <div className="blogMeta">{new Date(p.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                <div className="blogTitle">{p.title}</div>
                <div className="blogExcerpt">{p.excerpt}</div>
                {p.tags?.length ? (
                  <div className="blogTags" aria-label="Tags">
                    {p.tags.slice(0, 3).map((t) => (
                      <span key={t} className="blogTag">
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </Link>
          ))}
        </section>
      </Container>
    </main>
  )
}

