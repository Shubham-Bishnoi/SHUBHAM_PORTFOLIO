import { Link, Navigate, useParams } from 'react-router-dom'

import { Container } from '@/components/Layout/Container'
import { getBlogPostBySlug } from '@/content/blog/posts'

import './BlogPostPage.css'

export function BlogPostPage() {
  const params = useParams()
  const slug = params.slug
  if (!slug) return <Navigate to="/blog" replace />
  const post = getBlogPostBySlug(slug)
  if (!post) return <Navigate to="/blog" replace />

  return (
    <main className="postRoot">
      <Container>
        <div className="postTopRow">
          <Link to="/blog" className="postBack">
            ← Back to Blog
          </Link>
        </div>

        <article className="postArticle">
          <header className="postHeader">
            <h1 className="postH1">{post.title}</h1>
            <p className="postMeta">
              {new Date(post.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </header>

          <div className="postCover">
            <img
              className="postCoverImg"
              src={post.coverImage}
              alt=""
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

          <div className="postBody">
            {post.content.map((b, idx) => {
              if (b.type === 'h2') {
                return (
                  <h2 key={idx} className="postH2">
                    {b.text}
                  </h2>
                )
              }
              return (
                <p key={idx} className="postP">
                  {b.text}
                </p>
              )
            })}
          </div>
        </article>
      </Container>
    </main>
  )
}

