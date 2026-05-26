import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer({ onOpenBooking }) {
  return (
    <footer className="bg-white pt-20 pb-12 px-6 md:px-12 border-t border-black/5 relative z-10 text-left select-none">
      <div className="max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-display text-4xl text-black font-semibold tracking-wider mb-5">MENSAH.</h2>
            <p className="font-cormorant text-xl text-black/50 italic mb-8 max-w-sm">
              "Style transcends simple clothing. We construct physical poetry tailored to a gentleman's presence."
            </p>
            <div className="flex gap-6">
              {['Instagram', 'Twitter', 'Pinterest'].map(social => (
                <a
                  key={social}
                  href="#"
                  className="font-body text-[9px] text-black/40 hover:text-black tracking-[0.2em] uppercase font-semibold transition-colors magnetic"
                >
                  {social}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-body text-[9px] text-black/50 tracking-[0.25em] uppercase mb-6 font-semibold">
              Atelier Curation
            </h4>
            <ul className="space-y-3 font-body text-xs text-black/50 font-medium">
              <li><Link to="/collection" className="hover:text-black transition-colors">The Complete Archive</Link></li>
              <li><Link to="/about" className="hover:text-black transition-colors">Our Heritage</Link></li>
              {onOpenBooking && (
                <li>
                  <button
                    onClick={onOpenBooking}
                    className="hover:text-black transition-colors book-trigger text-left"
                  >
                    Atelier Fitting Scheduler
                  </button>
                </li>
              )}
              <li><Link to="/checkout" className="hover:text-black transition-colors">Curation Checkout</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-body text-[9px] text-black/50 tracking-[0.25em] uppercase mb-6 font-semibold">
              Atelier Locations
            </h4>
            <p className="font-body text-xs text-black/50 leading-relaxed font-medium mb-4">
              Accra Flagship Atelier<br />
              Osu Neighborhood, Accra, Ghana<br />
              Bookings: virtual &amp; physical fittings.
            </p>
            <Link
              to="/contact"
              className="font-body text-[9px] text-[#C6A43F] hover:text-[#B5942B] tracking-[0.2em] uppercase font-semibold transition-colors"
            >
              Reach the Atelier →
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/5">
          <p className="font-body text-[8px] text-black/30 tracking-[0.15em] uppercase mb-4 md:mb-0">
            © {new Date().getFullYear()} Mensah Atelier. Designed for the discerning gentleman.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="font-body text-[8px] text-black/30 hover:text-black tracking-[0.15em] uppercase transition-colors font-medium"
            >
              Privacy policy
            </Link>
            <Link
              to="/about"
              className="font-body text-[8px] text-black/30 hover:text-black tracking-[0.15em] uppercase transition-colors font-medium"
            >
              Terms of fitting service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
