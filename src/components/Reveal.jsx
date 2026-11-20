import { useEffect, useRef, useState } from 'react'

// fades/slides in when scrolled into view
// direction: up | left | right | zoom, delay in ms
const hiddenPosition = {
  up: 'translate-y-10',
  left: '-translate-x-10',
  right: 'translate-x-10',
  zoom: 'scale-90',
}

export default function Reveal({ children, direction = 'up', delay = 0, className = '' }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = ref.current
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // only once
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -5% 0px' },
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const state = isVisible
    ? 'translate-x-0 translate-y-0 scale-100 opacity-100'
    : `opacity-0 ${hiddenPosition[direction]}`

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition duration-700 ease-out ${state} ${className}`}
    >
      {children}
    </div>
  )
}
