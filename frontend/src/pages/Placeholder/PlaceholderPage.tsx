import { Container } from '@/components/Layout/Container'

type Props = {
  title: string
}

export function PlaceholderPage({ title }: Props) {
  return (
    <main style={{ padding: '56px 0 84px' }}>
      <Container>
        <h1 style={{ fontSize: 44, lineHeight: 1.1, margin: 0 }}>{title}.</h1>
        <p style={{ color: 'var(--muted)', margin: '14px 0 0' }}>Coming soon.</p>
      </Container>
    </main>
  )
}

