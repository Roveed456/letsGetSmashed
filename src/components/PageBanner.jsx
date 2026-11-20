import { Link } from 'react-router-dom'

// banner for inner pages
// edgeColor should match the section below
export default function PageBanner({ title, accent, crumb, edgeColor = '#ffffff' }) {
  return (
    <section className="relative overflow-hidden bg-maroon pb-16 pt-10 text-center text-white lg:pb-[110px] lg:pt-14">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero/hero-background.svg)' }}
      />

      <div className="relative px-4">
        <h1 className="font-rowdies text-[36px] uppercase leading-[1.1] sm:text-[52px] lg:text-[64px]">
          {title} <span className="text-brand-orange">{accent}</span>
        </h1>
        <p className="mt-4 flex items-center justify-center gap-3 font-rowdies text-[14px] uppercase lg:text-[18px]">
          <Link to="/" className="transition hover:text-brand-orange">Home page</Link>
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="m9 6 6 6-6 6" />
          </svg>
          <span>{crumb}</span>
        </p>
      </div>

      {/* torn edge */}
      <div
        className="absolute -bottom-px left-0 w-full"
        style={{
          aspectRatio: '2000 / 119',
          backgroundColor: edgeColor,
          maskImage: 'url(/images/hero/torn-edge.webp)',
          WebkitMaskImage: 'url(/images/hero/torn-edge.webp)',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />
    </section>
  )
}
