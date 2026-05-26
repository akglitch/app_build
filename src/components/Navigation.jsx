import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const NAV_LINKS = [
  { to: '/collection', label: 'Collection' },
  { to: '/about', label: 'Heritage' },
  { to: '/contact', label: 'Contact' },
]

export default function Navigation({ basket, onOpenCart, onOpenBooking, variant = 'default' }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isSolid = scrolled || variant === 'solid'

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-500 ${
        isSolid
          ? 'bg-white/95 backdrop-blur-md border-b border-black/5 py-4 shadow-sm'
          : 'bg-white/70 backdrop-blur-sm py-5'
      }`}
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between gap-4">
        <div className="hidden md:flex items-center gap-8 flex-1">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `font-body text-[9px] tracking-[0.25em] uppercase transition-colors font-medium magnetic ${
                  isActive ? 'text-black' : 'text-black/60 hover:text-black'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={onOpenBooking}
            className="font-body text-[9px] text-[#C6A43F] hover:text-[#B5942B] tracking-[0.25em] uppercase transition-colors font-semibold magnetic book-trigger"
          >
            Atelier Appointment
          </button>
        </div>

        <div className="md:hidden flex-1">
          <Link
            to="/"
            className="font-body text-[9px] text-black/60 tracking-[0.25em] uppercase font-medium"
          >
            ← Home
          </Link>
        </div>

        <Link to="/" className="flex flex-col items-center magnetic relative">
          <span className="font-display text-2xl tracking-[0.25em] uppercase text-black font-semibold">
            MENSAH
          </span>
          <span className="font-cormorant italic text-[#C6A43F] text-[10px] tracking-[0.08em] mt-0.5 font-medium">
            Single &amp; Stylish
          </span>
        </Link>

        <div className="flex items-center gap-6 flex-1 justify-end">
          <button
            onClick={onOpenBooking}
            className="font-body text-[9px] text-black/60 hover:text-black tracking-[0.2em] uppercase transition-colors font-medium magnetic hidden lg:block book-trigger"
          >
            Consultation
          </button>
          <button
            onClick={onOpenCart}
            className="magnetic flex items-center gap-2.5 group relative"
            aria-label="Open basket"
          >
            <span className="font-body text-[9px] text-black/80 group-hover:text-black tracking-[0.2em] uppercase transition-colors font-medium hidden sm:block">
              Basket
            </span>
            <div className="relative">
              <svg className="w-4.5 h-4.5 text-black/80 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {basket?.cartCount > 0 && (
                <span className={`absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-black text-[#ffffff] font-body text-[8px] font-bold rounded-full flex items-center justify-center ${basket.cartBounce ? 'badge-bounce' : ''}`}>
                  {basket.cartCount}
                </span>
              )}
            </div>
          </button>
        </div>
      </div>
    </nav>
  )
}
