// special deal: text + countdown, burger on the right
import Reveal from './Reveal'

const countdown = [
  { value: '901', label: 'days' },
  { value: '13', label: 'hrs' },
  { value: '59', label: 'mins' },
  { value: '49', label: 'seco' },
]

export default function SpecialDeal() {
  return (
    <section id="special-deal" className="scroll-mt-[64px] lg:scroll-mt-[84px] relative overflow-hidden px-4 pb-12 pt-10 lg:pb-0 lg:pt-[40px]">
      <img src="/images/special/bg.png" alt="" className="absolute inset-0 h-full w-full object-cover" />

      <div className="relative mx-auto max-w-[1440px]">
        <div className="relative z-10 flex flex-col items-center gap-10 lg:flex-row lg:justify-between lg:gap-0 lg:px-16">
          {/* text side */}
          <Reveal direction="left" className="w-full lg:w-[48%]">
            <p className="font-rowdies text-[26px] uppercase leading-[48px] text-brand-orange lg:text-[40px]">
              Delicious burger
            </p>
            <h2 className="mt-2 font-rowdies text-[56px] uppercase leading-[1] text-white sm:text-[80px] xl:text-[100px]">
              Special
              <br />
              Burger
            </h2>
            <p className="mt-4 max-w-[500px] text-[18px] leading-[29px] text-white lg:text-[20px]">
              Nestled in the heart of the city, our restaurant is a culinary haven where flavors come alive memories are
              made.
            </p>

            {/* countdown boxes */}
            <div className="mt-8 flex flex-wrap gap-3 sm:gap-[21px]">
              {countdown.map((box) => (
                <div
                  key={box.label}
                  className="flex h-[88px] w-[72px] flex-col items-center justify-center rounded-lg bg-maroon font-rowdies uppercase text-white sm:h-[104px] sm:w-[97px]"
                >
                  <span className="text-[28px] leading-[40px] sm:text-[40px] sm:leading-[53px]">{box.value}</span>
                  <span className="text-[12px] leading-4 sm:text-[14px]">{box.label}</span>
                </div>
              ))}
            </div>

            <button className="mt-10 h-12 w-[169px] rounded-lg bg-brand-orange font-rowdies text-[14px] uppercase tracking-[1px] text-black transition hover:scale-105 hover:shadow-xl active:scale-95">
              order now
            </button>
          </Reveal>

          {/* burger picture + "only $59" badge */}
          <Reveal direction="right" delay={200} className="relative w-full max-w-[719px] lg:w-[50%] lg:py-8">
            <img src="/images/special/burger.png" alt="Special burger" className="animate-float w-full object-cover" />
            <div className="absolute bottom-0 left-0 h-[27%] w-[27%] lg:bottom-8">
              <img src="/images/special/badge.svg" alt="" className="absolute h-full w-full" />
              <p className="absolute inset-[18.89%_37.54%_61.11%_37.54%] flex items-center justify-center font-bebas text-[16px] text-[#0e1317] sm:text-[24px] lg:text-[32px]">
                only
              </p>
              <p className="absolute inset-[37.22%_20%_18.89%_20%] flex items-center justify-center font-bebas text-[34px] leading-none text-[#0e1317] sm:text-[52px] lg:text-[70px]">
                $59
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
