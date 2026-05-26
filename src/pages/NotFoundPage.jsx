import React from 'react'
import { Link } from 'react-router-dom'
import SiteShell from '../components/SiteShell'

export default function NotFoundPage({ basket, products }) {
  return (
    <SiteShell basket={basket} products={products} variant="solid">
      <section className="min-h-[70vh] flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-xl mx-auto">
          <span className="font-body text-[#C6A43F] text-[10px] tracking-[0.4em] uppercase block font-semibold mb-6">
            Error 404 // Off The Pattern
          </span>
          <h1 className="font-display text-[8rem] md:text-[12rem] text-black font-medium leading-none mb-4">
            <span className="italic font-light text-[#C6A43F]">404</span>
          </h1>
          <h2 className="font-display text-3xl md:text-4xl text-black font-semibold mb-4">
            This stitch is missing.
          </h2>
          <p className="font-cormorant text-xl text-black/60 italic leading-relaxed mb-10">
            The page you sought has either moved to a new pattern, been retired from the archive, or never existed at all. Allow us to guide you back.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-10 py-4 bg-black text-white font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black/90 transition-colors"
            >
              Return Home
            </Link>
            <Link
              to="/collection"
              className="px-10 py-4 border border-black/20 text-black font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black hover:text-white transition-colors"
            >
              Browse the Archive
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  )
}
