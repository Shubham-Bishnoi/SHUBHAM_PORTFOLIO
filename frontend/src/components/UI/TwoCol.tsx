import type { ReactNode } from 'react'

import './TwoCol.css'

type Props = {
  left: ReactNode
  right: ReactNode
}

export function TwoCol({ left, right }: Props) {
  return (
    <div className="twoCol">
      <div>{left}</div>
      <div>{right}</div>
    </div>
  )
}

