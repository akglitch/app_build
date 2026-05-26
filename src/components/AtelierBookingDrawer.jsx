import React, { useState } from 'react'

const FITTING_SERVICES = [
  { id: 'bespoke_suit', name: 'Bespoke Suit Fitting', location: 'Accra Atelier', duration: '90 Mins' },
  { id: 'heritage_kaftan', name: 'Heritage Kaftan Curation', location: 'Accra Atelier', duration: '60 Mins' },
  { id: 'virtual_styling', name: 'Virtual Styling & Measurement', location: 'Digital Session', duration: '45 Mins' }
]

const DRINK_CHOICES = [
  { id: 'champagne', name: 'Vintage Champagne' },
  { id: 'cocoa', name: 'Chilled Cocoa Brew' },
  { id: 'water', name: 'Sparkling Mineral' },
  { id: 'none', name: 'No Refreshments' }
]

// Generating next 5 booking days starting tomorrow
const getBookingDays = () => {
  const days = []
  const options = { weekday: 'short', month: 'short', day: 'numeric' }
  for (let i = 1; i <= 5; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    days.push({
      raw: d.toISOString().split('T')[0],
      formatted: d.toLocaleDateString('en-US', options),
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dateNum: d.getDate()
    })
  }
  return days
}

const TIME_SLOTS = ['10:00 AM', '12:00 PM', '2:00 PM', '4:00 PM', '6:00 PM']

export default function AtelierBookingDrawer({ isOpen, onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [service, setService] = useState(FITTING_SERVICES[0].id)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [drink, setDrink] = useState('champagne')
  const [successTicket, setSuccessTicket] = useState(null)

  const bookingDays = getBookingDays()

  const handleBooking = (e) => {
    e.preventDefault()
    if (!name || !email || !date || !time) return

    const selectedService = FITTING_SERVICES.find(s => s.id === service)
    const selectedDrink = DRINK_CHOICES.find(d => d.id === drink)
    const reservationId = `MSH-${Math.floor(1000 + Math.random() * 9000)}-${new Date().getFullYear()}`

    setSuccessTicket({
      reservationId,
      name,
      email,
      service: selectedService.name,
      location: selectedService.location,
      date,
      time,
      drink: selectedDrink.name
    })
  }

  const handleWhatsAppConfirm = () => {
    if (!successTicket) return
    const message = `👔  *MENSAH ATELIER*
━━━━━━━━━━━━━━━━━━━
_Bespoke Fitting Reservation_

📋  *Reservation ID*
\`${successTicket.reservationId}\`

👤  *Honourable Client*
*${successTicket.name}*
✉️  ${successTicket.email}

✂️  *Service*
${successTicket.service}
📍 _${successTicket.location}_

📅  *Appointment*
${successTicket.date}  ·  ${successTicket.time}

🍾  *Atelier Refreshment*
${successTicket.drink}

━━━━━━━━━━━━━━━━━━━

✨  _Kindly confirm my private invitation._`
    const encoded = encodeURIComponent(message)
    window.open(`https://wa.me/233209742331?text=${encoded}`, '_blank')
  }

  const handleReset = () => {
    setName('')
    setEmail('')
    setService(FITTING_SERVICES[0].id)
    setDate('')
    setTime('')
    setDrink('champagne')
    setSuccessTicket(null)
    onClose()
  }

  return (
    <>
      {/* Immersive Blur Overlay */}
      <div
        className={`fixed inset-0 bg-white/40 backdrop-blur-md z-50 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={successTicket ? handleReset : onClose}
      />

      {/* Booking Drawer */}
      <div
        id="booking-drawer"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#FAF9F6] border-l border-black/10 z-50 flex flex-col transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/5 bg-[#ffffff]">
          <div>
            <h2 className="font-display text-gold-text text-xl font-medium tracking-wider">Atelier Booking</h2>
            <p className="font-body text-black/40 text-[9px] tracking-[0.25em] uppercase mt-0.5">Accra Atelier & Online</p>
          </div>
          <button
            onClick={successTicket ? handleReset : onClose}
            className="w-8 h-8 flex items-center justify-center text-black/50 hover:text-black border border-black/10 hover:border-black/30 transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {/* Dynamic Inner Form or Success Screen */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {!successTicket ? (
            <form onSubmit={handleBooking} className="space-y-6">
              <p className="font-cormorant text-black/60 italic text-base leading-relaxed">
                Experience meticulous measurement, bespoke fabric selection, and absolute dedication to fit. Secure your slot at the Mensah Atelier.
              </p>

              {/* Personal Details */}
              <div className="space-y-4">
                <div>
                  <label className="block font-body text-[9px] text-black/50 tracking-widest uppercase mb-1.5">Client Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full bg-white border border-black/10 px-4 py-3 font-body text-xs focus:border-black/40 focus:outline-none transition-colors rounded-none"
                  />
                </div>

                <div>
                  <label className="block font-body text-[9px] text-black/50 tracking-widest uppercase mb-1.5">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full bg-white border border-black/10 px-4 py-3 font-body text-xs focus:border-black/40 focus:outline-none transition-colors rounded-none"
                  />
                </div>
              </div>

              {/* Service Selection */}
              <div>
                <label className="block font-body text-[9px] text-black/50 tracking-widest uppercase mb-2">Select Service</label>
                <div className="space-y-2">
                  {FITTING_SERVICES.map(s => (
                    <div
                      key={s.id}
                      onClick={() => setService(s.id)}
                      className={`p-3 border transition-all duration-200 cursor-pointer flex items-center justify-between bg-white ${
                        service === s.id ? 'border-black bg-black/[0.02]' : 'border-black/10 hover:border-black/30'
                      }`}
                    >
                      <div>
                        <p className="font-display text-xs text-black font-medium">{s.name}</p>
                        <p className="font-body text-black/40 text-[9px] tracking-wide mt-0.5">{s.location} · {s.duration}</p>
                      </div>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${service === s.id ? 'border-black bg-black' : 'border-black/20'}`}>
                        {service === s.id && <div className="w-1.5 h-1.5 bg-[#FAF9F6] rounded-full" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom High-Fashion Date Picker */}
              <div>
                <label className="block font-body text-[9px] text-black/50 tracking-widest uppercase mb-2">Select Date</label>
                <div className="grid grid-cols-5 gap-2">
                  {bookingDays.map(d => (
                    <div
                      key={d.raw}
                      onClick={() => setDate(d.raw)}
                      className={`py-3 border text-center transition-all duration-200 cursor-pointer flex flex-col items-center bg-white ${
                        date === d.raw ? 'border-black bg-black text-white' : 'border-black/10 hover:border-black/30 text-black'
                      }`}
                    >
                      <span className={`font-body text-[8px] tracking-wider uppercase mb-1 ${date === d.raw ? 'text-white/60' : 'text-black/40'}`}>
                        {d.dayName}
                      </span>
                      <span className="font-display text-sm font-semibold">{d.dateNum}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              <div>
                <label className="block font-body text-[9px] text-black/50 tracking-widest uppercase mb-2">Select Time Slot</label>
                <div className="flex flex-wrap gap-2">
                  {TIME_SLOTS.map(t => (
                    <div
                      key={t}
                      onClick={() => setTime(t)}
                      className={`px-3 py-2 border font-body text-[10px] tracking-wider transition-all duration-200 cursor-pointer bg-white ${
                        time === t ? 'border-black bg-black text-white' : 'border-black/10 hover:border-black/30 text-black'
                      }`}
                    >
                      {t}
                    </div>
                  ))}
                </div>
              </div>

              {/* VIP drink choices */}
              <div>
                <label className="block font-body text-[9px] text-black/50 tracking-widest uppercase mb-2">Atelier Refreshment (VIP Complimentary)</label>
                <div className="grid grid-cols-2 gap-2">
                  {DRINK_CHOICES.map(d => (
                    <div
                      key={d.id}
                      onClick={() => setDrink(d.id)}
                      className={`p-2.5 border text-center font-body text-[9px] tracking-widest uppercase transition-all duration-200 cursor-pointer bg-white ${
                        drink === d.id ? 'border-black bg-black text-white' : 'border-black/10 hover:border-black/30 text-black'
                      }`}
                    >
                      {d.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!name || !email || !date || !time}
                className="w-full py-4 bg-black text-white font-body text-xs tracking-widest uppercase hover:bg-black/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed mt-2"
              >
                Request Private Invitation
              </button>
            </form>
          ) : (
            /* Immersive Success Ticket Screen */
            <div className="space-y-8 py-4">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full border border-green-500/20 bg-green-500/5 flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-xl text-black font-medium">Bespoke Invitation Secured</h3>
                <p className="font-body text-black/40 text-[9px] tracking-[0.2em] uppercase mt-1">Check your WhatsApp to complete curation</p>
              </div>

              {/* The Ticket */}
              <div className="asymmetric-frame p-6 bg-white border border-black/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-gold/5 transform translate-x-8 -translate-y-8 rotate-45 border-b border-black/5" />
                
                <div className="flex justify-between items-center mb-6">
                  <span className="font-display text-lg tracking-[0.15em] font-medium text-black">MENSAH.</span>
                  <span className="font-body text-[8px] bg-black text-white px-2 py-0.5 tracking-wider uppercase font-semibold">{successTicket.reservationId}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="block font-body text-[8px] text-black/40 tracking-widest uppercase">Honorable Client</span>
                    <span className="font-display text-sm font-medium text-black">{successTicket.name}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block font-body text-[8px] text-black/40 tracking-widest uppercase">Service Fit</span>
                      <span className="font-body text-xs font-semibold text-black">{successTicket.service}</span>
                    </div>
                    <div>
                      <span className="block font-body text-[8px] text-black/40 tracking-widest uppercase">Atelier Location</span>
                      <span className="font-body text-xs font-semibold text-black">{successTicket.location}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="block font-body text-[8px] text-black/40 tracking-widest uppercase">Date Reserved</span>
                      <span className="font-body text-xs font-semibold text-black">{successTicket.date}</span>
                    </div>
                    <div>
                      <span className="block font-body text-[8px] text-black/40 tracking-widest uppercase">Time Window</span>
                      <span className="font-body text-xs font-semibold text-black">{successTicket.time}</span>
                    </div>
                  </div>

                  <div>
                    <span className="block font-body text-[8px] text-black/40 tracking-widest uppercase">VIP Refreshment Choice</span>
                    <span className="font-body text-xs font-semibold text-gold text-[#C6A43F]">{successTicket.drink}</span>
                  </div>
                </div>

                {/* Decorative tickets punch dots */}
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3.5 h-6 bg-[#FAF9F6] border-r border-black/10 rounded-r-full" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-6 bg-[#FAF9F6] border-l border-black/10 rounded-l-full" />
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-2">
                <button
                  onClick={handleWhatsAppConfirm}
                  className="w-full flex items-center justify-center gap-3 py-3.5 font-body font-semibold text-xs tracking-widest uppercase text-white hover:opacity-95 transition-opacity"
                  style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
                >
                  Confirm via WhatsApp
                </button>

                <button
                  onClick={handleReset}
                  className="w-full py-3 border border-black/10 font-body text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-colors"
                >
                  Return to Boutique
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
