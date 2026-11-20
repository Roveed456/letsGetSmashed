import { useEffect, useRef, useState } from 'react'
import { menuSections, menuTabs } from '../data/menuData'
import MenuCard from './MenuCard'
import Reveal from './Reveal'

export default function OurMenu() {
  // active tab
  const [activeTab, setActiveTab] = useState(menuTabs[0].target)
  // sticky block (title + tabs)
  const stickyRef = useRef(null)

  // active tab follows the scroll
  useEffect(() => {
    function updateActiveTab() {
      const lineY = stickyRef.current.getBoundingClientRect().bottom + 24
      let current = menuTabs[0].target

      for (const tab of menuTabs) {
        const group = document.getElementById(tab.target)
        if (group && group.getBoundingClientRect().top <= lineY) {
          current = tab.target
        }
      }
      setActiveTab(current)
    }

    updateActiveTab()
    window.addEventListener('scroll', updateActiveTab, { passive: true })
    window.addEventListener('resize', updateActiveTab)
    return () => {
      window.removeEventListener('scroll', updateActiveTab)
      window.removeEventListener('resize', updateActiveTab)
    }
  }, [])

  // tab click: smooth scroll to the group
  function handleTabClick(event, target) {
    event.preventDefault()
    const group = document.getElementById(target)
    const stickyBottom = stickyRef.current.getBoundingClientRect().bottom
    const top = group.getBoundingClientRect().top + window.scrollY - stickyBottom - 16
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section id="menu" className="scroll-mt-[64px] lg:scroll-mt-[84px] bg-cream px-4 pb-12 pt-10">
      {/* sticky title + tabs */}
      <div
        ref={stickyRef}
        className="sticky top-[64px] z-30 -mx-4 bg-cream px-4 pb-4 pt-2 lg:top-[84px] lg:pb-6"
      >
        {/* title with the little wavy line */}
        <div className="flex flex-col items-center">
          <h2 className="font-rowdies text-[26px] uppercase leading-[36px] text-maroon sm:text-[36px] sm:leading-[50px] lg:text-[50px]">Our Menu</h2>
          <svg width="60" height="12" viewBox="0 0 60 12" fill="none" className="mt-[8px]">
            <path d="M2 6 Q9 -1 16 6 T30 6 T44 6 T58 6" stroke="#fa9513" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </div>

        {/* tabs */}
        <div className="mt-4 flex gap-5 overflow-x-auto [scrollbar-width:none] sm:justify-center lg:gap-[35px] [&::-webkit-scrollbar]:hidden">
          {menuTabs.map((tab) => (
            <a
              key={tab.target}
              href={`#${tab.target}`}
              onClick={(event) => handleTabClick(event, tab.target)}
              className={`shrink-0 whitespace-nowrap font-rowdies text-[13px] uppercase leading-8 transition-colors sm:text-[16px] sm:leading-9 lg:text-[20px] ${
                activeTab === tab.target ? 'text-maroon underline underline-offset-4' : 'text-white'
              }`}
            >
              {tab.label}
            </a>
          ))}
        </div>
      </div>

      {/* food groups */}
      <div className="mx-auto mt-6 flex max-w-[1240px] flex-col gap-10">
        {menuSections.map((section) => (
          <div key={section.id} id={section.id}>
            {section.showTitle && (
              <h3 className="mb-4 font-rowdies text-[18px] uppercase leading-7 text-black sm:mb-5 sm:text-[24px] sm:leading-9 lg:text-[30px]">{section.title}</h3>
            )}
            <div className="grid grid-cols-1 gap-[17px] md:grid-cols-2 xl:grid-cols-3">
              {section.items.map((item, index) => (
                <Reveal key={`${item.title}-${index}`} delay={(index % 3) * 120}>
                  <MenuCard item={item} />
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
