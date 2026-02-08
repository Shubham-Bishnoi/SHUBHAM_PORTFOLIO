import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'

import { Container } from '@/components/Layout/Container'
import { PageTitle } from '@/components/UI/PageTitle'
import { SocialLinks } from '@/components/UI/SocialLinks'

import './ContactPage.css'

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error' }

export function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [submit, setSubmit] = useState<SubmitState>({ kind: 'idle' })
  const [imgOk, setImgOk] = useState(true)

  const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? 'http://localhost:8000'

  const links = useMemo(
    () => [
      { label: 'Twitter', href: 'https://twitter.com/' },
      { label: 'Facebook', href: 'https://facebook.com/' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/sbishnoi29/' },
      { label: 'Instagram', href: 'https://instagram.com/' },
    ],
    []
  )

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (submit.kind === 'submitting') return

    setSubmit({ kind: 'submitting' })

    try {
      const res = await fetch(`${apiBaseUrl.replace(/\/$/, '')}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) {
        setSubmit({ kind: 'error' })
        return
      }

      setName('')
      setEmail('')
      setMessage('')
      setSubmit({ kind: 'success' })
    } catch {
      setSubmit({ kind: 'error' })
    }
  }

  return (
    <main className="contactRoot">
      <Container>
        <div className="contactGrid">
          <section>
            <PageTitle
              title="contact."
              subtitle="Get in touch with me via social media or send me an email."
            />

            <SocialLinks links={links} />

            <h2 className="sectionTitle">Send me an email</h2>

            <form className="form" onSubmit={onSubmit}>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                  minLength={2}
                />
              </div>

              <div className="field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  minLength={10}
                />
              </div>

              <div className="actions">
                <div className="status" role="status" aria-live="polite">
                  {submit.kind === 'success' ? 'Message sent.' : null}
                  {submit.kind === 'error' ? 'Something went wrong.' : null}
                  {submit.kind === 'submitting' ? 'Sending…' : null}
                </div>
                <button className="submit" type="submit" disabled={submit.kind === 'submitting'}>
                  Δ
                </button>
              </div>
            </form>
          </section>

          <aside className="hero" aria-label="Contact hero">
            {imgOk ? (
              <img src="/images/half-face.jpg" alt="Portrait" onError={() => setImgOk(false)} />
            ) : (
              <div style={{ width: '100%', height: '100%' }} />
            )}
          </aside>
        </div>
      </Container>
    </main>
  )
}
