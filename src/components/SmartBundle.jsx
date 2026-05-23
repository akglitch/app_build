import React, { useContext } from 'react'
import api from '../api/mensahApi'
import { ProductsContext } from '../App'

export default function SmartBundle({ product, onAddToCart, addingId }) {
  const { getSuggestions } = useContext(ProductsContext)
  const suggestions = getSuggestions(product, 2)

  if (!suggestions.length) return (
    <p className="font-body text-[10px] text-black/30 italic">No pairings available at this time.</p>
  )

  return (
    <div className="space-y-3">
      {suggestions.map(item => {
        const imgUrl = item.image_urls?.[0] ? api.imageUrl(item.image_urls[0]) : null
        return (
          <div
            key={item.id}
            className="flex items-center gap-3 bg-white border border-black/5 p-3 hover:border-[#C6A43F]/30 transition-all duration-200"
          >
            {imgUrl ? (
              <img src={imgUrl} alt={item.name} className="w-14 h-16 object-contain bg-[#FAF9F6] border border-black/5 flex-shrink-0" />
            ) : (
              <div className="w-14 h-16 bg-[#FAF9F6] border border-black/5 flex items-center justify-center font-display text-sm text-black/20 italic flex-shrink-0">M</div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-body text-[8px] text-[#C6A43F] tracking-widest uppercase font-semibold block mb-0.5">{item.brand || 'Mensah'}</p>
              <p className="font-display text-xs text-black font-semibold truncate">{item.name}</p>
              <p className="font-body text-[10px] text-black/50 mt-0.5">
                {api.formatPrice(item.price_minor, item.currency)}
              </p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onAddToCart(item) }}
              disabled={addingId === item.id}
              className="flex-shrink-0 w-8 h-8 border border-black/10 text-black/50 hover:bg-black hover:text-white hover:border-black transition-all duration-200 flex items-center justify-center"
            >
              {addingId === item.id ? (
                <svg className="animate-spin w-3 h-3" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              )}
            </button>
          </div>
        )
      })}
    </div>
  )
}
