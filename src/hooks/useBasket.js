import { useState, useEffect, useCallback, useRef } from 'react'
import api from '../api/mensahApi'

const BASKET_KEY = 'mensah_basket_id'
const BASKET_ITEMS_KEY = 'mensah_basket_items'

export function useBasket() {
  const [basketId, setBasketId] = useState(() => localStorage.getItem(BASKET_KEY) || null)
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(BASKET_ITEMS_KEY) || '[]')
    } catch { return [] }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [cartCount, setCartCount] = useState(0)
  const [cartBounce, setCartBounce] = useState(false)
  const prevCount = useRef(cartCount)

  // Sync cart count
  useEffect(() => {
    const total = items.reduce((sum, i) => sum + i.qty, 0)
    if (total !== prevCount.current) {
      setCartCount(total)
      if (total > prevCount.current) {
        setCartBounce(true)
        setTimeout(() => setCartBounce(false), 400)
      }
      prevCount.current = total
    }
  }, [items])

  // Persist basket items locally
  useEffect(() => {
    localStorage.setItem(BASKET_ITEMS_KEY, JSON.stringify(items))
  }, [items])

  // Restore basket from API on mount
  useEffect(() => {
    const savedId = localStorage.getItem(BASKET_KEY)
    if (savedId) {
      setBasketId(savedId)
      api.getBasket(savedId)
        .then(basket => {
          if (basket && basket.items) {
            const restored = basket.items.map(i => ({
              item_id: i.item_id,
              name: i.name,
              price_minor: i.price_minor,
              currency: i.currency,
              image_url: i.image_url,
              qty: i.qty,
            }))
            setItems(restored)
          }
        })
        .catch(() => {
          // Basket expired or invalid — use locally cached items
          const cached = localStorage.getItem(BASKET_ITEMS_KEY)
          if (cached) {
            try { setItems(JSON.parse(cached)) } catch {}
          }
        })
    }
  }, [])

  const addToCart = useCallback(async (product) => {
    setLoading(true)
    setError(null)
    try {
      // Merge with existing items
      const existingIndex = items.findIndex(i => i.item_id === product.id)
      let newItems
      if (existingIndex >= 0) {
        newItems = items.map((item, idx) =>
          idx === existingIndex ? { ...item, qty: item.qty + 1 } : item
        )
      } else {
        newItems = [...items, {
          item_id: product.id,
          name: product.name,
          price_minor: product.price_minor,
          currency: product.currency,
          image_url: product.image_urls?.[0] || null,
          qty: 1,
        }]
      }

      // Create new basket with merged items
      const result = await api.createBasket(newItems)
      const newBasketId = result.id
      localStorage.setItem(BASKET_KEY, newBasketId)
      setBasketId(newBasketId)
      setItems(newItems)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [items])

  const removeFromCart = useCallback(async (item_id) => {
    const newItems = items.filter(i => i.item_id !== item_id)
    setItems(newItems)
    if (newItems.length === 0) {
      localStorage.removeItem(BASKET_KEY)
      setBasketId(null)
      return
    }
    try {
      const result = await api.createBasket(newItems)
      localStorage.setItem(BASKET_KEY, result.id)
      setBasketId(result.id)
    } catch {}
  }, [items])

  const updateQty = useCallback(async (item_id, qty) => {
    if (qty <= 0) { removeFromCart(item_id); return }
    const newItems = items.map(i => i.item_id === item_id ? { ...i, qty } : i)
    setItems(newItems)
    try {
      const result = await api.createBasket(newItems)
      localStorage.setItem(BASKET_KEY, result.id)
      setBasketId(result.id)
    } catch {}
  }, [items, removeFromCart])

  const clearCart = useCallback(() => {
    setItems([])
    setBasketId(null)
    localStorage.removeItem(BASKET_KEY)
    localStorage.removeItem(BASKET_ITEMS_KEY)
  }, [])

  const totalMinor = items.reduce((sum, i) => sum + i.price_minor * i.qty, 0)
  const totalGHS = totalMinor / 100

  // WhatsApp message based on cart value
  const getWhatsAppMessage = useCallback(() => {
    const id = basketId || 'N/A'
    const itemLines = items.map(i => {
      const lineTotal = ((i.price_minor * i.qty) / 100).toFixed(2)
      return `•  ${i.name}\n    _×${i.qty}_  ·  *GHS ${lineTotal}*`
    }).join('\n\n')

    const tier = totalGHS > 500
      ? { emoji: '👑', label: 'VIP CURATION', closing: 'Kindly prioritise this acquisition — the atelier awaits your confirmation.' }
      : totalGHS >= 100
      ? { emoji: '👔', label: 'PREMIUM CURATION', closing: 'Ready to finalise payment at your convenience.' }
      : { emoji: '✨', label: 'ATELIER ORDER', closing: 'Please advise on next steps to complete this curation.' }

    return `${tier.emoji}  *MENSAH ATELIER*
━━━━━━━━━━━━━━━━━━━
_${tier.label}_

📋  *Basket Reference*
\`${id}\`

🛍️  *Curated Pieces*
${itemLines}

━━━━━━━━━━━━━━━━━━━
*TOTAL  ·  GHS ${totalGHS.toFixed(2)}*
━━━━━━━━━━━━━━━━━━━

✨  _${tier.closing}_`
  }, [items, totalGHS, basketId])

  return {
    basketId,
    items,
    loading,
    error,
    cartCount,
    cartBounce,
    totalMinor,
    totalGHS,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    getWhatsAppMessage,
  }
}
