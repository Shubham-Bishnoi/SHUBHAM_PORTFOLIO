type SocialLink = {
  label: string
  href: string
}

type Props = {
  links: SocialLink[]
}

export function SocialLinks({ links }: Props) {
  return (
    <ul
      style={{
        listStyle: 'none',
        padding: 0,
        margin: '0 0 34px',
        display: 'grid',
        gap: 10,
        fontSize: 14,
      }}
    >
      {links.map((l) => (
        <li key={l.href}>
          <a href={l.href} target="_blank" rel="noreferrer">
            {l.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

