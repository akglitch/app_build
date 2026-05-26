import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import CampaignBanner from './CampaignBanner'
import CartDrawer from './CartDrawer'
import AtelierBookingDrawer from './AtelierBookingDrawer'

export default function SiteShell({ basket, products, children, variant = 'default' }) {
  const [cartOpen, setCartOpen] = useState(false)
  const [bookingOpen, setBookingOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-black noise flex flex-col">
      <CampaignBanner campaigns={products?.campaigns || []} />

      <Navigation
        basket={basket}
        onOpenCart={() => setCartOpen(true)}
        onOpenBooking={() => setBookingOpen(true)}
        variant={variant}
      />

      <main className="flex-1 pt-24">{children}</main>

      <Footer onOpenBooking={() => setBookingOpen(true)} />

      {basket && (
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
      )}

      <AtelierBookingDrawer
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </div>
  )
}
