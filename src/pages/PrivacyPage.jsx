import React from 'react'
import { Link } from 'react-router-dom'
import SiteShell from '../components/SiteShell'

const SECTIONS = [
  {
    title: 'Information We Collect',
    body: [
      'Personal details you provide directly — name, email address, phone number, delivery address, and measurements supplied during a fitting consultation.',
      'Order details — items purchased, basket identifiers, payment confirmation references, and shipping preferences.',
      'Anonymous usage data — pages visited, products viewed, and approximate location used to improve the shopping experience.',
    ],
  },
  {
    title: 'How We Use Your Information',
    body: [
      'To process and fulfil orders, including arranging delivery and aftercare.',
      'To schedule and prepare for atelier appointments and virtual fittings.',
      'To respond to direct enquiries sent through WhatsApp, email, or our contact form.',
      'To improve our collection, tailor styling recommendations, and refine the digital experience.',
    ],
  },
  {
    title: 'Sharing & Disclosure',
    body: [
      'We do not sell personal data to third parties. Information is shared only with our payment processor, courier partners, and the artisans fulfilling your commission — and only insofar as is necessary to complete the service.',
      'We may disclose information when required by law, or to protect the rights, property, or safety of our clients or the atelier.',
    ],
  },
  {
    title: 'Data Retention',
    body: [
      'Bespoke measurements are kept on file indefinitely so we may serve you across the life of your wardrobe. You may request deletion at any time.',
      'Order and basket history is retained for seven years to support warranty, aftercare, and accounting obligations.',
    ],
  },
  {
    title: 'Your Rights',
    body: [
      'You may request access to, correction of, or deletion of any personal data we hold about you. Write to atelier@mensah-luxury.com and we will respond within fourteen days.',
      'You may also opt out of any marketing communications by replying to a message or contacting the atelier directly.',
    ],
  },
  {
    title: 'Cookies & Local Storage',
    body: [
      'We use minimal local storage to remember your basket between visits and to keep your recently-viewed pieces close at hand. We do not employ third-party advertising cookies.',
    ],
  },
]

export default function PrivacyPage({ basket, products }) {
  return (
    <SiteShell basket={basket} products={products} variant="solid">
      <section className="py-24 border-b border-black/5">
        <div className="max-w-[900px] mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="font-body text-[#C6A43F] text-[10px] tracking-[0.4em] uppercase block font-semibold mb-4">
              Mensah Atelier
            </span>
            <h1 className="font-display text-5xl md:text-6xl text-black font-medium leading-[1.1] mb-6">
              Privacy <span className="italic font-light text-[#C6A43F]">Policy</span>
            </h1>
            <p className="font-cormorant text-xl text-black/60 italic max-w-xl mx-auto leading-relaxed">
              A clear, plainly-written account of how the atelier handles the trust you place in us.
            </p>
            <p className="font-body text-[10px] text-black/40 tracking-widest uppercase mt-6">
              Effective {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="bg-white border border-black/5 p-8 md:p-12 space-y-12">
            <p className="font-cormorant text-lg text-black/70 italic leading-relaxed border-l-2 border-[#C6A43F] pl-6">
              Mensah Atelier respects the privacy of every gentleman who walks through our doors — digital or physical. This policy describes what we collect, how we use it, and the choices that remain firmly yours.
            </p>

            {SECTIONS.map((section, idx) => (
              <div key={section.title}>
                <div className="flex items-baseline gap-4 mb-4">
                  <span className="font-body text-[9px] text-[#C6A43F] tracking-[0.4em] uppercase font-semibold">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h2 className="font-display text-2xl md:text-3xl text-black font-semibold">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-4 pl-0 md:pl-12">
                  {section.body.map((p, i) => (
                    <p key={i} className="font-body text-sm text-black/70 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}

            <div className="border-t border-black/5 pt-8">
              <h2 className="font-display text-2xl text-black font-semibold mb-3">
                Reach Us With Concerns
              </h2>
              <p className="font-body text-sm text-black/70 leading-relaxed mb-6">
                If any aspect of this policy is unclear, or you wish to exercise one of your rights, please contact the atelier.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-3 bg-black text-white font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black/90 transition-colors"
              >
                Reach the Atelier
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
