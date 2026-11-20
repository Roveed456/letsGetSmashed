import { Link } from 'react-router-dom'

// food card, links to the detail page
// outlined adds a border (for white backgrounds)
export default function MenuCard({ item, outlined = false }) {
  const detailPage = `/menu/${item.id}`

  return (
    <div
      className={`flex min-h-[184px] w-full items-center gap-3 rounded-[13px] bg-white px-[13px] py-[14px] transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
        outlined ? 'border border-[#ececec] shadow-[0_2px_14px_rgba(0,0,0,0.05)]' : ''
      }`}
    >
      <Link to={detailPage} className="shrink-0">
        <img
          src={`/images/menu/${item.image}`}
          alt={item.title}
          className="h-[156px] w-[120px] rounded-[10px] object-cover sm:w-[152px]"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-[14px]">
        <div className="flex flex-col gap-2">
          <h3 className="font-rowdies text-[14px] uppercase leading-[18px] text-black sm:text-[16px] sm:leading-[16.5px] xl:whitespace-nowrap">
            <Link to={detailPage}>
              {item.title} {item.highlight && <span className="text-brand-orange">{item.highlight}</span>}
            </Link>
          </h3>
          {item.desc && <p className="text-[13.3px] leading-[17.8px] text-[#585858]">{item.desc}</p>}
        </div>

        <p className="font-rowdies text-[17.8px] leading-[26px] text-maroon">
          {item.price}
          {item.oldPrice && <span className="ml-[10px] text-[#585858] line-through">{item.oldPrice}</span>}
        </p>

        <Link
          to={detailPage}
          className="flex h-[35px] w-[121px] items-center justify-center rounded-[7px] bg-maroon font-rowdies text-[10.4px] uppercase tracking-[0.74px] text-white transition hover:bg-brand-orange hover:text-ink active:scale-95"
        >
          order now
        </Link>
      </div>
    </div>
  )
}
