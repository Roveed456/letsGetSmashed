import Reveal from './Reveal'

// two column price list
const leftColumn = [
  { image: 'item1.png', name: 'beef burger' },
  { image: 'item2.png', name: 'Chicken burger' },
  { image: 'item3.png', name: 'Beef burger' },
  { image: 'item4.png', name: 'Italian pizza' },
  { image: 'item5.png', name: 'black burger' },
]

const rightColumn = [
  { image: 'item6.png', name: 'Beef Burger' },
  { image: 'item7.png', name: 'Italian pizza' },
  { image: 'item8.png', name: 'beef Burger' },
  { image: 'item9.png', name: 'beef Burger' },
  { image: 'item10.png', name: 'beef Burger' },
]

function MenuRow({ item }) {
  return (
    <div className="flex items-center gap-4 py-[15px] sm:gap-[30px]">
      <img src={`/images/exclusive/${item.image}`} alt={item.name} className="h-16 w-16 shrink-0 rounded-full object-cover transition duration-300 hover:scale-110 sm:h-20 sm:w-20" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-[14px]">
          <h3 className="font-rowdies text-[16px] capitalize text-[#0e1317] sm:text-[18px]">{item.name}</h3>
          {/* dotted line */}
          <div className="flex-1 border-b-2 border-dashed border-[#696969]" />
          <span className="font-bebas text-[24px] text-maroon">$25</span>
        </div>
        <p className="mt-1 text-[16px] leading-[24px] text-[#585858] sm:text-[18px]">Diverse menu features array of delectable</p>
      </div>
    </div>
  )
}

export default function ExclusiveMenu() {
  return (
    <section id="exclusive" className="scroll-mt-[64px] lg:scroll-mt-[84px] bg-white px-4 py-12 lg:py-[130px]">
      <Reveal>
        <h2 className="mx-auto max-w-[600px] text-center font-rowdies text-[28px] uppercase leading-[1.1] text-maroon sm:text-[40px]">
          we provide exclusive food based
        </h2>
      </Reveal>

      <div className="mx-auto mt-10 grid max-w-[1200px] grid-cols-1 rounded-[30px] border border-[#f4f1ea] shadow-[0_10px_60px_rgba(220,220,220,0.25)] lg:mt-[100px] lg:grid-cols-2">
        <div className="border-b border-[#f4f1ea] px-5 py-5 sm:px-10 lg:border-b-0 lg:border-r lg:px-[68px] lg:py-[35px]">
          {leftColumn.map((item, index) => (
            <Reveal key={index} delay={index * 100}>
              <MenuRow item={item} />
            </Reveal>
          ))}
        </div>
        <div className="px-5 py-5 sm:px-10 lg:px-[68px] lg:py-[35px]">
          {rightColumn.map((item, index) => (
            <Reveal key={index} delay={index * 100 + 100}>
              <MenuRow item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
