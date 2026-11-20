import Reveal from './Reveal'

// promo banners, stacked on mobile
// foodStyle positions each photo (values from the design)
const banners = [
  {
    bg: 'bg-maroon',
    price: 'only $35',
    title: 'SMASH BURGER',
    titleSize: 'text-[40px] lg:text-[55px]',
    bigWord: 'BURGER',
    bigWordOpacity: 'opacity-10',
    image: '/images/banners/burger.png',
    foodStyle: { height: '100.14%', left: '9.13%', top: '-0.09%', width: '81.82%' },
    badge: { src: '/images/banners/badge-red.svg', text: 'hot', textColor: 'text-[#0e1317]', textPosition: 'inset-[15.65%_19.9%_73.02%_70.53%]' },
    button: '30+ burger menu items',
    buttonColor: 'bg-brand-orange',
  },
  {
    bg: 'bg-brand-orange',
    price: 'only $25',
    title: 'SOFT DRINK',
    titleSize: 'text-[44px] lg:text-[60px]',
    bigWord: 'DRINKS',
    bigWordOpacity: 'opacity-30',
    image: '/images/banners/drink.png',
    foodStyle: { height: '120.92%', left: '0.64%', top: '-12.15%', width: '98.81%' },
    badge: { src: '/images/banners/badge-dark.svg', text: '-20%', textColor: 'text-white', textPosition: 'inset-[15.65%_17.85%_73.02%_68.71%]' },
    button: '12+ drinks menu items',
    buttonColor: 'bg-maroon',
  },
  {
    bg: 'bg-maroon',
    price: 'only $35',
    title: 'CHICKEN WINGS',
    titleSize: 'text-[40px] lg:text-[55px]',
    bigWord: 'WINGS',
    bigWordOpacity: 'opacity-10',
    image: '/images/banners/wings.png',
    foodStyle: { height: '113.18%', left: '3.8%', top: '-2.47%', width: '92.49%' },
    badge: { src: '/images/banners/badge-red.svg', text: 'hot', textColor: 'text-[#0e1317]', textPosition: 'inset-[15.65%_19.9%_73.02%_70.53%]' },
    button: '20+ wings menu items',
    buttonColor: 'bg-brand-orange',
  },
]

function Banner({ banner }) {
  return (
    <div className={`relative flex h-full flex-col items-center overflow-hidden px-4 pb-8 pt-10 text-center lg:pt-12 ${banner.bg}`}>
      {/* speckled texture + big faded word at the bottom */}
      <img src="/images/banners/texture.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
      <p
        className={`absolute bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-rowdies text-[64px] uppercase leading-none text-white lg:text-[100px] ${banner.bigWordOpacity}`}
      >
        {banner.bigWord}
      </p>

      <p className="relative font-rowdies text-[22px] text-white lg:text-[28px]">{banner.price}</p>
      <h3 className={`relative mt-4 max-w-[367px] font-rowdies uppercase leading-[1.05] text-white ${banner.titleSize}`}>
        {banner.title}
      </h3>

      {/* food photo and round badge */}
      <div className="relative mt-6 aspect-[439/353] w-full max-w-[439px] overflow-hidden">
        <img src={banner.image} alt={banner.title} className="absolute max-w-none" style={banner.foodStyle} />
        <img src={banner.badge.src} alt="" className="absolute inset-[7.62%_13.61%_64.98%_64.36%] h-[27.4%] w-[22%]" />
        <p
          className={`absolute flex items-center justify-center text-center font-bebas text-[28px] leading-none lg:text-[35px] ${banner.badge.textColor} ${banner.badge.textPosition}`}
        >
          {banner.badge.text}
        </p>
      </div>

      <button
        className={`relative mt-8 h-12 w-full max-w-[288px] rounded-lg font-rowdies text-[14px] uppercase tracking-[1px] text-white transition hover:scale-105 hover:shadow-xl active:scale-95 ${banner.buttonColor}`}
      >
        {banner.button}
      </button>
    </div>
  )
}

export default function DealBanners() {
  return (
    <section id="deals" className="scroll-mt-[64px] lg:scroll-mt-[84px] grid grid-cols-1 md:grid-cols-3">
      {banners.map((banner, index) => (
        <Reveal key={banner.title} delay={index * 150} className="h-full">
          <Banner banner={banner} />
        </Reveal>
      ))}
    </section>
  )
}
