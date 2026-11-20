export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-maroon">
      {/* food doodles in the background */}
      <div
        className="absolute inset-0 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero/hero-background.svg)' }}
      />

      {/* headline */}
      <div className="relative mx-auto flex max-w-[806px] flex-col items-center px-4 pt-8 text-center text-white lg:pt-[46px]">
        <h1 style={{ animationDelay: '100ms' }} className="animate-fade-up font-rowdies text-[36px] font-bold leading-[1.1] tracking-[-1px] sm:text-[52px] lg:text-[70px] lg:leading-[76.8px] lg:tracking-[-2.56px]">
          Satisfy Your Cravings, <span className="text-[#ec9615]">Delight Your</span> Tastebuds
        </h1>
        <p style={{ animationDelay: '300ms' }} className="animate-fade-up mt-3 text-[18px] leading-7 tracking-[-0.32px] lg:text-[22px]">
          At Smashed, we expertly whip up every single meal
        </p>
        <a
          href="#menu"
          style={{ animationDelay: '500ms' }}
          className="animate-fade-up mt-4 flex h-12 w-[160px] items-center justify-center gap-[10px] rounded-lg bg-brand-orange font-rowdies text-[14px] text-ink transition hover:scale-105 hover:shadow-lg active:scale-95"
        >
          Explore Menu
          <img src="/images/arrow.svg" alt="" className="h-6 w-6" />
        </a>
      </div>

      {/* burgers, the middle one is bigger */}
      <div className="relative mx-auto mt-8 flex max-w-[1280px] items-end justify-center px-2 lg:mt-12">
        <img src="/images/hero/burgers.png" alt="Burger" style={{ animationDelay: '600ms' }} className="animate-fade-up w-[36%] object-cover" />
        <img src="/images/hero/burgers.png" alt="Burger" style={{ animationDelay: '800ms' }} className="animate-fade-up relative z-10 -mx-[9%] w-[46%] object-cover" />
        <img src="/images/hero/burgers.png" alt="Burger" style={{ animationDelay: '700ms' }} className="animate-fade-up w-[36%] object-cover" />
      </div>

      {/* torn paper edge */}
      <img
        src="/images/hero/torn-edge.webp"
        alt=""
        className="absolute -bottom-px left-0 z-20 h-10 w-full sm:h-16 lg:h-[90px]"
      />
    </section>
  )
}
