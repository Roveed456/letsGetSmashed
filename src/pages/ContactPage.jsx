import { useState } from 'react'
import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

// contact details
const PHONES = ['+1 123 456 7890', '+1 098 765 4321']
const EMAIL = 'hello@gmail.com'
const ADDRESS = 'Restaurant St, Delicious City, London 9578, UK'

// google maps embed, change q= for another place
const MAP_URL = 'https://maps.google.com/maps?q=New%20York&z=8&output=embed'

const EMPTY_FORM = { name: '', email: '', phone: '', message: '' }

// icons for the info rows
const iconProps = {
  className: 'h-4 w-4 shrink-0 text-[#4a4a4a]',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg {...iconProps}>
      <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l1.9-5.4A8.4 8.4 0 1 1 21 11.5Z" />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}

// one block of the info list
function InfoRow({ title, lines, icons, hasLine = true }) {
  return (
    <div className={hasLine ? 'border-b border-[#dcdcdc] pb-5' : ''}>
      <h2 className="font-rowdies text-[16px] uppercase text-maroon">{title}</h2>
      <div className="mt-2 flex items-start justify-between gap-4">
        <div className="space-y-1 text-[15px] leading-[1.4] text-[#222]">
          {lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="flex flex-col gap-2 pt-[3px]">{icons}</div>
      </div>
    </div>
  )
}

const inputClass =
  'w-full rounded-xl border border-[#d9d9d9] bg-white px-4 text-[15px] text-[#222] shadow-[0_1px_4px_rgba(0,0,0,0.06)] placeholder:text-[#333] focus:border-maroon focus:outline-none'

export default function ContactPage() {
  const [form, setForm] = useState(EMPTY_FORM)
  const [sent, setSent] = useState(false)

  // update a field
  function handleChange(event) {
    const { name, value } = event.target
    setForm((current) => ({ ...current, [name]: value }))
    setSent(false)
  }

  // no backend yet, only shows a thank you message
  function handleSubmit(event) {
    event.preventDefault()
    setSent(true)
    setForm(EMPTY_FORM)
  }

  return (
    <>
      {/* Top banner */}
      <section className="relative overflow-hidden bg-maroon pb-16 pt-10 text-center text-white lg:pb-[110px] lg:pt-14">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero/hero-background.svg)' }}
        />
        <div className="relative px-4">
          <h1 className="font-rowdies text-[36px] uppercase leading-[1.1] sm:text-[52px] lg:text-[64px]">
            Contact <span className="text-brand-orange">Us</span>
          </h1>
          <p className="mt-4 flex items-center justify-center gap-3 font-rowdies text-[14px] uppercase lg:text-[18px]">
            <Link to="/" className="transition hover:text-brand-orange">Home page</Link>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="m9 6 6 6-6 6" />
            </svg>
            <span>Contact us</span>
          </p>
        </div>

        {/* torn edge */}
        <div
          className="absolute -bottom-px left-0 w-full"
          style={{
            aspectRatio: '2000 / 119',
            backgroundColor: '#ffffff',
            maskImage: 'url(/images/hero/torn-edge.webp)',
            WebkitMaskImage: 'url(/images/hero/torn-edge.webp)',
            maskSize: '100% 100%',
            WebkitMaskSize: '100% 100%',
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
          }}
        />
      </section>

      {/* Photo + details + form, and the map */}
      <section className="relative overflow-hidden bg-white px-4 pb-16 pt-10 lg:pb-[100px] lg:pt-[50px]">
        {/* vegetable drawings (desktop only) */}
        <img
          src="/images/contact/deco-right.png"
          alt=""
          className="pointer-events-none absolute right-0 top-0 hidden w-[125px] xl:block"
        />
        <img
          src="/images/contact/deco-left.png"
          alt=""
          className="pointer-events-none absolute left-0 top-[330px] hidden w-[118px] xl:block"
        />

        <div className="relative mx-auto max-w-[1170px]">
          <div className="grid items-start gap-10 lg:grid-cols-[1.13fr_1fr] lg:gap-[90px]">
            <Reveal direction="left">
              <img
                src="/images/contact/truck.jpg"
                alt="The Smashed food truck"
                className="aspect-[508/700] w-full rounded-[30px] object-cover"
              />
            </Reveal>

            <Reveal direction="right" delay={150} className="space-y-6 lg:pt-3">
              <InfoRow title="Call us" lines={PHONES} icons={[<PhoneIcon key="phone" />, <ChatIcon key="chat" />]} />
              <InfoRow title="Email us" lines={[EMAIL]} icons={[<MailIcon key="mail" />]} />
              <InfoRow title="Find us" lines={[ADDRESS]} icons={[<PinIcon key="pin" />]} hasLine={false} />

              <div className="pt-4">
                <h2 className="font-rowdies text-[16px] uppercase text-maroon">Say hi, don&rsquo;t be shy!</h2>

                <form onSubmit={handleSubmit} className="mt-5 space-y-4">
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    aria-label="Your name"
                    required
                    className={`${inputClass} h-[54px]`}
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email"
                    aria-label="Email"
                    required
                    className={`${inputClass} h-[54px]`}
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    aria-label="Phone number"
                    className={`${inputClass} h-[54px]`}
                  />
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Message"
                    aria-label="Message"
                    required
                    rows={3}
                    className={`${inputClass} min-h-[98px] resize-none py-3`}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p role="status" className={`text-[15px] text-maroon ${sent ? '' : 'invisible'}`}>
                      Thank you! We will get back to you soon.
                    </p>
                    <button
                      type="submit"
                      className="h-12 w-[130px] rounded-lg bg-maroon font-rowdies text-[14px] uppercase tracking-[1px] text-white transition hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </Reveal>
          </div>

          {/* map */}
          <Reveal className="mt-14 lg:mt-[80px]">
            <iframe
              title="Map showing where to find us"
              src={MAP_URL}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[300px] w-full rounded-[30px] border-0 sm:h-[380px] lg:h-[450px]"
            />
          </Reveal>
        </div>
      </section>
    </>
  )
}
