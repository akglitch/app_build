import { useState, useEffect } from 'react'
import api from '../api/mensahApi'

const RECENTLY_VIEWED_KEY = 'mensah_recently_viewed'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [campaigns, setCampaigns] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    try { return JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]') }
    catch { return [] }
  })

  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true)
      try {
        const [items, camps] = await Promise.all([
          api.getItems(),
          api.getCampaigns().catch(() => []),
        ])
        setProducts(items)
        setCampaigns(camps)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  const trackView = (product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id)
      const next = [product, ...filtered].slice(0, 5)
      localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(next))
      return next
    })
  }

  // Smart bundle suggestions based on price range
  const getSuggestions = (product, count = 2) => {
    if (!product) return []
    const price = product.price_minor
    const range = price * 0.5 // ±50% price range
    return products
      .filter(p => p.id !== product.id)
      .map(p => ({ ...p, diff: Math.abs(p.price_minor - price) }))
      .sort((a, b) => a.diff - b.diff)
      .slice(0, count)
  }

  return { products, campaigns, loading, error, recentlyViewed, trackView, getSuggestions }
}
