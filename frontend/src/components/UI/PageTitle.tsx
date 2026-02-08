type Props = {
  title: string
  subtitle?: string
}

export function PageTitle({ title, subtitle }: Props) {
  return (
    <div style={{ marginBottom: 26 }}>
      <h1
        style={{
          fontSize: 'clamp(38px, 6vw, 56px)',
          lineHeight: 1.02,
          letterSpacing: '-0.02em',
          margin: 0,
          fontWeight: 500,
        }}
      >
        {title}
      </h1>
      {subtitle ? (
        <p style={{ margin: '14px 0 0', maxWidth: 520, color: 'var(--muted)' }}>{subtitle}</p>
      ) : null}
    </div>
  )
}
