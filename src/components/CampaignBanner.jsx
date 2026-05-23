import React, { useState } from 'react'

const DEFAULT_MESSAGES = [
  'THE FALL/WINTER COLLECTION IS NOW AVAILABLE',
  'COMPLIMENTARY GLOBAL SHIPPING ON ALL ORDERS OVER GHS 500',
  'BESPOKE CONSULTATIONS AVAILABLE IN ACCRA',
]

export default function CampaignBanner({ campaigns = [] }) {
  const messages = campaigns.length > 0 
    ? campaigns.map(c => `${c.title || c.name} ${c.discount ? `— ${c.discount} OFF` : ''} ${c.valid_until ? `· ENDS ${c.valid_until}` : ''}`.trim())
    : DEFAULT_MESSAGES

  return (
    <div className="w-full bg-[#111] border-b border-white/5 py-1.5 overflow-hidden relative z-50 flex items-center">
      <div className="w-full flex whitespace-nowrap animate-marquee-left">
        {/* Double the array for seamless scrolling */}
        {[...messages, ...messages, ...messages].map((msg, i) => (
          <div key={i} className="flex items-center">
            <span className="font-body text-[9px] text-white/50 tracking-[0.2em] uppercase px-8">
              {msg}
            </span>
            <span className="text-gold/40 text-[8px]">✦</span>
          </div>
        ))}
      </div>
    </div>
  )
}
