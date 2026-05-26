import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import SiteShell from '../components/SiteShell'
import api from '../api/mensahApi'

const DELIVERY_METHODS = [
  { id: 'atelier_pickup', label: 'Atelier Collection', detail: 'Osu, Accra · Complimentary', fee: 0 },
  { id: 'accra_delivery', label: 'Accra Doorstep', detail: '24 — 48 hours · GHS 35', fee: 3500 },
  { id: 'national', label: 'National Courier', detail: '3 — 5 working days · GHS 90', fee: 9000 },
  { id: 'international', label: 'Global Concierge', detail: 'Quote on confirmation · From GHS 350', fee: 35000 },
]

const PAYMENT_METHODS = [
  { id: 'whatsapp', label: 'Confirm via WhatsApp', detail: 'Mobile Money · Cash · Bank Transfer', recommended: true },
  { id: 'transfer', label: 'Direct Bank Transfer', detail: 'Account details emailed' },
  { id: 'mobile_money', label: 'Mobile Money', detail: 'MTN · Telecel · AirtelTigo' },
]

export default function CheckoutPage({ basket, products }) {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Accra',
    country: 'Ghana',
    notes: '',
  })
  const [delivery, setDelivery] = useState(DELIVERY_METHODS[0].id)
  const [payment, setPayment] = useState(PAYMENT_METHODS[0].id)
  const [placed, setPlaced] = useState(false)
  const [orderRef, setOrderRef] = useState('')

  const selectedDelivery = DELIVERY_METHODS.find(d => d.id === delivery)
  const subtotal = basket?.totalGHS || 0
  const deliveryFee = (selectedDelivery?.fee || 0) / 100
  const total = subtotal + deliveryFee

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [step])

  if (placed) {
    return (
      <SiteShell basket={basket} products={products} variant="solid">
        <section className="py-24 px-6">
          <div className="max-w-[800px] mx-auto bg-white border border-black/10 p-10 md:p-14 text-center">
            <div className="w-16 h-16 rounded-full border border-green-500/20 bg-green-500/5 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="font-body text-[#C6A43F] text-[10px] tracking-[0.4em] uppercase block font-semibold mb-3">
              Order Secured
            </span>
            <h1 className="font-display text-3xl md:text-4xl text-black font-medium mb-3">
              Your curation is in our hands.
            </h1>
            <p className="font-cormorant text-lg text-black/60 italic max-w-md mx-auto mb-2">
              Order reference{' '}
              <span className="text-[#C6A43F] not-italic font-medium">{orderRef}</span>
            </p>
            <p className="font-body text-sm text-black/60 leading-relaxed max-w-md mx-auto mb-10">
              An atelier representative will be in touch on WhatsApp within the hour to confirm payment and fulfilment.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/"
                className="px-8 py-3 bg-black text-white font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black/90 transition-colors"
              >
                Return Home
              </Link>
              <Link
                to="/collection"
                className="px-8 py-3 border border-black/20 text-black font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black hover:text-white transition-colors"
              >
                Continue Browsing
              </Link>
            </div>
          </div>
        </section>
      </SiteShell>
    )
  }

  if (!basket?.items?.length) {
    return (
      <SiteShell basket={basket} products={products} variant="solid">
        <section className="py-24 px-6 text-center">
          <span className="font-body text-[#C6A43F] text-[10px] tracking-[0.4em] uppercase block font-semibold mb-6">
            Checkout
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-black font-medium leading-tight mb-4">
            Your basket awaits a selection.
          </h1>
          <p className="font-cormorant text-xl text-black/60 italic max-w-md mx-auto mb-10">
            Curate a few garments from the archive before proceeding to checkout.
          </p>
          <Link
            to="/collection"
            className="inline-block px-10 py-4 bg-black text-white font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black/90 transition-colors"
          >
            Browse the Archive
          </Link>
        </section>
      </SiteShell>
    )
  }

  const handleField = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const canAdvance = step === 1
    ? form.name && form.email && form.phone && form.address
    : true

  const handlePlace = () => {
    const ref = `MSH-${Date.now().toString().slice(-6)}-${new Date().getFullYear()}`
    setOrderRef(ref)
    setPlaced(true)

    if (payment === 'whatsapp') {
      const itemLines = basket.items.map(i => {
        const lineTotal = ((i.price_minor * i.qty) / 100).toFixed(2)
        return `•  ${i.name}\n    _×${i.qty}_  ·  *GHS ${lineTotal}*`
      }).join('\n\n')

      const notesBlock = form.notes
        ? `📝  *Atelier Notes*\n_${form.notes}_\n\n`
        : ''

      const msg = `👔  *MENSAH ATELIER*
━━━━━━━━━━━━━━━━━━━
_Curation Order Confirmation_

📋  *Order Reference*
\`${ref}\`

👤  *Honourable Client*
*${form.name}*
✉️  ${form.email}
📱  ${form.phone}

📦  *Delivery  ·  ${selectedDelivery.label}*
${form.address}
${form.city}, ${form.country}

🛍️  *Curated Pieces*
${itemLines}

━━━━━━━━━━━━━━━━━━━
Subtotal       GHS ${subtotal.toFixed(2)}
Delivery       GHS ${deliveryFee.toFixed(2)}
*TOTAL          GHS ${total.toFixed(2)}*
━━━━━━━━━━━━━━━━━━━

💳  *Payment Method*
${PAYMENT_METHODS.find(p => p.id === payment).label}

${notesBlock}✨  _Please confirm to proceed with fulfilment. The atelier will reply within the hour._`
      window.open(`https://wa.me/233209742331?text=${encodeURIComponent(msg)}`, '_blank')
    }

    basket.clearCart()
  }

  return (
    <SiteShell basket={basket} products={products} variant="solid">
      <section className="py-12 md:py-16 border-b border-black/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <span className="font-body text-[#C6A43F] text-[10px] tracking-[0.4em] uppercase block font-semibold mb-2">
                Curation Checkout
              </span>
              <h1 className="font-display text-3xl md:text-4xl text-black font-medium">
                Finalise the <span className="italic text-[#C6A43F]">acquisition</span>
              </h1>
            </div>
            <Link
              to="/collection"
              className="font-body text-[10px] text-black/60 hover:text-black tracking-[0.3em] uppercase font-medium transition-colors"
            >
              ← Continue Browsing
            </Link>
          </div>

          {/* Step indicator */}
          <div className="flex items-center gap-4 mb-12 overflow-x-auto luxury-scroll pb-2">
            {[
              { n: 1, label: 'Details' },
              { n: 2, label: 'Delivery' },
              { n: 3, label: 'Payment' },
              { n: 4, label: 'Review' },
            ].map((s, i, arr) => (
              <React.Fragment key={s.n}>
                <button
                  onClick={() => step > s.n && setStep(s.n)}
                  className={`flex items-center gap-2 font-body text-[10px] tracking-[0.3em] uppercase font-semibold whitespace-nowrap transition-colors ${
                    step === s.n ? 'text-black' : step > s.n ? 'text-[#C6A43F] hover:text-black' : 'text-black/30'
                  }`}
                >
                  <span
                    className={`w-6 h-6 flex items-center justify-center border ${
                      step === s.n
                        ? 'border-black bg-black text-white'
                        : step > s.n
                        ? 'border-[#C6A43F] text-[#C6A43F]'
                        : 'border-black/20'
                    }`}
                  >
                    {step > s.n ? '✓' : s.n}
                  </span>
                  {s.label}
                </button>
                {i < arr.length - 1 && <span className="flex-shrink-0 w-6 h-px bg-black/10" />}
              </React.Fragment>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Form column */}
            <div className="lg:col-span-7">
              {step === 1 && (
                <div className="bg-white border border-black/5 p-6 md:p-8 space-y-6">
                  <div>
                    <h2 className="font-display text-xl text-black font-semibold mb-1">Honourable Client Details</h2>
                    <p className="font-body text-xs text-black/50">Where shall we deliver this curation?</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Full Name" value={form.name} onChange={handleField('name')} placeholder="John Mensah" required />
                    <Field label="Email Address" type="email" value={form.email} onChange={handleField('email')} placeholder="gentleman@example.com" required />
                    <Field label="Phone (WhatsApp)" value={form.phone} onChange={handleField('phone')} placeholder="+233 20 000 0000" required />
                    <Field label="City" value={form.city} onChange={handleField('city')} placeholder="Accra" />
                  </div>

                  <Field
                    label="Delivery Address"
                    value={form.address}
                    onChange={handleField('address')}
                    placeholder="Street, House number, Suburb"
                    required
                  />

                  <Field label="Country" value={form.country} onChange={handleField('country')} placeholder="Ghana" />

                  <div>
                    <label className="block font-body text-[9px] text-black/50 tracking-widest uppercase mb-1.5">
                      Atelier Notes (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={form.notes}
                      onChange={handleField('notes')}
                      placeholder="Fit preferences, gift instructions, embroidery requests…"
                      className="w-full bg-[#FAF9F6] border border-black/10 px-4 py-3 font-body text-sm focus:border-black/40 focus:outline-none transition-colors rounded-none resize-y"
                    />
                  </div>

                  <button
                    onClick={() => setStep(2)}
                    disabled={!canAdvance}
                    className="w-full py-4 bg-black text-white font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Continue to Delivery
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className="bg-white border border-black/5 p-6 md:p-8 space-y-6">
                  <div>
                    <h2 className="font-display text-xl text-black font-semibold mb-1">Fulfilment Method</h2>
                    <p className="font-body text-xs text-black/50">Choose how the atelier should reach you.</p>
                  </div>

                  <div className="space-y-3">
                    {DELIVERY_METHODS.map(method => (
                      <button
                        key={method.id}
                        onClick={() => setDelivery(method.id)}
                        className={`w-full text-left p-4 border transition-all bg-[#FAF9F6] flex items-center justify-between ${
                          delivery === method.id ? 'border-black bg-black/[0.02]' : 'border-black/10 hover:border-black/30'
                        }`}
                      >
                        <div>
                          <p className="font-display text-sm text-black font-semibold">{method.label}</p>
                          <p className="font-body text-[11px] text-black/50 mt-0.5">{method.detail}</p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            delivery === method.id ? 'border-black bg-black' : 'border-black/20'
                          }`}
                        >
                          {delivery === method.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 py-4 border border-black/10 font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black hover:text-white transition-colors"
                    >
                      ← Back to Details
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 py-4 bg-black text-white font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black/90 transition-colors"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="bg-white border border-black/5 p-6 md:p-8 space-y-6">
                  <div>
                    <h2 className="font-display text-xl text-black font-semibold mb-1">Payment Method</h2>
                    <p className="font-body text-xs text-black/50">Payment is confirmed once the atelier receives your selection.</p>
                  </div>

                  <div className="space-y-3">
                    {PAYMENT_METHODS.map(method => (
                      <button
                        key={method.id}
                        onClick={() => setPayment(method.id)}
                        className={`w-full text-left p-4 border transition-all bg-[#FAF9F6] flex items-center justify-between ${
                          payment === method.id ? 'border-black bg-black/[0.02]' : 'border-black/10 hover:border-black/30'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <p className="font-display text-sm text-black font-semibold">{method.label}</p>
                            {method.recommended && (
                              <span className="font-body text-[8px] tracking-widest uppercase font-semibold text-[#C6A43F] bg-[#C6A43F]/10 px-1.5 py-0.5">
                                Recommended
                              </span>
                            )}
                          </div>
                          <p className="font-body text-[11px] text-black/50">{method.detail}</p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                            payment === method.id ? 'border-black bg-black' : 'border-black/20'
                          }`}
                        >
                          {payment === method.id && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 py-4 border border-black/10 font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black hover:text-white transition-colors"
                    >
                      ← Back to Delivery
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="flex-1 py-4 bg-black text-white font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black/90 transition-colors"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="bg-white border border-black/5 p-6 md:p-8 space-y-6">
                  <div>
                    <h2 className="font-display text-xl text-black font-semibold mb-1">Review &amp; Confirm</h2>
                    <p className="font-body text-xs text-black/50">A final glance before the atelier dispatches your acquisition.</p>
                  </div>

                  <ReviewRow label="Client" value={form.name} editStep={1} onEdit={setStep} />
                  <ReviewRow label="Contact" value={`${form.email} · ${form.phone}`} editStep={1} onEdit={setStep} />
                  <ReviewRow label="Address" value={`${form.address}, ${form.city}, ${form.country}`} editStep={1} onEdit={setStep} />
                  <ReviewRow label="Delivery" value={selectedDelivery.label} editStep={2} onEdit={setStep} />
                  <ReviewRow
                    label="Payment"
                    value={PAYMENT_METHODS.find(p => p.id === payment).label}
                    editStep={3}
                    onEdit={setStep}
                  />
                  {form.notes && (
                    <ReviewRow label="Notes" value={form.notes} editStep={1} onEdit={setStep} />
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 py-4 border border-black/10 font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black hover:text-white transition-colors"
                    >
                      ← Back to Payment
                    </button>
                    <button
                      onClick={handlePlace}
                      className="flex-1 py-4 bg-[#C6A43F] text-black font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-[#B5942B] transition-colors"
                    >
                      Place Order — GHS {total.toFixed(2)}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <aside className="lg:col-span-5">
              <div className="bg-white border border-black/5 p-6 md:p-8 lg:sticky lg:top-28">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display text-lg text-black font-semibold">Order Summary</h3>
                  <span className="font-body text-[9px] text-black/40 tracking-widest uppercase">
                    {basket.items.length} item{basket.items.length !== 1 ? 's' : ''}
                  </span>
                </div>

                <div className="space-y-3 mb-6 max-h-72 overflow-y-auto luxury-scroll pr-2">
                  {basket.items.map(item => {
                    const imgUrl = item.image_url ? api.imageUrl(item.image_url) : null
                    return (
                      <div key={item.item_id} className="flex gap-3 items-center">
                        {imgUrl ? (
                          <img src={imgUrl} alt={item.name} className="w-14 h-16 object-cover border border-black/5 bg-[#FAF9F6] flex-shrink-0" />
                        ) : (
                          <div className="w-14 h-16 bg-[#FAF9F6] border border-black/5 flex-shrink-0" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="font-display text-xs text-black font-semibold truncate">{item.name}</p>
                          <p className="font-body text-[10px] text-black/50">
                            {api.formatPrice(item.price_minor, item.currency)} × {item.qty}
                          </p>
                        </div>
                        <p className="font-body text-xs text-black font-semibold flex-shrink-0">
                          {api.formatPrice(item.price_minor * item.qty, item.currency)}
                        </p>
                      </div>
                    )
                  })}
                </div>

                <div className="space-y-2 border-t border-black/5 pt-4 font-body text-xs">
                  <Row label="Subtotal" value={`GHS ${subtotal.toFixed(2)}`} />
                  <Row label={`Delivery (${selectedDelivery.label})`} value={`GHS ${deliveryFee.toFixed(2)}`} />
                </div>

                <div className="border-t border-black/10 pt-4 mt-4 flex items-center justify-between">
                  <span className="font-body text-[10px] text-black/50 tracking-widest uppercase font-semibold">Total</span>
                  <span className="font-display text-xl text-black font-bold">GHS {total.toFixed(2)}</span>
                </div>

                <p className="font-body text-[9px] text-black/40 tracking-wide leading-relaxed text-center mt-4">
                  Bespoke fitting and lifetime alterations included with every commission.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}

function Field({ label, value, onChange, placeholder, type = 'text', required = false }) {
  return (
    <div>
      <label className="block font-body text-[9px] text-black/50 tracking-widest uppercase mb-1.5">
        {label}{required && <span className="text-[#C6A43F] ml-1">*</span>}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-[#FAF9F6] border border-black/10 px-4 py-3 font-body text-xs focus:border-black/40 focus:outline-none transition-colors rounded-none"
      />
    </div>
  )
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between text-black/70">
      <span>{label}</span>
      <span className="font-semibold text-black">{value}</span>
    </div>
  )
}

function ReviewRow({ label, value, editStep, onEdit }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-black/5 pb-3">
      <div>
        <span className="block font-body text-[9px] text-black/40 tracking-widest uppercase font-semibold mb-1">
          {label}
        </span>
        <span className="font-body text-sm text-black">{value}</span>
      </div>
      <button
        onClick={() => onEdit(editStep)}
        className="font-body text-[9px] text-[#C6A43F] hover:text-black tracking-widest uppercase font-semibold transition-colors flex-shrink-0 mt-1"
      >
        Edit
      </button>
    </div>
  )
}
