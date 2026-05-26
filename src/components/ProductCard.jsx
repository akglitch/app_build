import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import api from '../api/mensahApi'
import SmartBundle from './SmartBundle'
import confetti from 'canvas-confetti'

// Full-screen product detail modal rendered via portal (outside the card DOM)
function ProductModal({ product, imageUrl, onAddToCart, addingId, onClose }) {
  const isAdding = addingId === product.id
  const [selectedSize, setSelectedSize] = useState('M')
  const [wishlisted, setWishlisted] = useState(false)

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleAddToCart = (e) => {
    e.stopPropagation()
    onAddToCart(product)
    confetti({
      particleCount: 55,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#C6A43F', '#F0D060', '#111111', '#ffffff'],
      disableForReducedMotion: true,
      gravity: 0.85,
      ticks: 180,
      shapes: ['circle'],
      scalar: 0.7
    })
  }

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[9990] transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Panel */}
      <div
        className="fixed inset-0 z-[9995] flex items-center justify-center p-4 sm:p-8"
        onClick={onClose}
      >
        <div
          className="bg-[#FAF9F6] w-full max-w-4xl max-h-[92vh] overflow-hidden shadow-2xl flex flex-col md:flex-row animate-reveal-up"
          onClick={(e) => e.stopPropagation()}
        >

          {/* Left — Large Product Image */}
          <div className="md:w-[45%] flex-shrink-0 bg-white relative overflow-hidden flex items-center justify-center p-8 min-h-[340px] md:min-h-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={product.name}
                className="max-h-[500px] max-w-full object-contain"
              />
            ) : (
              <span className="font-display text-black/10 text-8xl italic">M</span>
            )}

            {/* Serial badge */}
            {product.serial && (
              <span className="absolute top-5 left-5 font-body text-[8px] tracking-[0.25em] uppercase text-black/30 font-medium">
                {product.serial}
              </span>
            )}

            {/* Wishlist */}
            <button
              onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted) }}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white border border-black/10 flex items-center justify-center shadow-sm hover:border-black/30 transition-all"
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

          {/* Right — Details Panel */}
          <div className="md:w-[55%] flex flex-col overflow-y-auto">

            {/* Header */}
            <div className="flex items-start justify-between p-6 pb-4 border-b border-black/5">
              <div>
                <span className="font-body text-[8px] text-[#C6A43F] tracking-[0.3em] uppercase font-semibold block mb-1">
                  {product.brand || 'Mensah Atelier'}
                </span>
                <h2 className="font-display text-xl md:text-2xl text-black font-semibold leading-tight">
                  {product.name}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="ml-4 mt-1 w-8 h-8 flex-shrink-0 flex items-center justify-center border border-black/10 hover:border-black/40 hover:bg-black hover:text-white text-black/40 transition-all text-sm"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">

              {/* Price + Stock */}
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl font-bold text-black">
                  {api.formatPrice(product.price_minor, product.currency)}
                </span>
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

              {/* Editorial description */}
              <div>
                <p className="font-cormorant text-base text-black/70 italic leading-relaxed">
                  {product.desc || 'A meticulously crafted piece from the Mensah Atelier archive. Each garment is hand-finished to the exact specifications of the discerning gentleman.'}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-black/5" />

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-body text-[9px] text-black/50 tracking-widest uppercase font-semibold">
                    Select Fit Size
                  </span>
                  <span className="font-body text-[9px] text-[#C6A43F] tracking-wider font-medium cursor-pointer hover:underline">
                    Atelier Size Guide →
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                    <button
                      key={size}
                      onClick={(e) => { e.stopPropagation(); setSelectedSize(size) }}
                      className={`py-3 font-body text-[10px] font-semibold tracking-wider border transition-all duration-200 ${
                        selectedSize === size
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black/70 border-black/10 hover:border-black/40'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCart}
                disabled={isAdding || !product.in_stock}
                className="w-full py-4 bg-black text-white font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isAdding ? 'Adding to Basket…' : product.in_stock ? `Acquire — Size ${selectedSize}` : 'Currently Unavailable'}
              </button>

              {/* View Full Detail Page link */}
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="block w-full py-3 border border-black/10 text-black/70 font-body text-[10px] tracking-[0.3em] uppercase font-semibold hover:bg-black hover:text-white hover:border-black transition-colors text-center"
              >
                View Full Atelier Page →
              </Link>

              {/* Key details */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Material', value: 'Premium Woven Fabric' },
                  { label: 'Origin', value: 'Accra, Ghana' },
                  { label: 'Finishing', value: 'Hand-tailored' },
                  { label: 'Care', value: 'Dry Clean Only' },
                ].map(detail => (
                  <div key={detail.label} className="bg-white border border-black/5 p-3">
                    <span className="font-body text-[8px] text-black/40 tracking-widest uppercase block mb-0.5">{detail.label}</span>
                    <span className="font-body text-[10px] text-black font-medium">{detail.value}</span>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className="h-px bg-black/5" />

              {/* Smart Bundle / Curated Pairings */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-body text-[9px] text-black/50 tracking-widest uppercase font-semibold">Complete the Look</span>
                  <div className="flex-1 h-px bg-black/5" />
                </div>
                <SmartBundle product={product} onAddToCart={onAddToCart} addingId={addingId} />
              </div>

            </div>
          </div>

        </div>
      </div>
    </>,
    document.body
  )
}

export default function ProductCard({ product, onAddToCart, onView, addingId }) {
  const [showModal, setShowModal] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)
  const isAdding = addingId === product.id

  const imageUrl = product.image_urls?.[0]
    ? api.imageUrl(product.image_urls[0])
    : null

  const handleView = () => {
    onView(product)
    setShowModal(true)
  }

  const handleAddToCart = (e, size = 'M') => {
    e.stopPropagation()
    onAddToCart(product)
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#C6A43F', '#F0D060', '#111111', '#ffffff'],
      disableForReducedMotion: true,
      gravity: 0.9,
      ticks: 150,
      shapes: ['circle'],
      scalar: 0.6
    })
  }

  const handleWishlist = (e) => {
    e.stopPropagation()
    setWishlisted(!wishlisted)
  }

  return (
    <>
      <div
        className="product-card group relative"
        onClick={handleView}
      >
        {/* Image Container */}
        <div className="relative aspect-[1/1.2] bg-[#FAF9F6] border-b border-black/5 overflow-hidden flex items-center justify-center p-6">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="max-h-full max-w-full object-contain card-img"
              loading="lazy"
            />
          ) : (
            <span className="font-display text-black/10 text-6xl italic">M</span>
          )}

          {/* Wishlist icon */}
          <button
            onClick={handleWishlist}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/80 border border-black/5 flex items-center justify-center text-black/40 hover:text-[#C6A43F] transition-all duration-300 z-10 shadow-sm"
          >
            <svg
              className="w-4 h-4 transition-colors"
              fill={wishlisted ? '#C6A43F' : 'none'}
              viewBox="0 0 24 24"
              stroke={wishlisted ? '#C6A43F' : 'currentColor'}
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
          </button>

          {/* Size grid slides up on hover */}
          <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-black/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10 flex flex-col">
            <p className="font-body text-[8px] text-black/40 tracking-widest uppercase text-center pt-2">Select Fit Size</p>
            <div className="grid grid-cols-5 divide-x divide-black/5 border-t border-black/5 mt-1">
              {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button
                  key={size}
                  onClick={(e) => handleAddToCart(e, size)}
                  disabled={!product.in_stock || isAdding}
                  className="py-3 text-[10px] font-body font-semibold text-black/70 hover:bg-black hover:text-white transition-all duration-200"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Serial label */}
          {product.serial && (
            <span className="absolute top-4 left-4 font-body text-[8px] tracking-[0.2em] uppercase text-black/30 font-medium">
              {product.serial}
            </span>
          )}
        </div>

        {/* Card Footer */}
        <div className="p-4 flex justify-between items-start bg-white relative z-0">
          <div className="min-w-0 flex-1 pr-4">
            <span className="font-body text-[8px] text-black/30 tracking-[0.25em] uppercase block mb-1">
              {product.brand || 'MENSAH ATELIER'}
            </span>
            <h3 className="font-display text-xs text-black font-semibold truncate hover:text-[#C6A43F] transition-colors leading-relaxed">
              {product.name}
            </h3>
          </div>

          <div className="text-right flex flex-col items-end flex-shrink-0">
            <p className="font-display text-xs font-semibold text-black">
              {api.formatPrice(product.price_minor, product.currency)}
            </p>
            {product.in_stock ? (
              <span className="font-body text-[7px] text-emerald-600 tracking-widest uppercase mt-1">In Stock</span>
            ) : (
              <span className="font-body text-[7px] text-black/30 tracking-widest uppercase mt-1">Sold Out</span>
            )}
          </div>
        </div>
      </div>

      {/* Full-screen product modal */}
      {showModal && (
        <ProductModal
          product={product}
          imageUrl={imageUrl}
          onAddToCart={onAddToCart}
          addingId={addingId}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
