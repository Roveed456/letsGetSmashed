import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { toMoney } from '../lib/money'

const DELIVERY_FEE = 3.99

const inputClass =
  'mt-2 h-12 w-full rounded-lg border-2 border-transparent bg-white px-4 text-[17px] text-black outline-none transition focus:border-maroon'

const PAYMENT_METHODS = [
  { id: 'cash', title: 'Cash', note: 'Pay when you get your food' },
  { id: 'card', title: 'Card', note: 'Credit or debit card' },
  { id: 'paypal', title: 'PayPal', note: 'Pay with your PayPal account' },
]

const emptyDetails = { name: '', phone: '', email: '', address: '', note: '' }
const emptyCard = { holder: '', number: '', expiry: '', cvv: '' }

// "4242424242424242" -> "4242 4242 4242 4242"
function formatCardNumber(value) {
  return value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
}

// "1228" -> "12/28"
function formatExpiry(value) {
  const digits = value.replace(/\D/g, '').slice(0, 4)
  return digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits
}

// returns an error message, or '' when the card looks fine
function checkCard(card) {
  if (card.number.replace(/\s/g, '').length < 13) return 'Please enter a valid card number.'

  const [month, year] = card.expiry.split('/').map(Number)
  if (!month || month > 12 || !year) return 'Please enter the expiry date as MM/YY.'
  const now = new Date()
  const expired = 2000 + year < now.getFullYear() || (2000 + year === now.getFullYear() && month < now.getMonth() + 1)
  if (expired) return 'This card has expired.'

  if (card.cvv.length < 3) return 'Please enter the 3 or 4 digit security code.'
  return ''
}

// label + input pair
function Field({ label, children }) {
  return (
    <label className="block">
      <span className="font-rowdies text-[13px] uppercase tracking-[1px] text-black">{label}</span>
      {children}
    </label>
  )
}

// a big selectable box (delivery/pickup, payment methods)
function ChoiceButton({ active, onClick, title, note }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-lg border-2 px-4 py-3 text-left transition ${
        active ? 'border-maroon bg-white' : 'border-transparent bg-white/60 hover:bg-white'
      }`}
    >
      <span className="block font-rowdies text-[15px] uppercase text-maroon">{title}</span>
      <span className="block text-[15px] text-[#585858]">{note}</span>
    </button>
  )
}

function Banner() {
  return (
    <section className="relative overflow-hidden bg-maroon pb-14 pt-10 text-center text-white lg:pb-[100px] lg:pt-14">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/images/hero/hero-background.svg)' }}
      />
      <div className="relative px-4">
        <p className="font-rowdies text-[13px] uppercase tracking-[2px] text-white/80 lg:text-[14px]">
          <Link to="/" className="hover:text-brand-orange">Home</Link>
          {' / '}
          <Link to="/cart" className="hover:text-brand-orange">Cart</Link>
          {' / '}
          <span className="text-brand-orange">Checkout</span>
        </p>
        <h1 className="mt-3 font-rowdies text-[30px] uppercase leading-[1.15] sm:text-[44px] lg:text-[60px]">Checkout</h1>
      </div>
      <img src="/images/hero/torn-edge.webp" alt="" className="absolute -bottom-px left-0 h-8 w-full sm:h-12 lg:h-[70px]" />
    </section>
  )
}

// small centered box used for the empty and success states
function MessageBox({ children }) {
  return (
    <>
      <Banner />
      <section className="bg-cream px-4 pb-16 pt-6 lg:pb-[110px] lg:pt-10">
        <div className="mx-auto flex max-w-[520px] flex-col items-center rounded-[20px] bg-white px-6 py-12 text-center">
          {children}
        </div>
      </section>
    </>
  )
}

const primaryLink =
  'mt-6 flex h-12 items-center justify-center rounded-lg bg-maroon px-8 font-rowdies text-[14px] uppercase tracking-[1px] text-white transition hover:scale-105 active:scale-95'

// step 1: delivery or pickup + contact details
function DetailsStep({ mode, setMode, details, onChange }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-rowdies text-[20px] uppercase text-black sm:text-[24px]">How do you want it?</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <ChoiceButton active={mode === 'delivery'} onClick={() => setMode('delivery')} title="Delivery" note={`${toMoney(DELIVERY_FEE)} delivery fee`} />
          <ChoiceButton active={mode === 'pickup'} onClick={() => setMode('pickup')} title="Pickup" note="Free, collect from the truck" />
        </div>
      </div>

      <div>
        <h2 className="font-rowdies text-[20px] uppercase text-black sm:text-[24px]">Your details</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Full name">
            <input name="name" value={details.name} onChange={onChange} required autoComplete="name" className={inputClass} />
          </Field>
          <Field label="Phone">
            <input name="phone" type="tel" value={details.phone} onChange={onChange} required autoComplete="tel" className={inputClass} />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Email">
              <input name="email" type="email" value={details.email} onChange={onChange} required autoComplete="email" className={inputClass} />
            </Field>
          </div>
          {mode === 'delivery' && (
            <div className="sm:col-span-2">
              <Field label="Delivery address">
                <input name="address" value={details.address} onChange={onChange} required autoComplete="street-address" className={inputClass} />
              </Field>
            </div>
          )}
          <div className="sm:col-span-2">
            <Field label="Note for the kitchen (optional)">
              <textarea
                name="note"
                rows={3}
                value={details.note}
                onChange={onChange}
                className="mt-2 w-full rounded-lg border-2 border-transparent bg-white px-4 py-3 text-[17px] text-black outline-none transition focus:border-maroon"
              />
            </Field>
          </div>
        </div>
      </div>
    </div>
  )
}

// step 2: payment method (+ card fields)
function PaymentStep({ mode, method, setMethod, card, onCardChange, cardError }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-rowdies text-[20px] uppercase text-black sm:text-[24px]">Payment method</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {PAYMENT_METHODS.map((item) => (
            <ChoiceButton key={item.id} active={method === item.id} onClick={() => setMethod(item.id)} title={item.title} note={item.note} />
          ))}
        </div>
      </div>

      {method === 'cash' && (
        <p className="rounded-lg bg-white px-4 py-3 text-[17px] text-[#585858]">
          Pay with cash {mode === 'delivery' ? 'when your order arrives' : 'when you pick it up'}. Please keep the exact amount if you can.
        </p>
      )}

      {method === 'paypal' && (
        <div className="rounded-lg bg-white p-5">
          <p className="text-[17px] text-[#585858]">
            You will be taken to PayPal to log in and confirm your payment. It is quick and safe.
          </p>
          {/* demo button: it places the order like the Pay button */}
          <button
            type="submit"
            className="mt-4 flex h-12 w-full items-center justify-center gap-1 rounded-full bg-[#ffc439] text-[20px] font-bold italic transition hover:brightness-95 active:scale-[0.98]"
            aria-label="Pay with PayPal"
          >
            <span className="text-[#003087]">Pay</span>
            <span className="text-[#009cde]">Pal</span>
          </button>
          <p className="mt-3 text-center text-[14px] text-[#585858]">Demo only, no real payment is made.</p>
        </div>
      )}

      {method === 'card' && (
        <div>
          <h2 className="font-rowdies text-[20px] uppercase text-black sm:text-[24px]">Card details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <Field label="Name on card">
                <input name="holder" value={card.holder} onChange={onCardChange} required autoComplete="cc-name" className={inputClass} />
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Card number">
                <input
                  name="number"
                  value={card.number}
                  onChange={onCardChange}
                  required
                  inputMode="numeric"
                  autoComplete="cc-number"
                  placeholder="1234 5678 9012 3456"
                  className={inputClass}
                />
              </Field>
            </div>
            <Field label="Expiry (MM/YY)">
              <input name="expiry" value={card.expiry} onChange={onCardChange} required inputMode="numeric" autoComplete="cc-exp" placeholder="MM/YY" className={inputClass} />
            </Field>
            <Field label="Security code">
              <input name="cvv" value={card.cvv} onChange={onCardChange} required inputMode="numeric" autoComplete="cc-csc" placeholder="CVV" className={inputClass} />
            </Field>
          </div>
          {cardError && (
            <p role="alert" className="mt-4 text-[16px] text-maroon">
              {cardError}
            </p>
          )}
          <p className="mt-4 text-[15px] text-[#585858]">
            This is a demo. Your card details are not saved or sent anywhere.
          </p>
        </div>
      )}
    </div>
  )
}

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart()
  const formRef = useRef(null)
  const [step, setStep] = useState(1)
  const [mode, setMode] = useState('delivery')
  const [details, setDetails] = useState(emptyDetails)
  const [method, setMethod] = useState('cash')
  const [card, setCard] = useState(emptyCard)
  const [cardError, setCardError] = useState('')
  const [orderNumber, setOrderNumber] = useState(null)

  const deliveryFee = mode === 'delivery' ? DELIVERY_FEE : 0
  const total = subtotal + deliveryFee

  function handleDetailsChange(event) {
    const { name, value } = event.target
    setDetails((current) => ({ ...current, [name]: value }))
  }

  // format the card fields while typing
  function handleCardChange(event) {
    const { name, value } = event.target
    const formatted = {
      holder: value,
      number: formatCardNumber(value),
      expiry: formatExpiry(value),
      cvv: value.replace(/\D/g, '').slice(0, 4),
    }[name]
    setCard((current) => ({ ...current, [name]: formatted }))
    setCardError('')
  }

  function goToStep(nextStep) {
    setStep(nextStep)
    formRef.current?.scrollIntoView({ block: 'start' })
  }

  function handleSubmit(event) {
    event.preventDefault()

    // step 1 -> step 2
    if (step === 1) {
      goToStep(2)
      return
    }

    if (method === 'card') {
      const message = checkCard(card)
      if (message) {
        setCardError(message)
        return
      }
    }

    // no server yet, so we only fake an order number
    setOrderNumber(Math.floor(1000 + Math.random() * 9000))
    setCard(emptyCard)
    clearCart()
  }

  if (orderNumber) {
    return (
      <MessageBox>
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-cream text-[40px] text-maroon">✓</div>
        <h2 className="mt-5 font-rowdies text-[24px] uppercase text-maroon sm:text-[30px]">Order placed!</h2>
        <p className="mt-2 text-[18px] text-[#585858]">
          Thanks for smashing with us. Your order number is <b className="text-black">#{orderNumber}</b>.
        </p>
        <Link to="/" className={primaryLink}>Back to home</Link>
      </MessageBox>
    )
  }

  if (items.length === 0) {
    return (
      <MessageBox>
        <h2 className="font-rowdies text-[24px] uppercase text-maroon sm:text-[30px]">Your cart is empty</h2>
        <p className="mt-2 text-[18px] text-[#585858]">Add something tasty before you check out.</p>
        <Link to="/#menu" className={primaryLink}>Browse the menu</Link>
      </MessageBox>
    )
  }

  return (
    <>
      <Banner />
      <section className="bg-cream px-4 pb-16 pt-6 lg:pb-[110px] lg:pt-10">
        <div className="mx-auto max-w-[1240px]">
          <form ref={formRef} onSubmit={handleSubmit} className="grid scroll-mt-24 items-start gap-8 lg:grid-cols-[1.5fr_1fr] lg:gap-10">
            {step === 1 ? (
              <DetailsStep mode={mode} setMode={setMode} details={details} onChange={handleDetailsChange} />
            ) : (
              <PaymentStep mode={mode} method={method} setMethod={setMethod} card={card} onCardChange={handleCardChange} cardError={cardError} />
            )}

            {/* summary */}
            <aside className="rounded-[20px] bg-white p-6 lg:sticky lg:top-[108px]">
              <h2 className="font-rowdies text-[22px] uppercase text-maroon">Your order</h2>

              <ul className="mt-5 space-y-3">
                {items.map((item) => (
                  <li key={item.key} className="flex items-start justify-between gap-3 text-[16px]">
                    <span className="text-black">
                      {item.quantity} × {item.title} {item.highlight}
                      {item.sizeLabel && <span className="text-[#585858]"> ({item.sizeLabel})</span>}
                    </span>
                    <span className="shrink-0 font-rowdies text-black">{toMoney(item.unitPrice * item.quantity)}</span>
                  </li>
                ))}
              </ul>

              <div className="my-5 border-b-2 border-dashed border-black/15" />

              <dl className="space-y-3 text-[18px]">
                <div className="flex justify-between">
                  <dt className="text-[#585858]">Subtotal</dt>
                  <dd className="font-rowdies text-black">{toMoney(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[#585858]">{mode === 'delivery' ? 'Delivery' : 'Pickup'}</dt>
                  <dd className="font-rowdies text-black">{deliveryFee ? toMoney(deliveryFee) : 'Free'}</dd>
                </div>
              </dl>

              <div className="my-5 border-b-2 border-dashed border-black/15" />

              <div className="flex items-center justify-between">
                <span className="font-rowdies text-[18px] uppercase text-black">Total</span>
                <span className="font-rowdies text-[28px] text-maroon">{toMoney(total)}</span>
              </div>

              <button
                type="submit"
                className="mt-6 h-12 w-full rounded-lg bg-maroon font-rowdies text-[14px] uppercase tracking-[1px] text-white transition hover:scale-[1.02] hover:shadow-xl active:scale-95"
              >
                {step === 1 ? 'Continue to payment' : `Pay ${toMoney(total)}`}
              </button>

              {step === 1 ? (
                <Link
                  to="/cart"
                  className="mt-3 flex h-12 w-full items-center justify-center rounded-lg border-2 border-maroon font-rowdies text-[13px] uppercase tracking-[1px] text-maroon transition hover:bg-maroon hover:text-white"
                >
                  Back to cart
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => goToStep(1)}
                  className="mt-3 flex h-12 w-full items-center justify-center rounded-lg border-2 border-maroon font-rowdies text-[13px] uppercase tracking-[1px] text-maroon transition hover:bg-maroon hover:text-white"
                >
                  Back to details
                </button>
              )}
            </aside>
          </form>
        </div>
      </section>
    </>
  )
}
