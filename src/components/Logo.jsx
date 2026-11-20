// logo made of 3 stacked svg layers
const layers = [
  { src: '/images/hero/logo-maroon.svg', position: 'inset-[14.54%_15.87%_9.72%_12.29%]' },
  { src: '/images/hero/logo-yellow.svg', position: 'inset-[32.39%_39.81%_38.71%_39.39%]' },
  { src: '/images/hero/logo-red.svg', position: 'inset-[6.08%_25.53%_5.51%_25.28%]' },
]

export default function Logo({ className = '' }) {
  return (
    <div className={`relative shrink-0 ${className}`}>
      {layers.map((layer) => (
        // each layer has its own position
        <div key={layer.src} className={`absolute ${layer.position}`}>
          <img src={layer.src} alt="Let's Get Smashed" className="h-full w-full -rotate-180 -scale-x-100" />
        </div>
      ))}
    </div>
  )
}
