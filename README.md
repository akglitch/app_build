# MENSAH — Luxury Tailored Menswear 👔

> **Hackathon Entry** · Track: Mensah (Single)

A state-of-the-art luxury e-commerce experience for **Mensah**, a bespoke tailored menswear brand. Built with React + Vite + Tailwind CSS.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🛍️ **Smart Product Display** | Responsive grid with skeleton loading, price-range filters, and hover glow animations |
| 📢 **Campaign Banner** | Live campaigns from API with auto-rotating messages and fallback luxury copy |
| 🛒 **Smart Basket System** | Real-time API basket creation, localStorage persistence, drawer UI with quantity controls |
| 🎯 **Smart Bundles** | "Complete the Look" — price-range AI pairing on product hover/click |
| 💬 **Dynamic WhatsApp Templates** | 3-tier message templates (standard/premium/VIP) based on cart value |
| 📱 **QR Code Sharing** | Generate QR code for any basket — share your look with friends |
| 🔗 **Shareable Basket URL** | `/basket/:basketId` route loads and displays any basket |
| 💾 **Full Persistence** | Cart survives refresh and browser close via localStorage + API restore |
| 🎉 **Confetti Animation** | Gold confetti burst on every "Add to Cart" |
| 🏆 **Recently Viewed** | Tracks last 5 viewed products, shown in horizontal scroll section |

---

## 🎨 Design System

- **Background**: `#000000` (pure black)
- **Primary Accent**: `#C6A43F` (gold)
- **Secondary Accent**: `#D4AF37` (light gold hover)
- **Fonts**: Playfair Display (headings) + Inter (body)
- **Glassmorphism** nav, smooth transitions (0.3s ease)
- **Mobile-first** responsive grid (2 col → 4 col)

---

## 🚀 Run Locally

```bash
cd app_build
npm install
npm run dev
```

App runs on `http://localhost:5173`

---

## 🔌 API Endpoints Used

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/merchants` | Discover merchant slug |
| `GET` | `/merchants/mensah/items` | Fetch all products |
| `GET` | `/merchants/mensah/campaigns` | Fetch active campaigns |
| `POST` | `/baskets` | Create/update basket |
| `GET` | `/baskets/:id` | Restore basket |

**Base URL**: `https://api-hackathon.codedematrixtech.com`

**Basket Request Format:**
```json
{
  "merchant_id": "mensah",
  "items": [{ "item_id": "outfit-1", "qty": 1 }]
}
```

---

## 📁 Project Structure

```
app_build/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── api/mensahApi.js
    ├── components/
    │   ├── CampaignBanner.jsx
    │   ├── ProductGrid.jsx
    │   ├── ProductCard.jsx
    │   ├── SmartBundle.jsx
    │   ├── CartDrawer.jsx
    │   ├── WhatsAppButton.jsx
    │   └── QRShareCard.jsx
    ├── pages/BasketPage.jsx
    └── hooks/
        ├── useBasket.js
        └── useProducts.js
```

---

## 🏁 Hackathon Details

- **Track**: Mensah (Single)
- **Theme**: Luxury Tailored Menswear
- **Tagline**: *Single & Stylish*
- **Submit at**: https://forms.gle/qHU96yLwdUN7gYQdA

---

## 🛠️ Tech Stack

- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **React Router v6**
- **qrcode.react** — QR code generation
- **canvas-confetti** — Cart add celebration
- **Native Fetch API** — No Axios needed

---

*Built with ❤️ and gold thread for the Mensah Hackathon 2024*
