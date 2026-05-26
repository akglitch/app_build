import React, { createContext, useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import CampaignBanner from './components/CampaignBanner'
import ProductGrid from './components/ProductGrid'
import CartDrawer from './components/CartDrawer'
import BasketPage from './pages/BasketPage'
import CollectionPage from './pages/CollectionPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import PrivacyPage from './pages/PrivacyPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CheckoutPage from './pages/CheckoutPage'
import NotFoundPage from './pages/NotFoundPage'
import AtelierBookingDrawer from './components/AtelierBookingDrawer'
import MobileNav from './components/MobileNav'
import HeroBanner from './components/HeroBanner'
import { useBasket } from './hooks/useBasket'
import { useProducts } from './hooks/useProducts'
import api from './api/mensahApi'

export const ProductsContext = createContext({ getSuggestions: () => [] })

// Enhanced State-of-the-Art Custom Cursor
function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [cursorType, setCursorType] = useState('') // '', 'hover', 'view', 'book'

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      
      const target = e.target
      const isClickable = target.closest('button, a, input, select, .magnetic')
      const isCard = target.closest('.product-card, .look-slide')
      const isBook = target.closest('.book-trigger')
      
      if (isBook) {
        setCursorType('book')
      } else if (isCard) {
        setCursorType('view')
      } else if (isClickable) {
        setCursorType('hover')
      } else {
        setCursorType('')
      }
    }
    
    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <>
      {/* Background ambient gold glow that follows cursor */}
      <div 
        className="ambient-glow"
        style={{ left: `${position.x}px`, top: `${position.y}px` }}
      />
      {/* Mini cursor dot */}
      <div 
        className="cursor-dot"
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorType !== '' ? 0 : 1})`,
          opacity: cursorType !== '' ? 0 : 1
        }}
      />
      {/* Expanding cursor ring */}
      <div 
        className={`cursor-ring ${
          cursorType === 'view' ? 'active-view' : cursorType === 'book' ? 'active-book' : ''
        }`}
        style={{ 
          left: `${position.x}px`, 
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${cursorType === 'hover' ? 1.4 : 1})`,
          borderColor: cursorType === 'view' ? '#C6A43F' : cursorType === 'book' ? '#111111' : 'rgba(0,0,0,0.15)',
          backgroundColor: cursorType === 'view' ? 'rgba(198,164,63,0.06)' : cursorType === 'book' ? 'rgba(0,0,0,0.03)' : 'transparent'
        }}
      />
    </>
  )
}

function HomePage({ basket, products }) {
  const [cartOpen, setCartOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [addingId, setAddingId] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const navigate = useNavigate()
  
  // Interactive styling board states
  const [selectedMainOutfit, setSelectedMainOutfit] = useState(null)
  const [styleWithBrooch, setStyleWithBrooch] = useState(true)
  const [styleWithSash, setStyleWithSash] = useState(false)

  // Initialize main outfit once products load
  useEffect(() => {
    if (products.products.length > 0 && !selectedMainOutfit) {
      setSelectedMainOutfit(products.products[0])
    }
  }, [products.products, selectedMainOutfit])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleAddToCart = async (product) => {
    setAddingId(product.id)
    await basket.addToCart(product)
    setAddingId(null)
    setCartOpen(true)
  }

  const handleViewProduct = (product) => {
    products.trackView(product)
  }

  const handleStyleBoardAcquire = async () => {
    if (!selectedMainOutfit) return
    setAddingId('style-board')
    
    // Add main outfit
    await basket.addToCart(selectedMainOutfit)
    
    // Add brooch if selected
    if (styleWithBrooch) {
      const brooch = products.products.find(p => p.id === 'outfit-10')
      if (brooch) await basket.addToCart(brooch)
    }

    setAddingId(null)
    setCartOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-black noise">
      <CampaignBanner campaigns={products.campaigns} />

      {/* Modern High-Fashion Navigation */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-black/5 py-4 shadow-sm'
          : 'bg-white/70 backdrop-blur-sm py-5 border-b border-black/5'
      }`}>
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileNavOpen(true)}
            className="md:hidden flex flex-col gap-[5px] justify-center items-start w-8 h-8 magnetic"
            aria-label="Open menu"
          >
            <span className="block w-6 h-px bg-black" />
            <span className="block w-5 h-px bg-black" />
            <span className="block w-6 h-px bg-black" />
          </button>

          {/* Left links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/collection" className="font-body text-[9px] text-black/60 hover:text-black tracking-[0.25em] uppercase transition-colors font-medium magnetic">
              Collection
            </Link>
            <Link to="/about" className="font-body text-[9px] text-black/60 hover:text-black tracking-[0.25em] uppercase transition-colors font-medium magnetic">
              Heritage
            </Link>
            <Link to="/contact" className="font-body text-[9px] text-black/60 hover:text-black tracking-[0.25em] uppercase transition-colors font-medium magnetic">
              Contact
            </Link>
            <button
              onClick={() => setBookingOpen(true)}
              className="font-body text-[9px] text-[#C6A43F] hover:text-[#B5942B] tracking-[0.25em] uppercase transition-colors font-semibold magnetic book-trigger"
            >
              Atelier Appointment
            </button>
          </div>

          {/* Centered Logo */}
          <Link to="/" className="flex flex-col items-center magnetic relative">
            <span className="font-display text-2xl tracking-[0.25em] uppercase text-black font-semibold">
              MENSAH
            </span>
            <span className="font-cormorant italic text-[#C6A43F] text-[10px] tracking-[0.08em] mt-0.5 font-medium">
              Single & Stylish
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setBookingOpen(true)}
              className="font-body text-[9px] text-black/60 hover:text-black tracking-[0.2em] uppercase transition-colors font-medium magnetic hidden sm:block book-trigger"
            >
              Consultation
            </button>
            <button 
              onClick={() => setCartOpen(true)}
              className="magnetic flex items-center gap-2.5 group relative"
            >
              <span className="font-body text-[9px] text-black/80 group-hover:text-black tracking-[0.2em] uppercase transition-colors font-medium hidden xs:block">
                Basket
              </span>
              <div className="relative">
                <svg className="w-4.5 h-4.5 text-black/80 group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {basket.cartCount > 0 && (
                  <span className={`absolute -top-1.5 -right-1.5 w-3.5 h-3.5 bg-black text-[#ffffff] font-body text-[8px] font-bold rounded-full flex items-center justify-center ${basket.cartBounce ? 'badge-bounce' : ''}`}>
                    {basket.cartCount}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════
         HERO BANNER — rotating featured-look carousel
         ═══════════════════════════════════ */}
      <HeroBanner onOpenBooking={() => setBookingOpen(true)} />

      {/* ═══════════════════════════════════
         INTERACTIVE "COMPLETE THE LOOK" STYLING BOARD (New Feature)
         ═══════════════════════════════════ */}
      <section id="style-board-section" className="py-24 border-b border-black/5 bg-[#ffffff] relative z-10">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12">
          
          <div className="text-center mb-16 select-none">
            <span className="font-body text-[#C6A43F] text-[8px] tracking-[0.4em] uppercase block mb-2 font-semibold">Virtual Fitting Room</span>
            <h2 className="font-display text-4xl md:text-5xl text-black font-medium leading-none">
              Complete the <span className="italic font-normal text-[#C6A43F]">Luxury Look</span>
            </h2>
            <div className="w-16 h-px bg-black/10 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Box: Custom Styling Choices (lg:col-span-4) */}
            <div className="lg:col-span-4 space-y-6 text-left">
              <h3 className="font-display text-xl text-black font-semibold">Select Base Silhouette</h3>
              
              <div className="space-y-3">
                {products.products.slice(0, 4).map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedMainOutfit(item)}
                    className={`p-3.5 border transition-all duration-200 cursor-pointer flex items-center justify-between bg-[#FAF9F6] ${
                      selectedMainOutfit?.id === item.id ? 'border-black bg-black/[0.01]' : 'border-black/5 hover:border-black/20'
                    }`}
                  >
                    <div>
                      <p className="font-body text-[8px] text-[#C6A43F] tracking-widest uppercase block font-semibold">{item.serial}</p>
                      <p className="font-display text-xs text-black font-medium mt-0.5">{item.name}</p>
                    </div>
                    <span className="font-display text-xs font-semibold text-black">
                      {api.formatPrice(item.price_minor, item.currency)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Accoutrements Options */}
              <div className="pt-4 border-t border-black/5 space-y-4">
                <h4 className="font-body text-[9px] text-black/50 tracking-widest uppercase font-semibold">Select Curated Pairings</h4>
                
                {/* Accessory 1: Floral Brooch (Outfit 10) */}
                <div 
                  onClick={() => setStyleWithBrooch(!styleWithBrooch)}
                  className="flex items-center gap-4 cursor-pointer select-none"
                >
                  <div className={`w-4 h-4 border border-black/30 flex items-center justify-center transition-colors ${styleWithBrooch ? 'bg-black border-black' : 'bg-white'}`}>
                    {styleWithBrooch && <span className="text-white text-[9px]">✕</span>}
                  </div>
                  <div>
                    <span className="font-display text-xs font-medium text-black">Bespoke Gold Floral Brooch</span>
                    <span className="font-body text-[9px] text-[#C6A43F] block font-medium">+ GHS 350.00</span>
                  </div>
                </div>

                {/* Accessory 2: Premium Silk Pocket Square */}
                <div 
                  onClick={() => setStyleWithSash(!styleWithSash)}
                  className="flex items-center gap-4 cursor-pointer select-none"
                >
                  <div className={`w-4 h-4 border border-black/30 flex items-center justify-center transition-colors ${styleWithSash ? 'bg-black border-black' : 'bg-white'}`}>
                    {styleWithSash && <span className="text-white text-[9px]">✕</span>}
                  </div>
                  <div>
                    <span className="font-display text-xs font-medium text-black">Heritage Silk Sash Accent</span>
                    <span className="font-body text-[9px] text-[#C6A43F] block font-medium">+ GHS 120.00 (In-Store Curation)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Box: The Interactive Preview Mannequin (lg:col-span-5) */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="w-full max-w-sm aspect-[1/1.2] bg-[#FAF9F6] border border-black/5 p-8 relative flex flex-col justify-center items-center asymmetric-frame select-none">
                
                {/* Mannequin Silhouette Background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                  <svg className="h-[90%]" viewBox="0 0 100 200" fill="currentColor">
                    <path d="M50 15c4 0 7-3 7-7s-3-7-7-7-7 3-7 7 3 7 7 7zm15 35c-2-3-6-5-10-5h-10c-4 0-8 2-10 5-5 7-10 20-10 30 0 5 4 8 8 8h34c4 0 8-3 8-8 0-10-5-23-10-30zM35 90h30v70H35z" />
                  </svg>
                </div>

                {/* Base Outfit Preview */}
                {selectedMainOutfit && (
                  <div className="text-center space-y-4 relative z-10">
                    <p className="font-body text-[9px] text-[#C6A43F] tracking-[0.25em] uppercase font-semibold">Active Look Configuration</p>
                    
                    <div className="w-40 h-48 bg-white border border-black/5 p-2 shadow-sm mx-auto flex items-center justify-center">
                      <img 
                        src={selectedMainOutfit.image_urls?.[0] ? api.imageUrl(selectedMainOutfit.image_urls[0]) : ''} 
                        alt="Preview Outfits" 
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-display text-sm font-semibold text-black leading-tight">{selectedMainOutfit.name}</h4>
                      <p className="font-cormorant text-xs text-black/50 italic">Mastered tailoring fit</p>
                    </div>
                  </div>
                )}

                {/* Layered Accoutrements indicators */}
                <div className="absolute top-4 left-4 flex flex-col gap-1 text-left">
                  <span className="font-body text-[8px] text-black/30 tracking-widest uppercase">Layering accents:</span>
                  {styleWithBrooch && <span className="font-body text-[9px] text-[#C6A43F] font-semibold">✦ Gold Floral Brooch</span>}
                  {styleWithSash && <span className="font-body text-[9px] text-black/60 font-semibold">✦ Silk Sash Accent</span>}
                </div>
              </div>
            </div>

            {/* Right Box: The Curated Bill Summary (lg:col-span-3) */}
            <div className="lg:col-span-3 space-y-6 text-left border-l border-black/5 pl-8">
              <span className="font-body text-[8px] text-black/40 tracking-widest uppercase block font-medium">Bespoke Curation Bill</span>
              <h3 className="font-display text-lg text-black font-semibold leading-tight">Curated Look Summary</h3>

              <div className="space-y-3 pt-2 text-xs font-body">
                {selectedMainOutfit && (
                  <div className="flex justify-between items-center text-black/70">
                    <span>Base Outfit</span>
                    <span className="font-semibold text-black">{api.formatPrice(selectedMainOutfit.price_minor, selectedMainOutfit.currency)}</span>
                  </div>
                )}
                
                {styleWithBrooch && (
                  <div className="flex justify-between items-center text-black/70">
                    <span>Gold Floral Brooch</span>
                    <span className="font-semibold text-black">GHS 350.00</span>
                  </div>
                )}

                {styleWithSash && (
                  <div className="flex justify-between items-center text-black/70">
                    <span>Silk Sash Accent</span>
                    <span className="font-semibold text-[#C6A43F]">Complimentary</span>
                  </div>
                )}
              </div>

              <div className="h-px bg-black/10 my-4" />

              {/* Curated Total */}
              <div className="flex justify-between items-end">
                <span className="font-body text-[10px] text-black/40 tracking-widest uppercase font-semibold">Bespoke Total</span>
                <span className="font-display text-xl font-bold text-black leading-none">
                  {selectedMainOutfit && api.formatPrice(
                    selectedMainOutfit.price_minor + (styleWithBrooch ? 35000 : 0),
                    selectedMainOutfit.currency
                  )}
                </span>
              </div>

              <button
                onClick={handleStyleBoardAcquire}
                disabled={addingId === 'style-board'}
                className="w-full py-4 bg-black text-white font-body text-xs tracking-widest uppercase hover:bg-black/90 transition-colors mt-6 font-semibold"
              >
                {addingId === 'style-board' ? 'Acquiring...' : 'Acquire Styled Suit'}
              </button>

              <p className="font-body text-[8px] text-black/40 tracking-wide text-center leading-relaxed">
                *Includes handpicked alignment session at our Accra atelier or digital fit coordination support.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Arrivals Section */}
      <section className="py-16 md:py-32 bg-[#FAF9F6] border-t border-black/5">
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 text-center">
          <span className="font-body text-[9px] text-black/40 tracking-widest uppercase block font-medium mb-4">
            Curated Selection
          </span>
          <h2 className="font-display text-3xl md:text-4xl text-black font-semibold mb-8 md:mb-16">
            Featured Arrivals
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-left">
            {products.products.slice(0, 4).map(item => {
              const imgUrl = item.image_urls?.[0] ? api.imageUrl(item.image_urls[0]) : null
              return (
                <div key={item.id} className="group cursor-pointer magnetic" onClick={() => navigate(`/product/${item.id}`)}>
                  <div className="aspect-[3/4] bg-white border border-black/5 p-4 mb-4 overflow-hidden relative">
                    {imgUrl ? (
                      <img src={imgUrl} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="w-full h-full skeleton" />
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  </div>
                  <h3 className="font-display text-sm text-black font-medium truncate">{item.name}</h3>
                  <p className="font-body text-[10px] text-black/50 mt-1">{api.formatPrice(item.price_minor, item.currency)}</p>
                </div>
              )
            })}
          </div>

          <div className="mt-16 text-center">
            <Link 
              to="/collection" 
              className="inline-block border border-black/20 px-8 py-4 font-body text-[10px] tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300"
            >
              View Full Archive
            </Link>
          </div>
        </div>
      </section>

      {/* Atelier Process Section */}
      <section className="py-0 bg-black text-white">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {(() => {
            const processProduct = products.products[2] || products.products[0]
            const processImgUrl = processProduct?.image_urls?.[0] ? api.imageUrl(processProduct.image_urls[0]) : null
            return (
              <div className="aspect-[4/5] sm:aspect-square md:aspect-auto h-[400px] sm:h-[500px] md:h-auto md:min-h-[600px] relative overflow-hidden bg-[#111]">
                {processImgUrl ? (
                  <img 
                    src={processImgUrl} 
                    alt="Tailoring Process - African Heritage" 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 object-top md:object-center"
                  />
                ) : (
                  <div className="absolute inset-0 w-full h-full skeleton opacity-20" />
                )}
              </div>
            )
          })()}
          <div className="flex flex-col justify-center p-8 sm:p-12 md:p-16 lg:p-32 text-left">
            <span className="font-body text-[9px] text-white/50 tracking-[0.4em] uppercase block font-semibold mb-4 md:mb-6">
              The Heritage
            </span>
            <h2 className="font-display text-3xl md:text-5xl font-medium leading-[1.2] mb-8">
              Constructed with <span className="text-[#C6A43F] italic">Precision</span>
            </h2>
            <p className="font-body text-sm text-white/70 leading-relaxed mb-10 max-w-md">
              Every Mensah garment is a testament to the art of bespoke tailoring. We source the finest lightweight linens and woven fabrics, crafting each piece to harmonize with the gentleman's natural silhouette. From the initial measurement to the final stitch, our process is unhurried, meticulous, and entirely personal.
            </p>
            <div className="flex items-center gap-6">
              <button 
                onClick={() => setBookingOpen(true)}
                className="border border-white/20 px-8 py-4 font-body text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-300 book-trigger"
              >
                Book A Fitting
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* High-Fashion Light-Themed Footer */}
      <footer className="bg-[#ffffff] pt-24 pb-12 px-6 md:px-12 border-t border-black/5 relative z-10 text-left select-none">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <h2 className="font-display text-4xl text-black font-semibold tracking-wider mb-5">MENSAH.</h2>
              <p className="font-cormorant text-xl text-black/50 italic mb-8 max-w-sm">
                "Style transcends simple clothing. We construct physical poetry tailored to a gentleman's presence."
              </p>
              <div className="flex gap-6">
                {['Instagram', 'Twitter', 'Pinterest'].map(social => (
                  <a key={social} href="#" className="font-body text-[9px] text-black/40 hover:text-black tracking-[0.2em] uppercase font-semibold transition-colors magnetic">
                    {social}
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-body text-[9px] text-black/50 tracking-[0.25em] uppercase mb-6 font-semibold">Atelier Curation</h4>
              <ul className="space-y-3 font-body text-xs text-black/50 font-medium">
                <li><Link to="/collection" className="hover:text-black transition-colors">The complete Archive</Link></li>
                <li><Link to="/about" className="hover:text-black transition-colors">Our Heritage</Link></li>
                <li><button onClick={() => setBookingOpen(true)} className="hover:text-black transition-colors book-trigger">Atelier fitting scheduler</button></li>
                <li><a href="#style-board-section" className="hover:text-black transition-colors">Digital Styling Dresser</a></li>
                <li><Link to="/checkout" className="hover:text-black transition-colors">Curation Checkout</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-body text-[9px] text-black/50 tracking-[0.25em] uppercase mb-6 font-semibold">Atelier Locations</h4>
              <p className="font-body text-xs text-black/50 leading-relaxed font-medium mb-3">
                Accra Flagship Atelier<br />
                Osu Neighborhood, Accra, Ghana<br />
                Bookings: virtual & physical fittings.
              </p>
              <Link to="/contact" className="font-body text-[9px] text-[#C6A43F] hover:text-[#B5942B] tracking-[0.2em] uppercase font-semibold transition-colors">
                Reach the Atelier →
              </Link>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-black/5">
            <p className="font-body text-[8px] text-black/30 tracking-[0.15em] uppercase mb-4 md:mb-0">
              © {new Date().getFullYear()} Mensah Atelier. Designed for the discerning gentleman.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="font-body text-[8px] text-black/30 hover:text-black tracking-[0.15em] uppercase transition-colors font-medium">
                Privacy policy
              </Link>
              <Link to="/about" className="font-body text-[8px] text-black/30 hover:text-black tracking-[0.15em] uppercase transition-colors font-medium">
                Terms of fitting service
              </Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Side Drawer */}
      <CartDrawer 
        isOpen={cartOpen} 
        onClose={() => setCartOpen(false)}
        items={basket.items}
        basketId={basket.basketId}
        totalGHS={basket.totalGHS}
        onRemove={basket.removeFromCart}
        onUpdateQty={basket.updateQty}
        getWhatsAppMessage={basket.getWhatsAppMessage}
        onClear={basket.clearCart}
      />

      {/* Atelier Consultation Booking Drawer */}
      <AtelierBookingDrawer
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      {/* Mobile Navigation Drawer */}
      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        onOpenBooking={() => setBookingOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        basket={basket}
      />
    </div>
  )
}

export default function App() {
  const basket = useBasket()
  const products = useProducts()

  return (
    <ProductsContext.Provider value={{ getSuggestions: products.getSuggestions }}>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage basket={basket} products={products} />} />
        <Route path="/collection" element={<CollectionPage products={products} onAddToCart={basket.addToCart} basket={basket} />} />
        <Route path="/product/:id" element={<ProductDetailsPage basket={basket} products={products} />} />
        <Route path="/checkout" element={<CheckoutPage basket={basket} products={products} />} />
        <Route path="/about" element={<AboutPage basket={basket} products={products} />} />
        <Route path="/contact" element={<ContactPage basket={basket} products={products} />} />
        <Route path="/privacy" element={<PrivacyPage basket={basket} products={products} />} />
        <Route path="/basket/:basketId" element={<BasketPage />} />
        <Route path="*" element={<NotFoundPage basket={basket} products={products} />} />
      </Routes>
    </ProductsContext.Provider>
  )
}
