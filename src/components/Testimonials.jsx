import { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import Reveal from './Reveal'

const reviews = [
  {
    text: '“Ordered for a family night. The kids loved the nuggets and mini sliders, and I was impressed with the grilled options. Affordable, tasty, and perfect for everyone in the family.”',
    name: 'Sebastian Fischer',
    job: 'Marketing Executive',
    photo: '/images/testimonials/user1.png',
  },
  {
    text: '"I honestly didn\'t think online food could be this awesome, but Yumix totally blew me away! It looked and tasted so fancy, like I was eating at a restaurant right at home!"',
    name: 'Erik Lindström',
    job: 'Software Engineer',
    photo: '/images/testimonials/user2.png',
  },
  {
    text: '“I’ve ordered from Yumix many times, and they’ve never messed up my order. Everything is hot, fresh, and tasty. Customer support is great too. Highly recommend!”',
    name: 'Julian Müller',
    job: 'Marketing Analyst',
    photo: '/images/testimonials/user3.png',
  },
  {
    text: '“The wing combo is unreal. Crispy outside, juicy inside, and the crinkle fries came out perfectly hot. We order every Friday now.”',
    name: 'Marta Kowalski',
    job: 'Graphic Designer',
    photo: '/images/testimonials/client1.png',
  },
  {
    text: '“Fast delivery and the smash burger was exactly how I like it. Great value for the price, and the staff were really friendly on the phone.”',
    name: 'Daniel Okafor',
    job: 'Product Manager',
    photo: '/images/testimonials/client2.png',
  },
  {
    text: '“Booked a table for my birthday and everything was perfect. The special burger deal is a must-try, I would recommend it to everyone.”',
    name: 'Aisha Rahman',
    job: 'Teacher',
    photo: '/images/testimonials/client3.png',
  },
]

const happyCustomers = ['client1.png', 'client2.png', 'client3.png']

function ReviewCard({ review }) {
  return (
    <div className="flex h-full flex-col rounded-2xl border border-[#e7e7e8] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <img src="/images/testimonials/quote.svg" alt="" className="h-10 w-10" />

      <p className="mt-6 flex-1 text-[22px] leading-[1.2] tracking-[-0.5px] text-ink xl:text-[28px] xl:leading-[33.6px] xl:tracking-[-1px]">
        {review.text}
      </p>

      <div className="mt-8 flex items-center gap-4">
        <img src={review.photo} alt={review.name} className="h-[54px] w-[54px] rounded-full object-cover" />
        <div>
          <p className="font-rowdies text-[20px] leading-6 tracking-[-0.4px] text-maroon">{review.name}</p>
          <p className="mt-[3px] text-[18px] leading-6 tracking-[-0.32px] text-[#88898b]">{review.job}</p>
        </div>
      </div>
    </div>
  )
}

export default function Testimonials() {
  // slider ref for the arrow buttons
  const swiperRef = useRef(null)

  return (
    <section id="testimonials" className="scroll-mt-[64px] lg:scroll-mt-[84px] relative overflow-hidden bg-brand-orange px-4 py-12 lg:px-8 lg:py-[90px] xl:px-[119px]">
      <img src="/images/testimonials/bg.png" alt="" className="absolute inset-0 h-full w-full object-cover opacity-50" />

      <div className="relative mx-auto max-w-[1202px]">
        {/* heading on the left, happy customers on the right */}
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <Reveal direction="left">
            <h2 className="font-rowdies text-[32px] leading-[1.2] tracking-[-0.96px] text-maroon sm:text-[40px] xl:text-[48px] xl:leading-[57.6px]">
              Here’s What Our Foodies Are Raving About!
            </h2>
            <p className="mt-5 max-w-[560px] text-[18px] leading-[26px] tracking-[-0.32px] text-[#282828] xl:text-[22px]">
              We serve happiness, flavor, and unforgettable experiences. Here’s what our customers say about their Yumix
              moments.
            </p>
          </Reveal>

          <Reveal direction="right" delay={150} className="shrink-0">
            <div className="flex">
              {happyCustomers.map((file, index) => (
                <img
                  key={file}
                  src={`/images/testimonials/${file}`}
                  alt=""
                  className={`h-[50px] w-[50px] rounded-full object-cover ${index > 0 ? '-ml-[7px]' : ''}`}
                />
              ))}
            </div>
            <p className="mt-4 whitespace-nowrap font-rowdies text-[20px] leading-[29px] tracking-[-0.48px] text-ink">
              12K+ Happy Customer
            </p>
          </Reveal>
        </div>

        {/* slider: 1 card on phones, 2 on tablets, 3 on desktop */}
        <Reveal className="mt-10 xl:mt-[60px]">
          <Swiper
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            slidesPerView={1}
            spaceBetween={24}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            loop
            grabCursor
            className="!pt-2"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.name} className="!h-auto">
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Reveal>

        {/* previous / next buttons */}
        <div className="mt-10 flex justify-center gap-[17px]">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="flex h-[51px] w-[51px] items-center justify-center rounded-full bg-maroon transition hover:scale-110 active:scale-95"
            aria-label="Previous"
          >
            <img src="/images/testimonials/arrow-l1.svg" alt="" className="h-[14px] w-[15px]" />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="flex h-[51px] w-[51px] items-center justify-center rounded-full bg-maroon transition hover:scale-110 active:scale-95"
            aria-label="Next"
          >
            <img src="/images/testimonials/arrow-r1.svg" alt="" className="h-[14px] w-[15px]" />
          </button>
        </div>
      </div>
    </section>
  )
}
