import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/collection', label: 'Collection' },
  { to: '/about', label: 'Heritage' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy', label: 'Privacy' },
]

export default function MobileNav({ isOpen, onClose, onOpenBooking, onOpenCart, basket }) {
  const location = useLocation()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-500 md:hidden ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 h-full w-[85%] max-w-sm bg-[#FAF9F6] z-50 flex flex-col border-r border-black/10 transition-transform duration-500 ease-out md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-black/5 bg-white">
          <Link to="/" onClick={onClose} className="flex flex-col">
            <span className="font-display text-xl tracking-[0.25em] uppercase text-black font-semibold">
              MENSAH
            </span>
            <span className="font-cormorant italic text-[#C6A43F] text-[9px] tracking-[0.08em] mt-0.5 font-medium">
              Single &amp; Stylish
            </span>
          </Link>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center text-black/50 hover:text-black border border-black/10 hover:border-black/30 transition-all"
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        {/* Links */}
        <nav className="flex-1 overflow-y-auto px-6 py-6">
          <span className="font-body text-[9px] text-black/40 tracking-[0.4em] uppercase font-semibold block mb-4">
            Atelier
          </span>
          <ul className="space-y-1 mb-8">
            {NAV_LINKS.map(link => {
              const active = location.pathname === link.to
              return (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={onClose}
                    className={`block py-3 border-b border-black/5 font-display text-lg transition-colors ${
                      active ? 'text-[#C6A43F] font-semibold' : 'text-black hover:text-[#C6A43F]'
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <span className="font-body text-[9px] text-black/40 tracking-[0.4em] uppercase font-semibold block mb-4">
            Actions
          </span>
          <div className="space-y-3">
            <button
              onClick={() => { onClose(); onOpenBooking?.() }}
              className="w-full py-4 bg-[#C6A43F] text-black font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-[#B5942B] transition-colors book-trigger"
            >
              Atelier Appointment
            </button>
            <button
              onClick={() => { onClose(); onOpenCart?.() }}
              className="w-full py-4 border border-black/20 text-black font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              View Basket
              {basket?.cartCount > 0 && (
                <span className="bg-black text-white text-[9px] px-2 py-0.5 font-bold rounded-full">
                  {basket.cartCount}
                </span>
              )}
            </button>
            <Link
              to="/checkout"
              onClick={onClose}
              className="w-full block text-center py-4 bg-black text-white font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black/90 transition-colors"
            >
              Curation Checkout
            </Link>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-black/5 bg-white">
          <p className="font-cormorant text-base text-black/60 italic leading-snug">
            "Style transcends simple clothing."
          </p>
          <p className="font-body text-[9px] text-black/30 tracking-[0.2em] uppercase mt-3">
            © {new Date().getFullYear()} Mensah Atelier
          </p>
        </div>
      </aside>
    </>
  )
}
