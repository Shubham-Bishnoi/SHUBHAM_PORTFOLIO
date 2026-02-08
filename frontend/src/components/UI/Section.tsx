import type { ReactNode } from 'react'

type Props = {
  title: string
  children: ReactNode
}

export function Section({ title, children }: Props) {
  return (
    <section style={{ marginTop: 34, paddingTop: 28, borderTop: '1px solid var(--hairline)' }}>
      <h2 style={{ margin: 0, fontSize: 16, fontWeight: 500, letterSpacing: '0.04em' }}>{title}</h2>
      <div style={{ marginTop: 14 }}>{children}</div>
    </section>
  )
}

