import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export function Container({ children, className }: Props) {
  return (
    <div
      className={className}
      style={{ maxWidth: 'var(--max)', margin: '0 auto', padding: '0 var(--pad)' }}
    >
      {children}
    </div>
  )
}

