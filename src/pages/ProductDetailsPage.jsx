import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import SiteShell from '../components/SiteShell'
import SmartBundle from '../components/SmartBundle'
import api from '../api/mensahApi'
import confetti from 'canvas-confetti'

const SIZES = ['S', 'M', 'L', 'XL', 'XXL']

const DETAILS = [
  { label: 'Material', value: 'Premium Woven Fabric' },
  { label: 'Origin', value: 'Accra, Ghana' },
  { label: 'Finishing', value: 'Hand-tailored' },
  { label: 'Care', value: 'Dry Clean Only' },
  { label: 'Lead Time', value: '14 — 21 days' },
  { label: 'Warranty', value: 'Lifetime alterations' },
]

export default function ProductDetailsPage({ basket, products }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [selectedSize, setSelectedSize] = useState('M')
  const [activeImageIdx, setActiveImageIdx] = useState(0)
  const [wishlisted, setWishlisted] = useState(false)
  const [adding, setAdding] = useState(false)

  const product = products?.products?.find(p => p.id === id)

  useEffect(() => {
    if (product) {
      products?.trackView?.(product)
    }
  }, [product?.id])

  if (products?.loading) {
    return (
      <SiteShell basket={basket} products={products} variant="solid">
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-display text-black text-lg italic font-medium mt-4">Loading garment…</p>
        </div>
      </SiteShell>
    )
  }

  if (!product) {
    return (
      <SiteShell basket={basket} products={products} variant="solid">
        <section className="py-24 text-center px-6">
          <span className="font-body text-[#C6A43F] text-[10px] tracking-[0.4em] uppercase block font-semibold mb-6">
            Garment Not Found
          </span>
          <h1 className="font-display text-4xl md:text-5xl text-black font-medium leading-tight mb-6">
            This piece has left the archive.
          </h1>
          <p className="font-cormorant text-xl text-black/60 italic max-w-md mx-auto mb-10">
            The garment you sought is no longer available, or the link has slipped its thread.
          </p>
          <Link
            to="/collection"
            className="inline-block px-10 py-4 bg-black text-white font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black/90 transition-colors"
          >
            Browse the Archive
          </Link>
        </section>
      </SiteShell>
    )
  }

  const images = product.image_urls || []
  const activeImg = images[activeImageIdx] ? api.imageUrl(images[activeImageIdx]) : null
  const formattedPrice = api.formatPrice(product.price_minor, product.currency)
  const related = products.getSuggestions(product, 4)

  const handleAddToCart = async () => {
    setAdding(true)
    await basket.addToCart(product)
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C6A43F', '#F0D060', '#111111', '#ffffff'],
      disableForReducedMotion: true,
      gravity: 0.85,
      ticks: 180,
      shapes: ['circle'],
      scalar: 0.7,
    })
    setAdding(false)
  }

  const handleBuyNow = async () => {
    await basket.addToCart(product)
    navigate('/checkout')
  }

  return (
    <SiteShell basket={basket} products={products} variant="solid">
      {/* Breadcrumbs */}
      <div className="border-b border-black/5 bg-white">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex items-center gap-2 font-body text-[10px] tracking-widest uppercase text-black/40">
          <Link to="/" className="hover:text-black transition-colors">Home</Link>
          <span>/</span>
          <Link to="/collection" className="hover:text-black transition-colors">Collection</Link>
          <span>/</span>
          <span className="text-black/80 truncate max-w-[200px]">{product.name}</span>
        </div>
      </div>

      {/* Product hero */}
      <section className="py-12 md:py-20 border-b border-black/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
          {/* Gallery */}
          <div className="lg:col-span-7">
            <div className="aspect-[3/4] bg-white border border-black/5 flex items-center justify-center p-8 relative overflow-hidden">
              {activeImg ? (
                <img src={activeImg} alt={product.name} className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="font-display text-black/10 text-9xl italic">M</span>
              )}
              <span className="absolute top-5 left-5 font-body text-[9px] text-black/30 tracking-[0.3em] uppercase font-medium">
                {product.serial}
              </span>
              <button
                onClick={() => setWishlisted(!wishlisted)}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center shadow-sm hover:border-black/30 transition-colors"
                aria-label="Toggle wishlist"
              >
                <svg
                  className="w-4 h-4"
                  fill={wishlisted ? '#C6A43F' : 'none'}
                  viewBox="0 0 24 24"
                  stroke={wishlisted ? '#C6A43F' : 'currentColor'}
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
              </button>
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3 mt-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`aspect-square bg-white border p-2 flex items-center justify-center transition-colors ${
                      idx === activeImageIdx ? 'border-black' : 'border-black/10 hover:border-black/30'
                    }`}
                  >
                    <img src={api.imageUrl(img)} alt={`${product.name} view ${idx + 1}`} className="max-w-full max-h-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details panel */}
          <div className="lg:col-span-5 lg:pl-6 lg:sticky lg:top-28 lg:self-start">
            <span className="font-body text-[#C6A43F] text-[10px] tracking-[0.4em] uppercase block font-semibold mb-3">
              {product.brand || 'Mensah Atelier'}
            </span>
            <h1 className="font-display text-3xl md:text-4xl text-black font-medium leading-tight mb-4">
              {product.name}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-2xl font-semibold text-black">{formattedPrice}</span>
              {product.in_stock ? (
                <span className="font-body text-[9px] text-emerald-600 tracking-widest uppercase font-semibold bg-emerald-50 px-2 py-1 border border-emerald-100">
                  In Stock
                </span>
              ) : (
                <span className="font-body text-[9px] text-black/30 tracking-widest uppercase bg-black/5 px-2 py-1">
                  Sold Out
                </span>
              )}
            </div>

            <p className="font-cormorant text-lg text-black/70 italic leading-relaxed border-l-2 border-[#C6A43F] pl-4 mb-8">
              {product.desc || 'A meticulously crafted piece from the Mensah Atelier archive. Each garment is hand-finished to the exact specifications of the discerning gentleman.'}
            </p>

            {/* Size picker */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="font-body text-[9px] text-black/50 tracking-widest uppercase font-semibold">
                  Select Fit Size
                </span>
                <span className="font-body text-[9px] text-[#C6A43F] tracking-wider font-medium">
                  Atelier Size Guide →
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {SIZES.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 font-body text-[10px] font-semibold tracking-wider border transition-all bg-white ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'text-black/70 border-black/10 hover:border-black/40'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={adding || !product.in_stock}
                className="w-full py-4 bg-black text-white font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {adding ? 'Adding to Basket…' : product.in_stock ? `Acquire — Size ${selectedSize}` : 'Currently Unavailable'}
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!product.in_stock}
                className="w-full py-4 border border-black/20 text-black font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-[#C6A43F] hover:border-[#C6A43F] hover:text-black transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Acquire &amp; Checkout
              </button>
            </div>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              {DETAILS.map(detail => (
                <div key={detail.label} className="bg-white border border-black/5 p-3">
                  <span className="font-body text-[8px] text-black/40 tracking-widest uppercase block mb-0.5">
                    {detail.label}
                  </span>
                  <span className="font-body text-[11px] text-black font-medium">{detail.value}</span>
                </div>
              ))}
            </div>

            {/* Pairings */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-body text-[9px] text-black/50 tracking-widest uppercase font-semibold">
                  Complete the Look
                </span>
                <div className="flex-1 h-px bg-black/5" />
              </div>
              <SmartBundle product={product} onAddToCart={basket.addToCart} addingId={null} />
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="py-20 bg-white border-b border-black/5">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="font-body text-[#C6A43F] text-[9px] tracking-[0.4em] uppercase block font-semibold mb-2">
                  From The Same Archive
                </span>
                <h2 className="font-display text-3xl md:text-4xl text-black font-medium">
                  You may also <span className="italic text-[#C6A43F]">find favour with</span>
                </h2>
              </div>
              <Link
                to="/collection"
                className="hidden md:inline font-body text-[10px] text-black/60 hover:text-black tracking-[0.3em] uppercase font-medium transition-colors"
              >
                View Archive →
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(item => {
                const imgUrl = item.image_urls?.[0] ? api.imageUrl(item.image_urls[0]) : null
                return (
                  <Link
                    key={item.id}
                    to={`/product/${item.id}`}
                    className="group"
                  >
                    <div className="aspect-[3/4] bg-[#FAF9F6] border border-black/5 p-4 mb-3 overflow-hidden relative">
                      {imgUrl ? (
                        <img
                          src={imgUrl}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full skeleton" />
                      )}
                    </div>
                    <p className="font-body text-[8px] text-black/30 tracking-[0.25em] uppercase mb-1">
                      {item.brand || 'Mensah'}
                    </p>
                    <h3 className="font-display text-sm text-black font-medium leading-tight truncate group-hover:text-[#C6A43F] transition-colors">
                      {item.name}
                    </h3>
                    <p className="font-body text-[11px] text-black/60 mt-1">
                      {api.formatPrice(item.price_minor, item.currency)}
                    </p>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}
    </SiteShell>
  )
}
