import React, { useState, useRef } from 'react'
import ProductCard from './ProductCard'

function SkeletonCard() {
  return (
    <div className="border border-black/5 bg-[#ffffff] p-1">
      <div className="skeleton aspect-[1/1.2] w-full" />
      <div className="p-4 border-t border-black/5 flex justify-between items-center">
        <div className="w-2/3">
          <div className="skeleton h-3 w-full mb-1.5" />
          <div className="skeleton h-3 w-1/2" />
        </div>
        <div className="skeleton w-3 h-3 rounded-full" />
      </div>
    </div>
  )
}

export default function ProductGrid({ products, loading, error, onAddToCart, onViewProduct, addingId }) {
  const [filter, setFilter] = useState('all')
  const carouselRef = useRef(null)

  if (error) {
    return (
      <div className="py-24 text-center bg-[#FAF9F6]">
        <p className="font-cormorant text-2xl text-[#C6A43F] italic mb-3">Service Interruption</p>
        <p className="font-body text-[9px] text-black/40 tracking-widest uppercase">{error}</p>
      </div>
    )
  }

  const filters = [
    { key: 'all', label: 'The Complete Collection' },
    { key: 'under800', label: 'Everyday Luxury (< 800)' },
    { key: '800to1500', label: 'Signature Series (800 - 1500)' },
    { key: 'over1500', label: 'Bespoke Tier (1500+)' },
  ]

  const filtered = products.filter(p => {
    if (filter === 'under800') return p.price_minor < 80000
    if (filter === '800to1500') return p.price_minor >= 80000 && p.price_minor <= 150000
    if (filter === 'over1500') return p.price_minor > 150000
    return true
  })

  // Horizontal Scroll handler matching the second screenshot's arrow button
  const handleScrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = 320 // rough width of cards
      carouselRef.current.scrollBy({ left: cardWidth * 1.5, behavior: 'smooth' })
    }
  }

  return (
    <div id="collection" className="bg-[#FAF9F6] relative z-10">
      
      {/* ═══════════════════════════════════
         SECTION 1: "JUST LANDED" CAROUSEL (Inspiration Screenshot 2)
         ═══════════════════════════════════ */}
      <section className="py-24 border-b border-black/5 bg-[#ffffff] relative overflow-hidden">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 items-center">
          
          {/* Left panel - Text & Action */}
          <div className="w-full lg:w-[320px] flex-shrink-0 flex flex-col justify-center select-none text-left">
            <div className="flex items-start gap-1">
              <h2 className="font-display text-4xl md:text-5xl text-black leading-none font-medium">
                Just Landed
              </h2>
              <span className="font-body text-[9px] font-semibold bg-[#D4EC65] text-[#425010] rounded-full px-2 py-0.5 mt-1">
                {products.length}
              </span>
            </div>
            
            <p className="font-body text-xs text-black/50 tracking-wider mt-4 mb-8 max-w-xs leading-relaxed">
              An up-to-the-minute look at our latest custom tailored menswear additions.
            </p>
            
            <div className="flex items-center">
              <span className="h-8 w-[1px] bg-black/10" />
              <a 
                href="#full-collection" 
                className="font-body text-[10px] text-black tracking-[0.25em] uppercase hover:text-[#C6A43F] transition-colors py-2 px-6 font-medium"
              >
                Shop Now
              </a>
              <span className="h-8 w-[1px] bg-black/10" />
            </div>
          </div>

          {/* Right panel - Horizontal Scroll List */}
          <div className="w-full flex-1 relative flex items-center">
            <div 
              ref={carouselRef}
              className="luxury-scroll w-full flex gap-5 overflow-x-auto pb-4 pr-16"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {loading 
                ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="w-[280px] flex-shrink-0">
                      <SkeletonCard />
                    </div>
                  ))
                : products.map((product) => (
                    <div key={product.id} className="w-[280px] flex-shrink-0 scroll-snap-align-start">
                      <ProductCard
                        product={product}
                        onAddToCart={onAddToCart}
                        onView={onViewProduct}
                        addingId={addingId}
                      />
                    </div>
                  ))
              }
            </div>

            {/* Custom Arrow Slide Button - Placed exactly like the screenshot */}
            {!loading && products.length > 0 && (
              <button
                onClick={handleScrollRight}
                className="absolute right-4 w-12 h-14 bg-black text-white hover:bg-black/90 flex items-center justify-center transition-all z-20 shadow-md group"
              >
                <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════
         SECTION 2: "THE COMPLETE COLLECTION" ASYMMETRIC GRID
         ═══════════════════════════════════ */}
      <section id="full-collection" className="py-24 md:py-32 max-w-[1600px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 md:mb-20 gap-8 border-b border-black/5 pb-10">
          <div>
            <span className="font-body text-[8px] text-[#C6A43F] tracking-[0.4em] uppercase block mb-2 font-medium">Bespoke Curation</span>
            <h2 className="font-display text-4xl md:text-6xl text-black font-medium leading-none">
              The <span className="italic font-normal">Atelier Archive</span>
            </h2>
          </div>
          
          {/* Index style horizontal category list */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setFilter(f.key)}
                className={`font-body text-[9px] tracking-[0.2em] uppercase transition-all duration-300 flex items-center gap-2 ${
                  filter === f.key ? 'text-[#C6A43F] font-semibold' : 'text-black/40 hover:text-black'
                }`}
              >
                {filter === f.key && <span className="w-1.5 h-1.5 bg-[#C6A43F] rounded-full" />}
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading 
            ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
            : filtered.map((product, i) => (
                <div 
                  key={product.id} 
                  className={`animate-reveal-up ${
                    i % 3 === 1 ? 'lg:translate-y-6' : i % 3 === 2 ? 'lg:-translate-y-3' : ''
                  }`} 
                  style={{ animationDelay: `${(i % 4) * 0.08}s` }}
                >
                  <ProductCard
                    product={product}
                    onAddToCart={onAddToCart}
                    onView={onViewProduct}
                    addingId={addingId}
                  />
                </div>
              ))
          }
        </div>

        {!loading && filtered.length === 0 && (
          <div className="py-24 text-center border border-black/5 bg-[#ffffff] p-6 asymmetric-frame">
            <p className="font-cormorant text-2xl text-black/40 italic">This selection is currently out of stock.</p>
          </div>
        )}
      </section>
      
    </div>
  )
}
