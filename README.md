# 🎨 Virtual Product Studio – 3D Interactive Demo

A modern, fully-featured **educational e-commerce demo** showcasing interactive 3D product visualization, comparison tools, shopping cart, and AR preview. Built with React, Three.js, and Tailwind CSS.
[Live Demo](https://sage-meerkat-d9d62d.netlify.app/).

> ⚠️ **Educational Demo Only** – This is a demonstration project. No real payments, transactions, or data collection occurs.

---

## ✨ Features

### 🎯 Core Functionality
- **Interactive 3D Viewer** – Rotate, zoom, and pan through product models with smooth animations
- **Product Catalog** – Browse electronics with sidebar filtering and search
- **Shopping Cart** – Add/remove products with real-time quantity and pricing
- **Product Comparison** – Compare products in table view or interactive charts (bar & radar)
- **Wishlist** – Save favorite products for later
- **Order History** – View simulated orders and their status

### 🎮 Advanced Features
- **AR Preview** – Overlay 3D products in real-world environments (camera required)
- **Product Reviews** – View ratings and customer feedback
- **Color & Variants** – Customize products with colors and options
- **Mock Checkout** – Simulated checkout flow with confirmation
- **Demo Authentication** – Lightweight account menu with demo login/logout
- **Theme Toggle** – Light/dark mode with persistence

### 🎓 Educational Pages
- **About** – Project overview and tech stack
- **Privacy Policy** – Educational disclaimer
- **Terms & Conditions** – Demo usage terms
- **Contact** – Demo contact form
- **Help & Support** – FAQ and getting started guide
- **Disclaimer** – Clear notice that this is a demonstration

---

## 🛠️ Technology Stack

### Frontend
- **React 18** – Component-based UI
- **TypeScript** – Type safety and better DX
- **Tailwind CSS** – Utility-first styling
- **shadcn/ui** – Pre-built accessible components
- **Framer Motion** – Smooth animations and transitions

### 3D & Visualization
- **Three.js** – 3D graphics library
- **React Three Fiber** – React renderer for Three.js
- **drei** – Helpful Three.js abstractions
- **Recharts** – Data visualization (charts)

### State Management & Routing
- **Zustand** – Lightweight state management (cart, wishlist, compare)
- **React Router** – Client-side navigation
- **React Query** – Data fetching and caching

### UI & Accessibility
- **Sonner** – Toast notifications
- **Lucide React** – Icon library
- **React Hook Form** – Form management

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd virtual-product-studio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── 3d/                      # 3D viewer components
│   │   ├── ProductScene.tsx
│   │   └── ProductModel.tsx
│   ├── AccountSidebar.tsx       # Navigation sidebar with account menu
│   ├── Header.tsx               # Main header with action buttons
│   ├── ProductViewerSection.tsx # Main 3D viewer section
│   ├── ProductSidebar.tsx       # Product catalog sidebar
│   ├── BottomBar.tsx            # Customization & checkout bar
│   ├── CartDrawer.tsx           # Shopping cart
│   ├── CompareModal.tsx         # Product comparison
│   ├── WishlistDrawer.tsx       # Wishlist
│   ├── CheckoutModal.tsx        # Checkout flow (simulated)
│   ├── ARPreview.tsx            # AR viewer
│   ├── ProductRatingBadge.tsx   # Rating display
│   ├── ProductReviews.tsx       # Reviews drawer
│   ├── DemoBanner.tsx           # Educational disclaimer banner
│   ├── PortfolioFooter.tsx      # Footer with portfolio links
│   └── ui/                      # shadcn/ui components
├── pages/
│   ├── Index.tsx                # Main product studio page
│   ├── Privacy.tsx              # Privacy policy
│   ├── Terms.tsx                # Terms & conditions
│   ├── About.tsx                # About project
│   ├── Contact.tsx              # Contact form
│   ├── Disclaimer.tsx           # Demo disclaimer
│   ├── Help.tsx                 # Help & FAQ
│   └── NotFound.tsx             # 404 page
├── hooks/
│   ├── useCartStore.ts          # Cart state
│   ├── useCompareStore.ts       # Comparison state
│   ├── useWishlistStore.ts      # Wishlist state
│   ├── useOrderHistory.ts       # Order history
│   ├── useTheme.ts              # Theme management
│   └── use-mobile.tsx           # Mobile detection
├── data/
│   ├── products.ts              # Mock product data
│   ├── categories.ts            # Product categories & icons
│   └── reviews.ts               # Mock review data
├── types/
│   ├── product.ts               # Product TypeScript types
│   └── category.ts              # Category types
├── lib/
│   └── utils.ts                 # Utility functions
├── index.css                    # Global styles & design tokens
├── App.tsx                      # App router setup
└── main.tsx                     # React entry point
```

---

## 🎮 Usage Guide

### Browsing Products
1. Click products in the left sidebar to select them
2. Use search and filters to find specific products
3. View detailed 3D model by rotating/zooming

### Customizing Products
1. Select colors from the bottom bar
2. Choose variants (size, material, etc.)
3. See price update in real-time

### Shopping Actions
- **Add to Cart** – Add customized product to cart
- **Compare** – Add to comparison, view in table or charts
- **Wishlist** – Save for later
- **AR Preview** – View in your space (requires camera)

### Checkout
1. Click "Checkout" button
2. Fill in demo information
3. Select shipping method
4. Enter payment info (any demo data works)
5. See simulated success confirmation

### Account Menu
1. Click menu icon to open account sidebar
2. Try demo login with any credentials
3. Access settings, privacy policy, contact form

---

## 🎨 Design System

The project uses a **minimalist glassmorphism aesthetic** with:
- **Color Palette**: Dark theme with cyan/blue accents
- **Typography**: Space Grotesk (display) + Inter (body)
- **Components**: Glass-effect panels with backdrop blur
- **Animations**: Smooth Framer Motion transitions

### Customizing Colors
Edit design tokens in `src/index.css`:

```css
:root {
  --primary: 190 95% 40%;        /* Cyan */
  --secondary: 220 20% 16%;      /* Dark blue */
  --accent: 280 70% 55%;         /* Purple */
  /* ... more tokens */
}
```

---

## 📱 Responsive Design

Fully optimized for all devices:
- **Mobile (320px+)** – Sidebar collapses, 3D viewer full-screen
- **Tablet (768px+)** – Sidebar visible, gallery in bottom sheet
- **Desktop (1024px+)** – All features visible, premium layout

Test responsiveness with browser DevTools or different viewports.

---

## ♿ Accessibility

- Semantic HTML (`<header>`, `<main>`, `<nav>`, etc.)
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus states for all buttons
- Color contrast compliance
- Screen reader friendly

---

## 🔒 Security & Privacy

**This is a demo application:**
- ✅ No real data collection
- ✅ No backend servers
- ✅ All data stored locally in browser
- ✅ No third-party tracking
- ✅ No real payment processing

---

## 📊 Mock Data

Products, reviews, and orders use simulated data. To customize:

- **Products**: Edit `src/data/products.ts`
- **Reviews**: Edit `src/data/reviews.ts`
- **Categories**: Edit `src/data/categories.ts`

---

## 🚀 Deployment

### Deploy to Lovable Cloud
1. Click "Publish" in the Lovable editor
2. Review changes and click "Update"
3. Share your live project URL

### Deploy to Other Platforms

**Netlify**
```bash
npm run build
# Deploy the dist/ folder
```

**Vercel**
```bash
npm run build
# Push to GitHub and connect to Vercel
```

**Traditional Server**
```bash
npm run build
# Upload dist/ folder to your hosting
```

---

## 📈 Performance Optimization

- Lazy loading for images
- Memoized React components
- Optimized 3D rendering
- Smooth 60 FPS animations
- Code splitting for routes

---

## 🐛 Known Limitations

- AR Preview requires HTTPS in production
- AR works best in well-lit environments
- Complex 3D models may be slow on low-end devices
- Mobile browsers may have limited 3D performance

---

## 🤝 Contributing

This is an educational demo project. You can:
- Fork and customize for learning
- Use as a template for your own projects
- Share improvements and learnings

---

## 📄 License

This project is provided for educational purposes. Use freely for learning and portfolio demonstration.

---

## 🎓 Learning Resources

This project demonstrates:
- Modern React patterns (hooks, context, custom hooks)
- 3D graphics with Three.js
- Responsive design principles
- State management best practices
- Accessibility standards
- Performance optimization
- Component architecture

---

## 📞 Questions?

Visit the **Help & Support** page in the application for FAQs or use the **Contact** page to reach out.

---

## 🙏 Credits

Built with:
- [React](https://react.dev)
- [Three.js](https://threejs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion)

---

**Happy exploring!** 🚀✨

This project is a showcase of frontend development capabilities. Enjoy the interactive 3D experience!
