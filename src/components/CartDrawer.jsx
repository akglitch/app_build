import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/mensahApi'
import WhatsAppButton from './WhatsAppButton'
import QRShareCard from './QRShareCard'

export default function CartDrawer({ isOpen, onClose, items, basketId, totalGHS, onRemove, onUpdateQty, getWhatsAppMessage, onClear }) {
  const [showQR, setShowQR] = useState(false)

  const tierLabel = totalGHS > 500
    ? { text: 'VIP Curation Order', color: 'text-[#C6A43F] font-semibold', bg: 'bg-[#C6A43F]/5 border-[#C6A43F]/20' }
    : totalGHS >= 100
    ? { text: 'Premium Curation Order', color: 'text-black font-semibold', bg: 'bg-black/[0.02] border-black/10' }
    : { text: 'Standard Atelier Order', color: 'text-black/50', bg: 'bg-black/[0.01] border-black/5' }

  return (
    <>
      {/* Immersive Overlay */}
      <div
        className={`fixed inset-0 bg-white/40 backdrop-blur-sm z-40 transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div
        id="cart-drawer"
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-[#FAF9F6] border-l border-black/10 z-50 flex flex-col transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/5 bg-[#ffffff]">
          <div>
            <h2 className="font-display text-lg text-black font-semibold tracking-wide">Your Selection</h2>
            {basketId && (
              <p className="font-body text-black/40 text-[9px] tracking-widest mt-0.5 uppercase">
                Basket ID: {basketId}
              </p>
            )}
          </div>
          <button
            id="close-cart-btn"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-black/40 hover:text-black border border-black/10 hover:border-black/30 transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {/* Items scroll space */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 py-16 text-center select-none">
              <div className="w-14 h-14 border border-black/5 rounded-full flex items-center justify-center bg-white shadow-sm">
                <svg className="w-6 h-6 text-black/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <p className="font-display text-black/50 text-base italic leading-none">Your basket is empty</p>
              <p className="font-body text-black/30 text-[10px] tracking-wide">Add exquisite pieces from our archive</p>
              <button 
                onClick={onClose} 
                className="btn-luxury mt-2 text-[9px]"
              >
                <span>Browse Collection</span>
              </button>
            </div>
          ) : (
            <>
              {/* Order tier badge */}
              <div className={`flex items-center gap-2 px-3 py-2 border rounded-none ${tierLabel.bg} mb-4 select-none`}>
                <span className="text-[#C6A43F] text-xs">✦</span>
                <span className={`font-body text-[9px] tracking-widest uppercase ${tierLabel.color}`}>{tierLabel.text}</span>
              </div>

              {items.map(item => {
                const imgUrl = item.image_url ? api.imageUrl(item.image_url) : null
                return (
                  <div key={item.item_id} className="flex gap-3 p-3 bg-white border border-black/5 rounded-none hover:border-black/15 transition-all duration-200">
                    {imgUrl ? (
                      <img src={imgUrl} alt={item.name} className="w-16 h-20 object-cover border border-black/5 bg-[#FAF9F6] flex-shrink-0" />
                    ) : (
                      <div className="w-16 h-20 bg-[#FAF9F6] border border-black/5 flex items-center justify-center font-display text-xs text-black/20 italic flex-shrink-0">M</div>
                    )}
                    
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display text-xs text-black font-semibold truncate leading-tight">{item.name}</h3>
                        <p className="font-body text-black/40 text-[10px] mt-1">
                          {api.formatPrice(item.price_minor, item.currency)}
                        </p>
                      </div>

                      {/* Qty controls */}
                      <div className="flex items-center gap-2.5 mt-2">
                        <button
                          onClick={() => onUpdateQty(item.item_id, item.qty - 1)}
                          className="w-5 h-5 border border-black/10 text-black/60 hover:border-black hover:text-black flex items-center justify-center text-xs transition-colors"
                        >−</button>
                        <span className="font-body text-black font-semibold text-xs w-4 text-center">{item.qty}</span>
                        <button
                          onClick={() => onUpdateQty(item.item_id, item.qty + 1)}
                          className="w-5 h-5 border border-black/10 text-black/60 hover:border-black hover:text-black flex items-center justify-center text-xs transition-colors"
                        >+</button>
                        
                        <button
                          onClick={() => onRemove(item.item_id)}
                          className="ml-auto text-black/20 hover:text-red-500 transition-colors"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}

              {/* QR Share Button */}
              <button
                onClick={() => setShowQR(!showQR)}
                className="w-full flex items-center justify-center gap-2 py-2.5 border border-black/10 text-black/50 hover:border-black/30 hover:text-black text-[9px] font-body tracking-widest uppercase transition-colors duration-200 mt-3"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                {showQR ? 'Hide Sharing Desk' : 'Share Selected Outfit'}
              </button>

              {showQR && <QRShareCard basketId={basketId} />}
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-5 py-5 border-t border-black/5 bg-[#ffffff] space-y-4">
            {/* Total */}
            <div className="flex items-center justify-between">
              <span className="font-body text-black/40 text-[10px] tracking-widest uppercase font-semibold">Subtotal</span>
              <span className="font-display text-black font-semibold text-lg">
                GHS {totalGHS.toFixed(2)}
              </span>
            </div>

            <div className="h-px bg-black/5" />

            {/* Checkout */}
            <Link
              to="/checkout"
              onClick={onClose}
              className="w-full block text-center py-3.5 bg-black text-white font-body text-xs tracking-widest uppercase hover:bg-black/90 transition-colors font-semibold"
            >
              Proceed to Checkout
            </Link>

            {/* WhatsApp Checkout Button */}
            <WhatsAppButton getMessage={getWhatsAppMessage} basketId={basketId} />

            {/* Reset */}
            <button
              id="reset-cart-btn"
              onClick={() => { onClear(); setShowQR(false) }}
              className="w-full py-2 text-black/30 hover:text-red-500 font-body text-[9px] tracking-widest uppercase transition-colors"
            >
              Clear Basket Selection
            </button>
          </div>
        )}
      </div>
    </>
  )
}
