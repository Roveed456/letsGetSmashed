import { useState } from 'react'

// dummy content, same for every item

const DESCRIPTION_TEXT =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate vestibulum Phasellus rhoncus, dolor eget viverra pretium, dolor Numquam odit accusantium odit aut commodi et. Nostrum est atque ut dolorum. Et sequi aut atque doloribus qui. Iure amet in voluptate reiciendis. Perspiciatis consequatur aperiam repellendus velit quia est minima. Tellus aliquet nunc vitae ultricies erat elit eu lacus. Vestibulum non justo consectetur, cursus ante, tincidunt sapien. Nulla quis diam sit amet turpis interdum accumsan quis necenim. Vivamus faucibus ex sed nibh egestas elementum. Mauris et bibendum dui. Aenean consequat pulvinar luctus'

const MORE_DETAILS = [
  'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  'Lorem Ipsum generators on the tend to repeat.',
  "Lorem Ipsum has been the 's standard dummy text. Lorem Ipsumum is simply dummy text.",
  'If you are going to use a passage.',
  'type here your detail one by one li more add',
  'Lorem Ipsum generators on the tend to repeat.',
  "has been the industry's standard dummy text ever since. Lorem Ips",
  'Lorem Ipsum generators on the tend to repeat.',
]

const REVIEWS = [
  { name: 'Sebastian Fischer', date: 'January 12, 2025', rating: 5, photo: '/images/testimonials/user1.png' },
  { name: 'Erik Lindström', date: 'January 20, 2025', rating: 4, photo: '/images/testimonials/user2.png' },
  { name: 'Marta Kowalski', date: 'February 02, 2025', rating: 5, photo: '/images/testimonials/client1.png' },
  { name: 'Daniel Okafor', date: 'February 14, 2025', rating: 4, photo: '/images/testimonials/client2.png' },
].map((review) => ({
  ...review,
  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur vulputate vestibulum Phasellus rhoncus, dolor eget viverra pretium.',
}))

const TABS = [
  { id: 'description', label: 'Description' },
  { id: 'reviews', label: `Reviews (${REVIEWS.length})` },
]

function CheckIcon() {
  return (
    <svg className="mt-[5px] h-3.5 w-3.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="#871415" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12.5l5 5L20 6.5" />
    </svg>
  )
}

function Stars({ rating }) {
  return (
    <span className="text-[16px] tracking-[2px] text-brand-orange" aria-label={`${rating} out of 5 stars`}>
      {'★'.repeat(rating)}
      <span className="text-black/20">{'★'.repeat(5 - rating)}</span>
    </span>
  )
}

function DescriptionTab() {
  return (
    <div>
      <h3 className="font-rowdies text-[18px] uppercase text-black lg:text-[22px]">Experience is over the world visit</h3>
      <p className="mt-4 text-[15px] leading-[1.7] text-[#3b3b3b] lg:text-[16px]">{DESCRIPTION_TEXT}</p>

      <h3 className="mt-8 font-rowdies text-[18px] uppercase text-black lg:mt-10 lg:text-[22px]">More details</h3>
      <ul className="mt-4 grid gap-x-12 gap-y-4 sm:grid-cols-2">
        {MORE_DETAILS.map((detail, index) => (
          <li key={index} className="flex gap-3 text-[15px] leading-[1.5] text-[#3b3b3b] lg:text-[16px]">
            <CheckIcon />
            {detail}
          </li>
        ))}
      </ul>
    </div>
  )
}

function ReviewsTab() {
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {REVIEWS.map((review) => (
        <li key={review.name} className="rounded-[13px] bg-white p-5">
          <div className="flex items-center gap-4">
            <img src={review.photo} alt={review.name} className="h-12 w-12 rounded-full object-cover" />
            <div>
              <p className="font-rowdies text-[16px] text-maroon">{review.name}</p>
              <p className="text-[14px] text-[#88898b]">{review.date}</p>
            </div>
            <div className="ml-auto">
              <Stars rating={review.rating} />
            </div>
          </div>
          <p className="mt-3 text-[15px] leading-[1.6] text-[#3b3b3b]">{review.text}</p>
        </li>
      ))}
    </ul>
  )
}

export default function ProductTabs() {
  const [activeTab, setActiveTab] = useState('description')

  return (
    <div>
      {/* tabs */}
      <div className="flex flex-col items-center">
        <div role="tablist" className="flex flex-wrap justify-center gap-x-6 gap-y-1 lg:gap-x-[35px]">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`font-rowdies text-[13px] uppercase leading-8 transition-colors sm:text-[16px] sm:leading-9 lg:text-[20px] ${
                activeTab === tab.id ? 'text-maroon underline underline-offset-4' : 'text-white hover:text-maroon'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* the content of the chosen tab */}
      <div role="tabpanel" className="mt-8 lg:mt-10">
        {activeTab === 'description' && <DescriptionTab />}
        {activeTab === 'reviews' && <ReviewsTab />}
      </div>
    </div>
  )
}
