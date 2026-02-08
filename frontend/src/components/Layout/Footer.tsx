import { Container } from '@/components/Layout/Container'

export function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--hairline)' }}>
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '28px 0',
            gap: 16,
            flexWrap: 'wrap',
            fontSize: 13,
            color: 'var(--muted)',
          }}
        >
          <span>© {new Date().getFullYear()} Shubham Bishnoi</span>
          <span>Bangalore, India</span>
        </div>
      </Container>
    </footer>
  )
}
