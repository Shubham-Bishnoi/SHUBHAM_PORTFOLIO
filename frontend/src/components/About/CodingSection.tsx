import { ArrowUpRight } from 'lucide-react'

import './CodingSection.css'

type Row = {
  label: string
  secondary: string
  href: string
}

const rows: Row[] = [
  {
    label: 'LeetCode',
    secondary: 'sbishnoi29 · 950+',
    href: 'https://leetcode.com/sbishnoi29/',
  },
  {
    label: 'GeeksforGeeks',
    secondary: 'shubhambishnoi29 · 600+',
    href: 'https://auth.geeksforgeeks.org/user/shubhambishnoi29/',
  },
]

type Props = {
  id?: string
  className?: string
}

export function CodingSection({ id, className }: Props) {
  return (
    <section id={id} className={['codingSection', className].filter(Boolean).join(' ')}>
      <h2 className="codingHeading">Coding</h2>
      <div className="codingList" role="list">
        {rows.map((r) => (
          <a
            key={r.href}
            className="codingRowLink"
            href={r.href}
            target="_blank"
            rel="noreferrer"
            role="listitem"
          >
            <div className="codingRowLeft">
              <div className="codingRowLabel">{r.label}</div>
              <div className="codingRowSecondary">{r.secondary}</div>
            </div>
            <ArrowUpRight size={16} aria-hidden="true" className="codingRowIcon" />
          </a>
        ))}
      </div>
    </section>
  )
}

