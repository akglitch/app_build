import React, { useState } from 'react'
import SiteShell from '../components/SiteShell'

const SUBJECTS = [
  { id: 'fitting', label: 'Atelier fitting enquiry' },
  { id: 'commission', label: 'Custom commission' },
  { id: 'aftercare', label: 'Aftercare & alterations' },
  { id: 'press', label: 'Press & partnerships' },
  { id: 'other', label: 'Something else' },
]

export default function ContactPage({ basket, products }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState(SUBJECTS[0].id)
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subjectLabel = SUBJECTS.find(s => s.id === subject)?.label || ''
    const body = `👔 *Mensah Atelier Enquiry*\nName: *${name}*\nEmail: *${email}*\nSubject: *${subjectLabel}*\n\n${message}`
    window.open(`https://wa.me/233209742331?text=${encodeURIComponent(body)}`, '_blank')
    setSent(true)
  }

  const handleReset = () => {
    setName('')
    setEmail('')
    setSubject(SUBJECTS[0].id)
    setMessage('')
    setSent(false)
  }

  return (
    <SiteShell basket={basket} products={products} variant="solid">
      <section className="py-24 border-b border-black/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <span className="font-body text-[#C6A43F] text-[10px] tracking-[0.4em] uppercase block font-semibold mb-4">
              Reach the Atelier
            </span>
            <h1 className="font-display text-5xl md:text-6xl text-black font-medium leading-[1.1] mb-6">
              A note from a <span className="italic font-light text-[#C6A43F]">gentleman</span>
            </h1>
            <p className="font-cormorant text-xl text-black/60 italic leading-relaxed">
              Tell us how we can serve. The Mensah team responds personally to every enquiry within one working day.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-[1200px] mx-auto">
            {/* Form */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-black/5 p-8 md:p-10">
                {!sent ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-body text-[9px] text-black/50 tracking-widest uppercase mb-1.5">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={e => setName(e.target.value)}
                          placeholder="John Mensah"
                          className="w-full bg-[#FAF9F6] border border-black/10 px-4 py-3 font-body text-xs focus:border-black/40 focus:outline-none transition-colors rounded-none"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-[9px] text-black/50 tracking-widest uppercase mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="gentleman@example.com"
                          className="w-full bg-[#FAF9F6] border border-black/10 px-4 py-3 font-body text-xs focus:border-black/40 focus:outline-none transition-colors rounded-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-body text-[9px] text-black/50 tracking-widest uppercase mb-2">
                        Subject
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {SUBJECTS.map(s => (
                          <button
                            type="button"
                            key={s.id}
                            onClick={() => setSubject(s.id)}
                            className={`px-3 py-3 border font-body text-[9px] tracking-wider transition-all bg-white ${
                              subject === s.id
                                ? 'border-black bg-black text-white'
                                : 'border-black/10 hover:border-black/30 text-black/70'
                            }`}
                          >
                            {s.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block font-body text-[9px] text-black/50 tracking-widest uppercase mb-1.5">
                        Message
                      </label>
                      <textarea
                        required
                        rows={6}
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                        placeholder="Tell us what you have in mind…"
                        className="w-full bg-[#FAF9F6] border border-black/10 px-4 py-3 font-body text-sm leading-relaxed focus:border-black/40 focus:outline-none transition-colors rounded-none resize-y"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={!name || !email || !message}
                      className="w-full py-4 bg-black text-white font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black/90 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                      Send via WhatsApp
                    </button>

                    <p className="font-body text-[9px] text-black/40 tracking-wide text-center">
                      Messages are routed to our Accra atelier team. Replies typically arrive within 24 hours.
                    </p>
                  </form>
                ) : (
                  <div className="text-center py-8 space-y-6">
                    <div className="w-14 h-14 rounded-full border border-green-500/20 bg-green-500/5 flex items-center justify-center mx-auto">
                      <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-display text-2xl text-black font-medium">Note dispatched</h3>
                    <p className="font-cormorant text-base text-black/60 italic max-w-sm mx-auto">
                      Your enquiry has been opened in WhatsApp. Send the message to complete delivery to the Mensah team.
                    </p>
                    <button
                      onClick={handleReset}
                      className="px-8 py-3 border border-black/10 font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black hover:text-white transition-colors"
                    >
                      Write Another
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Atelier details */}
            <aside className="lg:col-span-5 space-y-6">
              <div className="bg-white border border-black/5 p-6 md:p-8">
                <span className="font-body text-[9px] text-[#C6A43F] tracking-[0.4em] uppercase block font-semibold mb-3">
                  Atelier Address
                </span>
                <h3 className="font-display text-xl text-black font-semibold mb-2">Accra Flagship</h3>
                <p className="font-body text-sm text-black/60 leading-relaxed">
                  Osu Heritage Lane<br />
                  Greater Accra, Ghana
                </p>
              </div>

              <div className="bg-white border border-black/5 p-6 md:p-8">
                <span className="font-body text-[9px] text-[#C6A43F] tracking-[0.4em] uppercase block font-semibold mb-3">
                  Atelier Hours
                </span>
                <ul className="font-body text-sm text-black/60 space-y-1.5">
                  <li className="flex justify-between"><span>Monday — Friday</span><span>10:00 — 19:00</span></li>
                  <li className="flex justify-between"><span>Saturday</span><span>11:00 — 18:00</span></li>
                  <li className="flex justify-between"><span>Sunday</span><span>By appointment</span></li>
                </ul>
              </div>

              <div className="bg-white border border-black/5 p-6 md:p-8">
                <span className="font-body text-[9px] text-[#C6A43F] tracking-[0.4em] uppercase block font-semibold mb-3">
                  Direct Lines
                </span>
                <div className="space-y-2 font-body text-sm">
                  <p className="text-black/60">
                    Bookings:{' '}
                    <a href="tel:+233209742331" className="text-black hover:text-[#C6A43F] transition-colors">
                      +233 20 974 2331
                    </a>
                  </p>
                  <p className="text-black/60">
                    Enquiries:{' '}
                    <a href="mailto:atelier@mensah-luxury.com" className="text-black hover:text-[#C6A43F] transition-colors">
                      atelier@mensah-luxury.com
                    </a>
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
