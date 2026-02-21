import Spline from '@splinetool/react-spline'

import { cn } from '@/lib/utils'

type Props = {
  sceneUrl: string
  className?: string
  'aria-label'?: string
}

export function SplineRobot({ sceneUrl, className, 'aria-label': ariaLabel }: Props) {
  return (
    <div className={cn('h-full w-full bg-transparent', className)} aria-label={ariaLabel}>
      <Spline scene={sceneUrl} />
    </div>
  )
}
