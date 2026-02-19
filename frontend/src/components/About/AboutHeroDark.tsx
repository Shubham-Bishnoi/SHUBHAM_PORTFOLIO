import { Container } from '@/components/Layout/Container'
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

      <div
        className="pointer-events-none absolute left-1/2 top-[55%] z-10 w-full -translate-x-1/2 -translate-y-1/2"
        style={{ paddingInline: 'clamp(12px, 4vw, 48px)' }}
      >
        <div
          className="mx-auto select-none bg-[linear-gradient(90deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] bg-clip-text text-[clamp(72px,18vw,240px)] leading-[0.9] tracking-[0.04em] text-transparent"
          style={{ textShadow: '0 0 32px rgba(255,255,255,0.08)', textAlign: 'center' }}
        >
          SHUBHAM
        </div>
      </div>

      <SplineRobot
        sceneUrl={ROBOT_SCENE_URL}
        aria-label="3D robot"
        className="absolute inset-0 z-20 h-full w-full pointer-events-auto bg-transparent lg:translate-x-[6%]"
      />

      <Container className="relative z-30">
        <div className="grid grid-cols-1 items-center gap-10 py-14 lg:grid-cols-2 lg:gap-12 lg:py-20">
          <div className="relative pointer-events-none">
            <h1 className="m-0 text-[clamp(38px,6vw,56px)] font-medium leading-[1.02] tracking-[-0.02em]">
              about.
            </h1>

            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-white/75 sm:text-base">
              <li className="list-none">AI full-stack engineer focused on agentic systems + real-time automation</li>
              <li className="list-none">FastAPI, React/Next.js, LangChain/LangGraph, RAG, vector search</li>
              <li className="list-none">Built enterprise use cases + stakeholder demos</li>
            </ul>
          </div>

          <div aria-hidden="true" className="hidden lg:block" />
        </div>
      </Container>
    </section>
  )
}
