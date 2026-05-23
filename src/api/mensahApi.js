const BASE_URL = 'https://api-hackathon.codedematrixtech.com'
const MERCHANT_SLUG = 'mensah'

export const PRODUCT_METADATA = {
  'outfit-1': { name: 'The Heritage Boubou Set', brand: 'Mensah Atelier', serial: '01 // KAFTAN', desc: 'A timeless, hand-tailored West African boubou with intricate chest embroidery.' },
  'outfit-2': { name: 'The Sovereign Double Suit', brand: 'Mensah Bespoke', serial: '02 // SUITING', desc: 'Uncompromising premium wool double-breasted suit designed for state affairs.' },
  'outfit-3': { name: 'The Crimson Senator Co-ord', brand: 'Mensah Modern', serial: '03 // SENATOR', desc: 'Sleek crimson red senator set with a clean concealed placket and tapered trousers.' },
  'outfit-4': { name: 'The Emerald Velvet Kaftan', brand: 'Mensah Atelier', serial: '04 // SIGNATURE', desc: 'Plush deep emerald green velvet kaftan, lined with premium silk.' },
  'outfit-5': { name: 'The Sahara Linen Lounge', brand: 'Mensah Leisure', serial: '05 // RESORT', desc: 'Super lightweight, breathable Sahara desert beige linen co-ord.' },
  'outfit-6': { name: 'The Obsidian Dinner Tuxedo', brand: 'Mensah Bespoke', serial: '06 // SUITING', desc: 'Exquisite black wool-cashmere dinner tuxedo with satin shawl lapels.' },
  'outfit-7': { name: 'The Sovereign White Agbada', brand: 'Mensah Atelier', serial: '07 // HERITAGE', desc: 'Grand four-piece white agbada embroidered with silver geometric threadwork.' },
  'outfit-8': { name: 'The Ivory Silk Brocade Suit', brand: 'Mensah Atelier', serial: '08 // SIGNATURE', desc: 'A highly tailored ivory white silk brocade wedding/gala suit jacket.' },
  'outfit-9': { name: 'The Midnight Cashmere Jacket', brand: 'Mensah Bespoke', serial: '09 // BESPOKE', desc: 'Crafted midnight-blue cashmere sports coat with hand-stitched detailing.' },
  'outfit-10': { name: 'Atelier Gold Floral Brooch', brand: 'Mensah Accoutrement', serial: '10 // ACCESSORY', desc: 'Bespoke gold-plated structural floral lapel pin to complete any suit.' },
}

export const api = {
  // Get all products
  getItems: async () => {
    const res = await fetch(`${BASE_URL}/merchants/${MERCHANT_SLUG}/items`)
    if (!res.ok) throw new Error('Failed to fetch products')
    const items = await res.json()
    return items.map(item => {
      const meta = PRODUCT_METADATA[item.id] || { name: item.name, brand: 'Mensah', serial: 'EXCLUSIVE', desc: '' }
      return { ...item, ...meta }
    })
  },

  // Get campaigns
  getCampaigns: async () => {
    const res = await fetch(`${BASE_URL}/merchants/${MERCHANT_SLUG}/campaigns`)
    if (!res.ok) throw new Error('Failed to fetch campaigns')
    return res.json()
  },

  // Create a basket
  // Body: { merchant_id, items: [{ item_id, qty }] }
  createBasket: async (items) => {
    const body = {
      merchant_id: MERCHANT_SLUG,
      items: items.map(i => ({ item_id: i.item_id, qty: i.qty }))
    }
    const res = await fetch(`${BASE_URL}/baskets`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.message || 'Failed to create basket')
    }
    return res.json() // { id }
  },

  // Get basket by ID
  getBasket: async (basketId) => {
    const res = await fetch(`${BASE_URL}/baskets/${basketId}`)
    if (!res.ok) throw new Error('Failed to fetch basket')
    const basket = await res.json()
    if (basket && basket.items) {
      basket.items = basket.items.map(item => {
        const meta = PRODUCT_METADATA[item.item_id] || { name: item.name, brand: 'Mensah', serial: 'EXCLUSIVE' }
        return { ...item, name: meta.name, brand: meta.brand }
      })
    }
    return basket
  },

  // Image URL helper
  imageUrl: (path) => {
    if (!path) return null
    if (path.startsWith('http')) return path
    return `${BASE_URL}${path}`
  },

  // Format price from minor (divide by 100)
  formatPrice: (minor, currency = 'GHS') => {
    const amount = minor / 100
    return `${currency} ${amount.toFixed(2)}`
  },

  MERCHANT_SLUG,
  BASE_URL,
}

export default api
