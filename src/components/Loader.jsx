import { useEffect, useState } from 'react'
import Logo from './Logo'

// loading screen: the bar fills up, then the screen slides away like a curtain
const FILL_TIME = 1500 // ms to reach 90%
const HOLD_AT_FULL = 450 // ms to hold at 100%
const EXIT_TIME = 900 // ms, same as duration-[900ms] below

export default function Loader({ isReady, onExitStart }) {
  const [progress, setProgress] = useState(0)
  const [stage, setStage] = useState('loading')

  // fill to ~90%, then creep up to 95%
  useEffect(() => {
    if (isReady) return
    const startTime = performance.now()
    let frameId

    function tick(now) {
      const elapsed = now - startTime
      const t = Math.min(elapsed / FILL_TIME, 1)
      const eased = 1 - Math.pow(1 - t, 3) // ease out
      const creep = Math.max(0, (elapsed - FILL_TIME) / 1000)
      setProgress(Math.min(95, 90 * eased + creep))
      frameId = requestAnimationFrame(tick)
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [isReady])

  // when ready, wait a moment then leave
  useEffect(() => {
    if (!isReady) return
    const leaveTimer = setTimeout(() => {
      setStage('leaving')
      onExitStart()
    }, HOLD_AT_FULL)
    const removeTimer = setTimeout(() => setStage('gone'), HOLD_AT_FULL + EXIT_TIME)
    return () => {
      clearTimeout(leaveTimer)
      clearTimeout(removeTimer)
    }
  }, [isReady, onExitStart])

  if (stage === 'gone') return null

  const isLeaving = stage === 'leaving'
  const shownProgress = isReady ? 100 : progress

  return (
    <div
      role="status"
      aria-label="Loading"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-maroon transition-transform duration-[900ms] ease-in-out ${
        isLeaving ? '-translate-y-[115vh]' : 'translate-y-0'
      }`}
    >
      {/* doodles, same as the hero */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero/hero-background.svg)' }}
      />

      {/* curved bottom edge */}
      <div className="absolute left-0 top-full h-[12vh] w-full rounded-b-[50%] bg-maroon" />

      {/* logo + bar */}
      <div
        className={`relative flex flex-col items-center gap-8 transition duration-500 ease-in ${
          isLeaving ? 'scale-125 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <Logo className="h-[110px] w-[190px] animate-pulse sm:h-[150px] sm:w-[260px]" />

        <div className="w-[220px] sm:w-[280px]">
          {/* track + fill */}
          <div className="h-[8px] overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-brand-orange transition-[width] duration-300 ease-out"
              style={{ width: `${shownProgress}%` }}
            />
          </div>

        </div>
      </div>
    </div>
  )
}
