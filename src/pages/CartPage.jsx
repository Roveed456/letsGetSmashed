import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'
import { useCart } from '../context/useCart'
import { toMoney } from '../lib/money'

// one line in the cart
function CartRow({ item }) {
  const { updateQuantity, removeItem } = useCart()

  return (
    <div className="relative flex flex-wrap items-center gap-4 rounded-[13px] bg-white p-3 sm:flex-nowrap sm:gap-5 sm:p-4">
      <Link to={`/menu/${item.id}`} className="shrink-0">
        <img
          src={`/images/menu/${item.image}`}
          alt={item.title}
          className="h-[88px] w-[88px] rounded-[10px] object-cover sm:h-[110px] sm:w-[110px]"
        />
      </Link>

      <div className="min-w-0 flex-1 pr-8 sm:pr-0">
        <h3 className="font-rowdies text-[15px] uppercase leading-[1.2] text-black sm:text-[17px]">
          <Link to={`/menu/${item.id}`}>
            {item.title} {item.highlight && <span className="text-brand-orange">{item.highlight}</span>}
          </Link>
        </h3>
        {item.sizeLabel && <p className="mt-1 text-[15px] text-[#585858]">{item.sizeLabel} size</p>}
        <p className="mt-1 font-rowdies text-[15px] text-maroon">{toMoney(item.unitPrice)} each</p>
      </div>

      {/* quantity + total */}
      <div className="flex w-full items-center justify-between border-t border-black/10 pt-3 sm:w-auto sm:justify-end sm:gap-5 sm:border-0 sm:pt-0">
        <div className="flex items-center rounded-lg bg-cream">
          <button
            onClick={() => updateQuantity(item.key, item.quantity - 1)}
            className="h-10 w-10 font-rowdies text-[20px] text-maroon transition hover:bg-maroon/10 active:scale-90"
            aria-label={`Less ${item.title}`}
          >
            −
          </button>
          <span className="w-8 text-center font-rowdies text-[16px]">{item.quantity}</span>
          <button
            onClick={() => updateQuantity(item.key, item.quantity + 1)}
            className="h-10 w-10 font-rowdies text-[20px] text-maroon transition hover:bg-maroon/10 active:scale-90"
            aria-label={`More ${item.title}`}
          >
            +
          </button>
        </div>

        <p className="font-rowdies text-[18px] text-maroon sm:w-[84px] sm:text-right">{toMoney(item.unitPrice * item.quantity)}</p>
      </div>

      {/* remove button, top right on phones */}
      <button
        onClick={() => removeItem(item.key)}
        className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full text-[18px] text-[#585858] transition hover:bg-maroon hover:text-white active:scale-90 sm:static sm:shrink-0"
        aria-label={`Remove ${item.title}`}
      >
        ✕
      </button>
    </div>
  )
}

export default function CartPage() {
  const { items, count, subtotal, clearCart } = useCart()

  return (
    <>
      {/* Top banner */}
      <section className="relative overflow-hidden bg-maroon pb-14 pt-10 text-center text-white lg:pb-[100px] lg:pt-14">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero/hero-background.svg)' }}
        />
        <div className="relative px-4">
          <p className="font-rowdies text-[13px] uppercase tracking-[2px] text-white/80 lg:text-[14px]">
            <Link to="/" className="hover:text-brand-orange">Home</Link>
            {' / '}
            <span className="text-brand-orange">Cart</span>
          </p>
          <h1 className="mt-3 font-rowdies text-[30px] uppercase leading-[1.15] sm:text-[44px] lg:text-[60px]">Your Cart</h1>
        </div>
        <img
          src="/images/hero/torn-edge.webp"
          alt=""
          className="absolute -bottom-px left-0 h-8 w-full sm:h-12 lg:h-[70px]"
        />
      </section>

      <section className="bg-cream px-4 pb-16 pt-6 lg:pb-[110px] lg:pt-10">
        <div className="mx-auto max-w-[1240px]">
          {items.length === 0 ? (
            /* empty cart */
            <Reveal className="mx-auto flex max-w-[520px] flex-col items-center rounded-[20px] bg-white px-6 py-12 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream">
                <svg className="h-10 w-10" viewBox="0 0 24 24" fill="none" stroke="#871415" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 9h18l-2 10H5L3 9Z" />
                  <path d="M8 9l3-5M16 9l-3-5" />
                  <path d="M10 13v3M14 13v3" />
                </svg>
              </div>
              <h2 className="mt-5 font-rowdies text-[24px] uppercase text-maroon sm:text-[30px]">Your cart is empty</h2>
              <p className="mt-2 text-[18px] text-[#585858]">Hungry? Add something tasty from our menu.</p>
              <Link
                to="/#menu"
                className="mt-6 flex h-12 items-center justify-center rounded-lg bg-maroon px-8 font-rowdies text-[14px] uppercase tracking-[1px] text-white transition hover:scale-105 active:scale-95"
              >
                Browse the menu
              </Link>
            </Reveal>
          ) : (
            <div className="grid items-start gap-8 lg:grid-cols-[1.7fr_1fr] lg:gap-10">
              {/* the foods in the cart */}
              <div>
                <div className="flex items-center justify-between">
                  <h2 className="font-rowdies text-[20px] uppercase text-black sm:text-[24px]">
                    {count} {count === 1 ? 'item' : 'items'}
                  </h2>
                  <button
                    onClick={clearCart}
                    className="font-rowdies text-[13px] uppercase tracking-[1px] text-maroon underline underline-offset-4 transition hover:text-black"
                  >
                    Clear cart
                  </button>
                </div>

                <div className="mt-4 flex flex-col gap-4">
                  {items.map((item) => (
                    <CartRow key={item.key} item={item} />
                  ))}
                </div>
              </div>

              {/* order summary */}
              <aside className="rounded-[20px] bg-white p-6 lg:sticky lg:top-[108px]">
                <h2 className="font-rowdies text-[22px] uppercase text-maroon">Order summary</h2>

                <dl className="mt-5 space-y-3 text-[18px]">
                  <div className="flex justify-between">
                    <dt className="text-[#585858]">Subtotal</dt>
                    <dd className="font-rowdies text-black">{toMoney(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#585858]">Delivery</dt>
                    <dd className="text-[#585858]">At checkout</dd>
                  </div>
                </dl>

                <div className="my-5 border-b-2 border-dashed border-black/15" />

                <div className="flex items-center justify-between">
                  <span className="font-rowdies text-[18px] uppercase text-black">Total</span>
                  <span className="font-rowdies text-[28px] text-maroon">{toMoney(subtotal)}</span>
                </div>

                <Link
                  to="/checkout"
                  className="mt-6 flex h-12 w-full items-center justify-center rounded-lg bg-maroon font-rowdies text-[14px] uppercase tracking-[1px] text-white transition hover:scale-[1.02] hover:shadow-xl active:scale-95"
                >
                  Checkout
                </Link>

                <Link
                  to="/#menu"
                  className="mt-3 flex h-12 w-full items-center justify-center rounded-lg border-2 border-maroon font-rowdies text-[13px] uppercase tracking-[1px] text-maroon transition hover:bg-maroon hover:text-white"
                >
                  Continue shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
