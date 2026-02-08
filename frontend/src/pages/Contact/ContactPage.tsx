import { Container } from '@/components/Layout/Container'
import { PageTitle } from '@/components/UI/PageTitle'

import './ContactPage.css'

export function ContactPage() {
  return (
    <main className="contactRoot">
      <Container>
        <div className="contactLayout">
          <section className="contactLeft">
            <PageTitle
              title="contact."
              subtitle="Get in touch with me via social media or send me an email."
            />

            <div className="socialGrid" aria-label="Social links">
              <a className="socialLink twitter" href="https://twitter.com/" target="_blank" rel="noreferrer">
                <span className="socialIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M19.8 7.3c.01.16.01.32.01.49 0 4.95-3.77 10.66-10.66 10.66-2.12 0-4.09-.62-5.75-1.68.29.03.57.04.87.04 1.76 0 3.38-.6 4.67-1.61-1.65-.03-3.04-1.12-3.52-2.61.23.04.47.07.72.07.33 0 .66-.05.97-.13-1.72-.34-3.02-1.87-3.02-3.69v-.05c.5.28 1.08.46 1.7.48-1.01-.67-1.67-1.82-1.67-3.12 0-.69.18-1.33.51-1.88 1.85 2.27 4.62 3.76 7.74 3.92-.06-.27-.1-.55-.1-.84 0-2.02 1.64-3.66 3.66-3.66.52 0 1.02.11 1.48.31.46-.09.9-.26 1.3-.49-.15.48-.48.89-.9 1.15.41-.05.81-.16 1.17-.32-.28.41-.62.78-1.01 1.08Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="socialLabel">Twitter</span>
              </a>

              <a className="socialLink facebook" href="https://facebook.com/" target="_blank" rel="noreferrer">
                <span className="socialIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M13.5 21v-7.2h2.4l.36-2.8H13.5V9.22c0-.81.23-1.36 1.39-1.36h1.48V5.35c-.26-.03-1.14-.1-2.16-.1-2.14 0-3.6 1.31-3.6 3.71V11H8.25v2.8h2.36V21h2.89Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="socialLabel">Facebook</span>
              </a>

              <a
                className="socialLink linkedin"
                href="https://www.linkedin.com/in/sbishnoi29/"
                target="_blank"
                rel="noreferrer"
              >
                <span className="socialIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.94 8.98H4.2V20.5h2.74V8.98ZM5.57 4.5C4.69 4.5 4 5.2 4 6.06c0 .86.69 1.56 1.57 1.56.87 0 1.56-.7 1.56-1.56C7.13 5.2 6.44 4.5 5.57 4.5ZM20.5 20.5h-2.73v-5.6c0-1.34-.03-3.06-1.86-3.06-1.86 0-2.15 1.45-2.15 2.96v5.7H11.1V8.98h2.62v1.57h.04c.36-.68 1.26-1.4 2.6-1.4 2.78 0 3.29 1.83 3.29 4.2v7.15Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="socialLabel">LinkedIn</span>
              </a>

              <a className="socialLink instagram" href="https://instagram.com/" target="_blank" rel="noreferrer">
                <span className="socialIcon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M16.5 4.5h-9A3 3 0 0 0 4.5 7.5v9a3 3 0 0 0 3 3h9a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3Zm-4.5 11.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm4.1-6.8a.8.8 0 1 1 0-1.6.8.8 0 0 1 0 1.6Z"
                      fill="currentColor"
                    />
                  </svg>
                </span>
                <span className="socialLabel">Instagram</span>
              </a>
            </div>

            <div className="emailLine">
              <a href="mailto:shubhambis9oi@gmail.com">shubhambis9oi@gmail.com</a>
            </div>
          </section>

          <aside className="contactRight" aria-label="Portrait">
            <img className="portrait" src="/images/shubham.jpeg" alt="Shubham" />
          </aside>
        </div>
      </Container>
    </main>
  )
}
