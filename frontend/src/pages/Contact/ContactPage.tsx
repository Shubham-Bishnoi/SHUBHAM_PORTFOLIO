import { GithubIcon, LinkedinIcon, PenSquare, TwitterIcon } from 'lucide-react'

import { Container } from '@/components/Layout/Container'
import { PageTitle } from '@/components/UI/PageTitle'

import './ContactPage.css'

export function ContactPage() {
  const socialLinks = [
    {
      id: 'x',
      label: 'X',
      href: 'https://x.com/shubhamnoi?s=21',
      Icon: TwitterIcon,
      ariaLabel: 'Visit Shubham on X (Twitter)',
    },
    {
      id: 'github',
      label: 'GitHub',
      href: 'https://github.com/Shubham-Bishnoi',
      Icon: GithubIcon,
      ariaLabel: 'Visit Shubham on GitHub',
    },
    {
      id: 'medium',
      label: 'Medium',
      href: 'https://medium.com/@shubhambis9oi',
      Icon: PenSquare,
      ariaLabel: 'Read Shubham on Medium',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/shubham-bishnoi-17b3b1363/',
      Icon: LinkedinIcon,
      ariaLabel: 'Visit Shubham on LinkedIn',
    },
  ]

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
              {socialLinks.map(({ id, label, href, Icon, ariaLabel }) => (
                <a
                  key={id}
                  className={`socialLink social-${id}`}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={ariaLabel}
                >
                  <span className="socialIcon" aria-hidden="true">
                    <Icon size={18} />
                  </span>
                  <span className="socialLabel">{label}</span>
                </a>
              ))}
            </div>
          </section>

          <aside className="contactRight theme-media" aria-label="Portrait">
            <img className="portrait" src="/images/shubham.jpeg" alt="Shubham" />
          </aside>
        </div>
      </Container>
    </main>
  )
}
