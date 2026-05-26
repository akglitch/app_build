import React from 'react'
import { Link } from 'react-router-dom'

const COVER_LINES = [
  {
    kicker: 'The Atelier',
    body: 'A decade of considered craft, by hand.',
  },
  {
    kicker: 'Heritage Reimagined',
    body: 'Hand-finished tailoring from Accra to the world.',
  },
  {
    kicker: 'The Modern Gentleman',
    body: 'On being single, stylish, and considered.',
  },
]

export default function HeroBanner({ onOpenBooking }) {
  return (
    <section className="relative min-h-screen bg-[#FAF6EB] overflow-hidden select-none">

      {/* Warm paper-grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(0,0,0,1) 0.5px, transparent 0.5px)',
          backgroundSize: '3px 3px',
        }}
      />

      {/* Subtle warm radial light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(255,253,245,0.6) 0%, transparent 60%)' }}
      />

      {/* Magazine cover container */}
      <div className="relative z-10 max-w-[1500px] mx-auto px-6 md:px-12 lg:px-16 pt-28 pb-12 min-h-screen flex flex-col">

        {/* ─── Top issue line ─── */}
        <div className="flex items-center justify-between pb-3 border-b border-black/20 gap-4 flex-wrap text-center md:text-left animate-reveal-up">
          <span className="font-body text-[9px] text-black/70 tracking-[0.4em] uppercase font-bold">
            Volume XXIV
          </span>
          <span className="font-body text-[9px] text-black/70 tracking-[0.4em] uppercase font-bold">
            MMXXIV · The Heritage Issue
          </span>
          <span className="font-body text-[9px] text-black/70 tracking-[0.4em] uppercase font-bold">
            Accra · Ghana
          </span>
        </div>

        {/* ─── Massive Masthead ─── */}
        <div className="text-center py-6 lg:py-10 border-b-[3px] border-black animate-reveal-up" style={{ animationDelay: '0.05s' }}>
          <h1
            className="font-display font-bold text-black leading-[0.85] tracking-[-0.04em]"
            style={{ fontSize: 'clamp(80px, 16vw, 220px)' }}
          >
            Mensah
          </h1>
          <p className="font-cormorant italic text-black/60 text-base md:text-xl tracking-wide mt-3">
            est. 2014 — single &amp; stylish
          </p>
        </div>

        {/* ─── Editorial Spread ─── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start lg:items-center pt-10 lg:pt-14">

          {/* LEFT — Cover Story */}
          <div className="lg:col-span-6 space-y-7 animate-reveal-up" style={{ animationDelay: '0.1s' }}>

            <div className="flex items-center gap-4">
              <span className="font-body text-[10px] text-[#C6A43F] tracking-[0.5em] uppercase font-bold">
                The Cover Story
              </span>
              <span className="block flex-1 h-px bg-black/20" />
            </div>

            <h2 className="font-display leading-[0.92] tracking-tight">
              <span className="block text-5xl md:text-6xl lg:text-7xl font-light italic text-black">
                The Art of
              </span>
              <span className="block text-6xl md:text-7xl lg:text-8xl font-bold text-black -mt-1">
                Dressing
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-light italic text-black -mt-1">
                Well.
              </span>
            </h2>

            {/* Pull quote */}
            <div className="border-l-2 border-[#C6A43F] pl-6 max-w-xl space-y-3">
              <p className="font-cormorant text-xl md:text-2xl text-black/75 italic leading-snug">
                "More than a workshop — a movement connecting craftsmen, artisans, and the gentlemen who define modern elegance."
              </p>
              <p className="font-body text-[10px] text-black/50 tracking-[0.3em] uppercase font-semibold">
                — From the Atelier · Accra, 2024
              </p>
            </div>

            {/* CTAs — magazine-style underlined links */}
            <div className="flex flex-wrap items-center gap-6 pt-2">
              <Link
                to="/collection"
                className="group inline-flex items-center gap-3 font-body text-[11px] tracking-[0.4em] uppercase font-bold text-black border-b-2 border-black hover:text-[#C6A43F] hover:border-[#C6A43F] pb-2 transition-colors"
              >
                <span>Read the Collection</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
              <button
                onClick={onOpenBooking}
                className="group inline-flex items-center gap-3 font-body text-[11px] tracking-[0.4em] uppercase font-bold text-black/55 hover:text-black transition-colors book-trigger"
              >
                <span>Book an Atelier Sitting</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </div>

          {/* RIGHT — Cover Lines (Inside the Volume) */}
          <div className="lg:col-span-6 space-y-5 animate-reveal-up" style={{ animationDelay: '0.15s' }}>

            <div className="flex items-center gap-4 mb-1">
              <span className="block w-12 h-px bg-black/30" />
              <span className="font-body text-[10px] text-black tracking-[0.5em] uppercase font-bold">
                Inside this Volume
              </span>
              <span className="block flex-1 h-px bg-black/15" />
            </div>

            <ul className="divide-y divide-black/10 border-t border-black/10">
              {COVER_LINES.map((line, idx) => (
                <li key={idx} className="py-5 group cursor-default">
                  <div className="flex items-start gap-5">
                    <span className="font-display text-4xl md:text-5xl italic font-light text-[#C6A43F] leading-none flex-shrink-0 w-14">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-xl md:text-2xl text-black font-medium leading-tight mb-1 group-hover:text-[#C6A43F] transition-colors">
                        {line.kicker}
                      </h3>
                      <p className="font-cormorant text-base md:text-lg text-black/55 italic leading-snug">
                        {line.body}
                      </p>
                    </div>
                    <span className="text-black/30 group-hover:translate-x-1 group-hover:text-[#C6A43F] transition-all text-lg self-center">
                      →
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between pt-3">
              <span className="font-body text-[9px] text-black/40 tracking-[0.4em] uppercase font-semibold">
                Editorial · Accra · 2024
              </span>
              <span className="font-display text-2xl italic font-light text-[#C6A43F]">N° 24</span>
            </div>
          </div>
        </div>

        {/* ─── Bottom Masthead Footer ─── */}
        <div className="flex items-center justify-between gap-4 flex-wrap pt-6 mt-auto border-t-2 border-black/30">
          <span className="font-body text-[9px] text-black/65 tracking-[0.4em] uppercase font-bold">
            mensah-luxury.com
          </span>
          <span className="font-body text-[9px] text-black/65 tracking-[0.4em] uppercase font-bold">
            From GHS 1,200 · Bespoke
          </span>
          <span className="font-body text-[9px] text-black/65 tracking-[0.4em] uppercase font-bold">
            For the Modern Gentleman
          </span>
        </div>
      </div>
    </section>
  )
}
