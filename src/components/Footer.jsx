import Reveal from './Reveal'

const socials = ['Facebook', 'Instagram', 'Twitter', 'Youtube']
const footerLinks = ['Home', 'Menus', 'About us', 'Our chefs', 'Blog', 'Contact']

export default function Footer({ edgeColor = '#ffffff' }) {
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#1a1a1a] text-white">
      <img src="/images/footer/bg.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
      {/* torn edge, used as a mask so the color can change */}
      <div
        className="absolute left-0 right-0 top-[-4px] w-full"
        style={{
          aspectRatio: '1920 / 96',
          backgroundColor: edgeColor,
          maskImage: 'url(/images/footer/torn-top.png)',
          WebkitMaskImage: 'url(/images/footer/torn-top.png)',
          maskSize: '100% 100%',
          WebkitMaskSize: '100% 100%',
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
        }}
      />

      <Reveal className="relative mx-auto max-w-[1200px] px-4 pb-10 pt-16 sm:px-[30px] lg:pt-[100px]">
        {/* Row 1: address + opening hours */}
        <div className="flex flex-col gap-8 border-b border-[#777] pb-10 lg:flex-row lg:justify-between lg:pb-[50px] lg:pt-[80px]">
          <div>
            <p className="text-[28px] leading-[1.2] sm:text-[40px] xl:text-[46px] xl:leading-[52px]">
              Restaurant St, Delicious City,
              <br />
              London 9578, UK
              <br />
              Booking : +88-123-123456
            </p>
            <a href="#" className="mt-3 inline-flex items-center gap-2 font-rowdies text-[14px] uppercase leading-[37px]">
              get direction
              <img src="/images/footer/arrow.svg" alt="" className="w-[12px]" />
            </a>
          </div>

          <div className="flex flex-col lg:items-end">
            <p className="text-[18px] leading-6 lg:text-right">
              Monday - Friday : 8AM - 9PM
              <br />
              Saturday - Sunday : 8AM - 11PM
            </p>
            <button className="mt-6 h-12 w-[182px] rounded-lg bg-maroon font-rowdies text-[14px] uppercase tracking-[1px] transition hover:scale-105 hover:bg-brand-orange hover:text-ink active:scale-95 lg:mt-[56px]">
              book a table
            </button>
          </div>
        </div>

        {/* Row 2: newsletter + social links */}
        <div className="flex flex-col gap-8 border-b border-[#777] py-10 lg:flex-row lg:justify-between lg:py-[50px]">
          <div>
            <h2 className="font-rowdies text-[32px] uppercase leading-[1.2] sm:text-[40px] xl:text-[50px] xl:leading-[60px]">
              Get News &amp; Offers
            </h2>
            <p className="mt-[2px] text-[20px] leading-6">Subscribe us &amp; Get 25% Off.</p>

            <form className="relative mt-7 h-[60px] w-full max-w-[460px]">
              <img src="/images/footer/mail.svg" alt="" className="absolute left-5 top-[23px] h-[14px] w-[14px]" />
              <input
                type="email"
                placeholder="Your email"
                className="h-full w-full rounded-xl border border-[#777] bg-black pl-[35px] pr-[130px] text-[16px] text-white placeholder:text-[#585858] focus:outline-none sm:pr-[180px]"
              />
              <button
                type="button"
                className="absolute right-[3px] top-[3px] h-[54px] w-[120px] rounded-[10px] bg-maroon font-rowdies text-[12px] uppercase tracking-[1px] sm:w-[175px] sm:text-[14px]"
              >
                subscribe now
              </button>
            </form>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[18px] leading-[29px] lg:flex-col lg:items-end lg:gap-[11px]">
            {socials.map((name) => (
              <li key={name}>
                <a href="#">{name}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Row 3: footer menu */}
        <nav className="flex flex-wrap items-center justify-center gap-x-2 gap-y-2 border-b border-[#777] py-6 lg:gap-x-5 lg:py-[24px]">
          {footerLinks.map((link) => (
            <a key={link} href="#" className="px-[10px] font-rowdies text-[14px] uppercase leading-[21px] tracking-[1px]">
              {link}
            </a>
          ))}
        </nav>

        <p className="mt-8 text-center text-[16px] leading-6 text-[#a7a7a7] lg:mt-[40px] lg:text-[20px]">
          © 2025 Restaurant. All Rights Reserved | Crafted by{' '}
          <a href="#" className="text-white underline">
            Smashed Theme
          </a>
        </p>
      </Reveal>
    </footer>
  )
}
