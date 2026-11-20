import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import Reveal from '../components/Reveal'

// placeholder text, replace with real content

const STORY_POINTS = ['Fresh ingredients every morning', 'Beef pressed thin on a hot grill', 'Friendly service, always']

const STATS = [
  { value: '10+', label: 'Years of flavor' },
  { value: '50K+', label: 'Burgers smashed' },
  { value: '30+', label: 'Items on the menu' },
  { value: '4.9', label: 'Customer rating' },
]

// icons for the cards
const iconProps = {
  className: 'h-7 w-7',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const REASONS = [
  {
    title: 'Fresh ingredients',
    text: 'We pick our vegetables, buns and beef fresh every day, so every bite tastes the way it should.',
    icon: (
      <svg {...iconProps}>
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </svg>
    ),
  },
  {
    title: 'Smashed to order',
    text: 'Every patty is pressed on a hot grill when you order, for crispy edges and a juicy middle.',
    icon: (
      <svg {...iconProps}>
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5Z" />
      </svg>
    ),
  },
  {
    title: 'Fast delivery',
    text: 'Hot food at your door, quickly. We pack every order carefully so it arrives just right.',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: 'Made with love',
    text: 'We are a small team that loves food, and we treat every customer like part of the family.',
    icon: (
      <svg {...iconProps}>
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
]

function CheckIcon() {
  return (
    <svg className="mt-[5px] h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#871415" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  )
}

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About" accent="Us" crumb="About us" edgeColor="#ffffff" />

      {/* Our story: photo + text */}
      <section className="bg-white px-4 pb-16 pt-10 lg:pb-[100px] lg:pt-[60px]">
        <div className="mx-auto grid max-w-[1170px] items-center gap-10 lg:grid-cols-2 lg:gap-[80px]">
          <Reveal direction="left">
            <div className="relative">
              <img
                src="/images/contact/truck.jpg"
                alt="The Smashed food truck"
                className="aspect-[4/4.4] w-full rounded-[30px] object-cover"
              />
              {/* round sticker on the photo */}
              <div className="absolute -bottom-6 right-4 flex h-[120px] w-[120px] rotate-6 flex-col items-center justify-center rounded-full bg-brand-orange text-center shadow-lg lg:-right-6 lg:h-[140px] lg:w-[140px]">
                <span className="font-bebas text-[44px] leading-none text-[#0e1317] lg:text-[52px]">10+</span>
                <span className="font-rowdies text-[11px] uppercase leading-tight text-[#0e1317] lg:text-[12px]">
                  years of
                  <br />
                  smashing
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={150}>
            <span className="inline-block rounded-full bg-brand-orange px-4 py-1 font-rowdies text-[12px] uppercase tracking-[1px] text-ink">
              Who we are
            </span>
            <h2 className="mt-4 font-rowdies text-[28px] uppercase leading-[1.15] text-maroon sm:text-[36px] lg:text-[44px]">
              Our story
            </h2>
            <p className="mt-5 text-[18px] leading-[1.6] text-[#3b3b3b] lg:text-[20px]">
              Smashed started with one grill, one food truck and a simple idea: make the best burger in town and serve it
              with a smile. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
            </p>
            <p className="mt-4 text-[18px] leading-[1.6] text-[#3b3b3b] lg:text-[20px]">
              Today we still cook every order fresh. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>

            <ul className="mt-6 space-y-3">
              {STORY_POINTS.map((point) => (
                <li key={point} className="flex gap-3 text-[18px] text-[#222]">
                  <CheckIcon />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Numbers */}
      <section className="relative overflow-hidden bg-maroon px-4 py-12 lg:py-[70px]">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero/hero-background.svg)' }}
        />
        <div className="relative mx-auto grid max-w-[1170px] grid-cols-2 gap-y-10 text-center text-white lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 120}>
              <p className="font-rowdies text-[40px] leading-none text-brand-orange lg:text-[56px]">{stat.value}</p>
              <p className="mt-2 font-rowdies text-[13px] uppercase tracking-[1px] lg:text-[15px]">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why choose us + call to action */}
      <section className="bg-cream px-4 pb-16 pt-12 lg:pb-[100px] lg:pt-[80px]">
        <div className="mx-auto max-w-[1170px]">
          <Reveal>
            <h2 className="text-center font-rowdies text-[28px] uppercase text-maroon sm:text-[36px] lg:text-[44px]">
              Why choose us
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {REASONS.map((reason, index) => (
              <Reveal key={reason.title} delay={index * 120}>
                <div className="h-full rounded-[20px] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-maroon text-white">{reason.icon}</div>
                  <h3 className="mt-5 font-rowdies text-[18px] uppercase text-black">{reason.title}</h3>
                  <p className="mt-2 text-[17px] leading-[1.5] text-[#585858]">{reason.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* call to action box */}
          <Reveal className="mt-14 lg:mt-[90px]">
            <div className="relative overflow-hidden rounded-[30px] bg-maroon px-6 py-12 text-center text-white lg:py-[70px]">
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/images/hero/hero-background.svg)' }}
              />
              <div className="relative">
                <h2 className="font-rowdies text-[26px] uppercase leading-[1.15] sm:text-[36px] lg:text-[46px]">
                  Hungry? Let&rsquo;s get <span className="text-brand-orange">smashed!</span>
                </h2>
                <p className="mx-auto mt-3 max-w-[520px] text-[18px] text-white/90">
                  Pick your favorites from the menu and we will cook them fresh for you.
                </p>
                <div className="mt-7 flex flex-wrap justify-center gap-4">
                  <Link
                    to="/#menu"
                    className="flex h-12 w-[170px] items-center justify-center rounded-lg bg-brand-orange font-rowdies text-[14px] uppercase tracking-[1px] text-ink transition hover:scale-105 hover:shadow-xl active:scale-95"
                  >
                    Explore menu
                  </Link>
                  <Link
                    to="/contact"
                    className="flex h-12 w-[170px] items-center justify-center rounded-lg border-2 border-white font-rowdies text-[14px] uppercase tracking-[1px] text-white transition hover:bg-white hover:text-maroon active:scale-95"
                  >
                    Contact us
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
