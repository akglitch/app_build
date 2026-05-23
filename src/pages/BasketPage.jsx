import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { QRCodeSVG } from 'qrcode.react'
import api from '../api/mensahApi'

export default function BasketPage() {
  const { basketId } = useParams()
  const [basket, setBasket] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!basketId) return
    api.getBasket(basketId)
      .then(setBasket)
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [basketId])

  const shareUrl = `${window.location.origin}/basket/${basketId}`

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="font-display text-black text-lg italic font-medium">Securing Curation…</p>
        </div>
      </div>
    )
  }

  if (error || !basket) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-sm p-8 bg-white border border-black/10 asymmetric-frame">
          <div className="w-14 h-14 border border-black/10 rounded-full flex items-center justify-center mx-auto bg-[#FAF9F6]">
            <svg className="w-6 h-6 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="font-display text-black text-2xl font-medium">Selection Expired</h1>
          <p className="font-body text-black/40 text-xs">This curated basket may have expired, or the sharing link is no longer valid.</p>
          <Link to="/" className="btn-luxury text-[9px] mt-4">
            <span>Browse Collection</span>
          </Link>
        </div>
      </div>
    )
  }

  const totalGHS = basket.total_minor / 100

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-black noise">
      {/* Header */}
      <div className="border-b border-black/5 bg-[#ffffff] px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl text-black tracking-widest hover:text-[#C6A43F] transition-colors font-semibold">
          MENSAH
        </Link>
        <span className="font-body text-black/40 text-[9px] tracking-widest uppercase font-medium">Shared Look</span>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Title */}
        <div className="text-center mb-12">
          <p className="font-body text-[#C6A43F] text-[9px] tracking-[0.4em] uppercase mb-3 font-semibold">Curated Look</p>
          <h1 className="font-display text-3xl text-black font-semibold mb-3">A Gentleman's Selection</h1>
          <div className="h-px bg-black/10 max-w-xs mx-auto" />
          <p className="font-body text-black/40 text-[9px] tracking-wider uppercase mt-4">Basket ID: {basketId}</p>
        </div>

        {/* Items */}
        <div className="space-y-4 mb-8">
          {basket.items.map(item => {
            const imgUrl = item.image_url ? api.imageUrl(item.image_url) : null
            return (
              <div key={item.item_id} className="flex gap-4 p-4 bg-white border border-black/5 rounded-none hover:border-[#C6A43F]/20 transition-all duration-200">
                {imgUrl ? (
                  <img src={imgUrl} alt={item.name} className="w-20 h-24 object-cover border border-black/5 bg-[#FAF9F6] flex-shrink-0" />
                ) : (
                  <div className="w-20 h-24 bg-[#FAF9F6] border border-black/5 flex items-center justify-center font-display text-xs text-black/20 italic flex-shrink-0">M</div>
                )}
                <div className="flex-1 min-w-0 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-display text-black font-semibold text-base truncate leading-tight">{item.name}</h3>
                    <p className="font-body text-black/40 text-xs mt-1">
                      {api.formatPrice(item.price_minor, item.currency)} × {item.qty}
                    </p>
                  </div>
                  <p className="font-body text-[#C6A43F] text-sm font-semibold mt-2">
                    Subtotal: {api.formatPrice(item.price_minor * item.qty, item.currency)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Total */}
        <div className="flex items-center justify-between px-5 py-4 bg-white border border-black/10 rounded-none mb-8 shadow-sm">
          <span className="font-body text-black/50 uppercase tracking-widest text-[10px] font-semibold">Total Curation Bill</span>
          <span className="font-display text-black text-2xl font-bold">GHS {totalGHS.toFixed(2)}</span>
        </div>

        {/* QR Code */}
        <div className="text-center mb-10 select-none">
          <p className="font-body text-black/40 text-[9px] tracking-widest uppercase mb-4 font-semibold">Scan to view on mobile device</p>
          <div className="inline-block p-3.5 bg-white border border-black/10 rounded-none shadow-sm">
            <QRCodeSVG value={shareUrl} size={130} bgColor="#ffffff" fgColor="#000000" level="M" />
          </div>
        </div>

        {/* CTA */}
        <div className="space-y-3">
          <Link
            to="/"
            className="w-full flex items-center justify-center btn-luxury text-center"
          >
            <span>Shop the Full Archive</span>
          </Link>
          
          <button
            onClick={() => {
              const msg = `👔 Shared Curation Checkout - Basket ID: ${basketId}. Total: GHS ${totalGHS.toFixed(2)}. Please confirm my order details.`
              window.open(`https://wa.me/233209742331?text=${encodeURIComponent(msg)}`, '_blank')
            }}
            className="w-full flex items-center justify-center gap-3 py-3.5 font-body font-semibold text-xs tracking-widest uppercase text-white transition-all duration-300"
            style={{ background: 'linear-gradient(135deg, #25D366 0%, #128C7E 100%)' }}
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
            Order via WhatsApp
          </button>
        </div>
      </div>
    </div>
  )
}
