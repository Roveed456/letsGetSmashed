import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { allItems, findItem } from '../data/menuData'
import MenuCard from '../components/MenuCard'
import ProductTabs from '../components/ProductTabs'
import Reveal from '../components/Reveal'
import { useCart } from '../context/useCart'
import { toMoney } from '../lib/money'

const SIZE_NAMES = { S: 'Small', L: 'Large' }

// "$3.99 (S) / $4.49 (L)" -> list of sizes, [] when there is only one price
function getSizes(priceText) {
  return [...priceText.matchAll(/\$([\d.]+)\s*\((\w)\)/g)].map((match) => ({
    label: match[2],
    price: Number(match[1]),
  }))
}

const toNumber = (priceText) => Number(priceText.replace(/[^0-9.]/g, ''))

// up to 3 other items, same group first
function getRelatedItems(item) {
  const others = allItems.filter((other) => other.id !== item.id)
  const sameGroup = others.filter((other) => other.sectionId === item.sectionId)
  const rest = others.filter((other) => other.sectionId !== item.sectionId)
  return [...sameGroup, ...rest].slice(0, 3)
}

function ItemDetails({ item }) {
  const sizes = getSizes(item.price)
  const [sizeIndex, setSizeIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [justAdded, setJustAdded] = useState(false)
  const { addItem } = useCart()

  // hide the message after 4 seconds
  useEffect(() => {
    if (!justAdded) return
    const timer = setTimeout(() => setJustAdded(false), 4000)
    return () => clearTimeout(timer)
  }, [justAdded])

  const unitPrice = sizes.length > 0 ? sizes[sizeIndex].price : toNumber(item.price)
  const total = unitPrice * quantity
  const oldPrice = item.oldPrice ? toNumber(item.oldPrice) : 0
  const fullTitle = item.highlight ? `${item.title} ${item.highlight}` : item.title

  // add to cart
  function handleAddToCart() {
    const size = sizes.length > 0 ? sizes[sizeIndex] : null
    addItem({
      key: size ? `${item.id}-${size.label}` : item.id,
      id: item.id,
      title: item.title,
      highlight: item.highlight,
      image: item.image,
      sizeLabel: size ? SIZE_NAMES[size.label] || size.label : null,
      unitPrice,
      quantity,
    })
    setJustAdded(true)
  }

  return (
    <>
      {/* banner */}
      <section className="relative overflow-hidden bg-maroon pb-14 pt-10 text-center text-white lg:pb-[100px] lg:pt-14">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero/hero-background.svg)' }}
        />
        <div className="relative px-4">
          <p className="font-rowdies text-[13px] uppercase tracking-[2px] text-white/80 lg:text-[14px]">
            <Link to="/" className="hover:text-brand-orange">Home</Link>
            {' / '}
            <Link to="/#menu" className="hover:text-brand-orange">Menu</Link>
            {' / '}
            <span className="text-brand-orange">{item.title}</span>
          </p>
          <h1 className="mt-3 font-rowdies text-[30px] uppercase leading-[1.15] sm:text-[44px] lg:text-[60px]">
            {item.title} {item.highlight && <span className="text-brand-orange">{item.highlight}</span>}
          </h1>
        </div>
        <img
          src="/images/hero/torn-edge.webp"
          alt=""
          className="absolute -bottom-px left-0 h-8 w-full sm:h-12 lg:h-[70px]"
        />
      </section>

      {/* Photo + details */}
      <section className="bg-cream px-4 pb-12 pt-6 lg:pb-[90px] lg:pt-10">
        <div className="mx-auto grid max-w-[1240px] gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <Reveal direction="left">
            <div className="relative rounded-[30px] bg-white p-3 lg:p-4">
              <img
                src={`/images/menu/${item.image}`}
                alt={fullTitle}
                className="aspect-square w-full rounded-[22px] object-cover lg:aspect-[3/2]"
              />
            </div>
          </Reveal>

          <Reveal direction="right" delay={150} className="flex flex-col justify-center">
            <span className="w-fit rounded-full bg-brand-orange px-4 py-1 font-rowdies text-[12px] uppercase tracking-[1px] text-ink">
              {item.sectionTitle}
            </span>

            <h2 className="mt-4 font-rowdies text-[26px] uppercase leading-[1.15] text-black lg:text-[36px]">
              {item.title} {item.highlight && <span className="text-brand-orange">{item.highlight}</span>}
            </h2>

            <p className="mt-3 font-rowdies text-[28px] text-maroon lg:text-[34px]">
              {toMoney(unitPrice)}
              {oldPrice > 0 && <span className="ml-3 text-[18px] text-[#585858] line-through">{item.oldPrice}</span>}
            </p>

            <p className="mt-4 text-[18px] leading-[1.45] text-[#3b3b3b] lg:text-[20px]">
              {item.about} {item.desc && <span className="capitalize">({item.desc.toLowerCase()})</span>}
            </p>

            {/* sizes */}
            {sizes.length > 0 && (
              <div className="mt-6">
                <p className="font-rowdies text-[13px] uppercase tracking-[1px] text-black">Choose size</p>
                <div className="mt-2 flex gap-3">
                  {sizes.map((size, index) => (
                    <button
                      key={size.label}
                      onClick={() => setSizeIndex(index)}
                      className={`rounded-lg border-2 px-5 py-2 font-rowdies text-[14px] transition active:scale-95 ${
                        sizeIndex === index
                          ? 'border-maroon bg-maroon text-white'
                          : 'border-maroon/30 bg-white text-maroon hover:border-maroon'
                      }`}
                    >
                      {SIZE_NAMES[size.label] || size.label} · {toMoney(size.price)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* quantity + total */}
            <div className="mt-6 flex flex-wrap items-center gap-5">
              <div className="flex items-center rounded-lg bg-white">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-12 w-12 font-rowdies text-[22px] text-maroon transition hover:bg-maroon/10 active:scale-90"
                  aria-label="Less"
                >
                  −
                </button>
                <span className="w-10 text-center font-rowdies text-[18px]">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(20, quantity + 1))}
                  className="h-12 w-12 font-rowdies text-[22px] text-maroon transition hover:bg-maroon/10 active:scale-90"
                  aria-label="More"
                >
                  +
                </button>
              </div>
              <p className="font-rowdies text-[18px] text-black">
                Total: <span className="text-maroon">{toMoney(total)}</span>
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={handleAddToCart}
                className="h-12 w-full rounded-lg bg-maroon px-8 font-rowdies text-[14px] uppercase tracking-[1px] text-white transition hover:scale-[1.03] hover:shadow-xl active:scale-95"
              >
                Add to cart
              </button>
            </div>
          </Reveal>
        </div>

        {/* tabs */}
        <div className="mx-auto mt-12 max-w-[1240px] lg:mt-[70px]">
          <Reveal>
            <ProductTabs />
          </Reveal>
        </div>
      </section>

      {/* related products */}
      <section className="relative overflow-hidden bg-white px-4 pb-24 pt-14 lg:pb-[150px] lg:pt-[90px]">
        {/* corner drawings */}
        <img
          src="/images/menu/menu-bg.png.svg"
          alt=""
          className="pointer-events-none absolute left-0 top-6 hidden w-[90px] md:block lg:top-10 lg:w-[110px]"
        />
        <img
          src="/images/menu/menu-pz.png.svg"
          alt=""
          className="pointer-events-none absolute right-0 top-4 hidden w-[179px] md:block lg:w-[200px]"
        />

        <div className="relative mx-auto max-w-[1200px]">
          <Reveal>
            <h2 className="text-center font-rowdies text-[28px] uppercase text-maroon sm:text-[40px] lg:text-[48px]">
              Related Products
            </h2>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-[17px] md:grid-cols-2 lg:mt-12 xl:grid-cols-3">
            {getRelatedItems(item).map((other, index) => (
              <Reveal key={other.id} delay={index * 120}>
                <MenuCard item={other} outlined />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* added message */}
      <div
        role="status"
        className={`fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-xl bg-maroon px-5 py-3 text-center font-rowdies text-[14px] text-white shadow-2xl transition duration-300 ${
          justAdded ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        Added {quantity} × {fullTitle} to your cart
        <Link to="/cart" className="ml-3 text-brand-orange underline underline-offset-4">
          View cart
        </Link>
      </div>
    </>
  )
}

export default function ItemDetailPage() {
  const { itemId } = useParams()
  const item = findItem(itemId)

  if (!item) {
    return (
      <section className="bg-cream px-4 py-24 text-center">
        <h1 className="font-rowdies text-[32px] uppercase text-maroon">Item not found</h1>
        <p className="mt-3 text-[20px] text-[#3b3b3b]">We could not find that item on our menu.</p>
        <Link
          to="/#menu"
          className="mt-6 inline-flex h-12 items-center rounded-lg bg-maroon px-8 font-rowdies text-[14px] uppercase text-white"
        >
          Back to menu
        </Link>
      </section>
    )
  }

  // key resets size and quantity for each item
  return <ItemDetails key={item.id} item={item} />
}
