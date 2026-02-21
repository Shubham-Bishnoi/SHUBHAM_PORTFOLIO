import { SplineRobot } from '@/components/common/SplineRobot'
import { cn } from '@/lib/utils'

const ROBOT_SCENE_URL = 'https://prod.spline.design/VmRl0wyF9INmtz0z/scene.splinecode'

type Props = {
  className?: string
}

export function AboutHeroDark({ className }: Props) {
  return (
    <section
      className={cn(
        'relative mx-[calc(50%-50vw)] min-h-[640px] w-screen overflow-hidden bg-[#05060A] text-white lg:min-h-[740px]',
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(900px circle at 18% 30%, rgba(255,255,255,0.06), transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(820px circle at 78% 42%, rgba(255,255,255,0.05), transparent 62%)',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.92)_100%)]" />
      </div>

      <SplineRobot
        sceneUrl={ROBOT_SCENE_URL}
        aria-label="3D robot"
        className="absolute inset-0 z-10 h-full w-full pointer-events-auto bg-transparent"
      />
    </section>
  )
}
