import React, { useState, useEffect } from 'react'
import SiteShell from '../components/SiteShell'
import ProductGrid from '../components/ProductGrid'

export default function CollectionPage({ products, onAddToCart, basket }) {
  const [activeCategory, setActiveCategory] = useState('All')
  const categories = ['All', 'Senator', 'Kaftan', 'Suit', 'Accessories']

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Filter logic based on basic string matching since we don't have explicit category fields in this API
  const filteredProducts = products.products.filter(product => {
    if (activeCategory === 'All') return true

    const searchString = `${product.name} ${product.desc} ${product.brand}`.toLowerCase()

    if (activeCategory === 'Accessories') {
      return searchString.includes('brooch') || searchString.includes('pin') || searchString.includes('accessory') || product.id === 'outfit-10'
    }

    return searchString.includes(activeCategory.toLowerCase())
  })

  return (
    <SiteShell basket={basket} products={products} variant="solid">
      {/* Cinematic Page Header */}
      <div className="relative h-[60vh] min-h-[400px] flex items-center justify-center overflow-hidden border-b border-black/5">
        <img
          src="/images/hero_inspiration.png"
          alt="Mensah Collection Archive"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/50 to-transparent" />

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <span className="font-body text-[10px] text-[#C6A43F] tracking-[0.4em] uppercase block font-semibold mb-6">
            Mensah Atelier
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-black font-medium leading-none mb-6">
            The Complete<br />
            <span className="italic font-light">Archive</span>
          </h1>
          <p className="font-cormorant text-xl text-black/60 italic max-w-xl mx-auto">
            Explore our entire selection of handcrafted garments, tailored to precise specifications for the modern gentleman.
          </p>
        </div>
      </div>

      {/* Sticky Category Filter */}
      <div className="sticky top-[80px] z-30 bg-[#FAF9F6]/90 backdrop-blur-md border-b border-black/5 py-4">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          <div className="flex items-center justify-start md:justify-center gap-8 overflow-x-auto luxury-scroll pb-2 md:pb-0">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`font-body text-[10px] tracking-[0.25em] uppercase font-semibold whitespace-nowrap transition-all duration-300 ${
                  activeCategory === category
                    ? 'text-black border-b border-black pb-1'
                    : 'text-black/40 hover:text-black pb-1 border-b border-transparent'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filtered Product Grid */}
      <div className="mt-12">
        {filteredProducts.length > 0 ? (
          <ProductGrid
            products={filteredProducts}
            loading={products.loading}
            error={products.error}
            onAddToCart={onAddToCart}
            onViewProduct={products.trackView}
          />
        ) : (
          <div className="py-32 text-center">
            <p className="font-cormorant text-2xl text-black/40 italic">
              No garments found in the {activeCategory} category.
            </p>
            <button
              onClick={() => setActiveCategory('All')}
              className="mt-6 font-body text-[10px] text-[#C6A43F] hover:text-[#B5942B] tracking-widest uppercase font-semibold underline"
            >
              Return to All
            </button>
          </div>
        )}
      </div>
    </SiteShell>
  )
}
