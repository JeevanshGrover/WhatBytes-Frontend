# WhatBytes E-Commerce Store

A responsive, feature-packed e-commerce product catalog built with **Next.js 16 (App Router)**, **React 19**, and **Tailwind CSS v4** as part of the WhatBytes frontend assignment.

## Live Demo

https://what-bytes-frontend-green.vercel.app

---

## Assignment Overview

The goal of this assignment is to construct a modern, responsive product listing and e-commerce web application following the reference UI layout and functional specifications provided in the WhatBytes frontend assessment. The application enables users to browse a catalog of products, search and filter items by category and price range, view detailed product information via dynamic routes, manage cart items with client-side state management, and persist shopping cart contents across browser sessions.

---

## Features

- **Responsive Product Listing**: Adaptive grid layout for mobile, tablet, and desktop screens.

- **Product Cards**: Product image, title, price, ratings, and interactive "Add to Cart" actions.

- **Category & Price Filtering**: Filter products by category and price range.

- **Product Search**: Search products by title, category, or brand.

- **URL-Based Filters**: Search and filter states synchronized with URL query parameters.

- **Dynamic Product Pages**: Dynamic `/product/[id]` routes with product details and quantity controls.

- **Shopping Cart**: Add, remove, update quantities, clear items, and manage cart state.

- **Order Summary**: Automatic subtotal, shipping, tax, and total calculations.

- **Empty States**: User-friendly states for no results, empty cart, and invalid products.

- **Cart Persistence**: Cart state automatically saved in browser `localStorage`.

- **Responsive Navigation**: Mobile-friendly filters, sticky header, and adaptive layouts.

---

## Pages / Routes

| Route | Description |
|-------|-------------|
| `/` | Product listing page featuring search header, category/price filter sidebar, and responsive product grid. |
| `/product/[id]` | Dynamic product details page displaying product info, ratings, description, quantity selector, and cart controls. |
| `/cart` | Shopping cart page listing items, quantity update controls, item removal, price summary, and checkout simulation. |

---

## UI Requirements

The interface faithfully follows the assignment design specifications:

- **Header**: Top navigation bar with logo on the left, centered search bar with input clear button, shopping cart icon with a live item counter badge, and user profile avatar.
- **Sidebar Filters**: Filter sidebar with category selection (radio buttons), price range slider ($0 - $1000), quick filter reset button, and a collapsible accordion control for mobile viewports.
- **Product Grid**: Responsive product grid arrangement (3 columns on desktop, 2 on tablet, 1 on mobile).
- **Product Details**: Image preview section on the left, product metadata, pricing, star ratings, description, quantity selector, and Add to Cart action button on the right.
- **Footer**: Navigation section featuring category links, About Us navigation, social media icons (Facebook, Twitter/X, Instagram), and copyright details.

---

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/) & React DOM 19
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/) (`lucide-react`)
- **State Management**: React Context API (`CartContext`, `FilterContext`)
- **Persistence**: Web Storage API (`localStorage`)
- **Language**: JavaScript (ES6+)

---

## Project Structure

```
whatbytes-assessment/
├── app/
│   ├── cart/
│   │   └── page.js          # Shopping cart page
│   ├── product/
│   │   └── [id]/
│   │       └── page.js      # Dynamic product detail page
│   ├── favicon.ico
│   ├── globals.css          # Global Tailwind CSS configuration
│   ├── layout.js           # Root layout wrapping Context Providers, Header, & Footer
│   └── page.js             # Main product catalog listing page
├── components/
│   ├── Footer.js            # Footer with category navigation and social links
│   ├── Header.js            # Sticky navbar with search bar, cart badge, & user profile
│   ├── ProductCard.js       # Product card with image, price, rating, & add-to-cart action
│   ├── ProductGrid.js       # Responsive grid component applying active search/filters
│   ├── QuantitySelector.js  # Plus/minus quantity control component
│   └── Sidebar.js           # Category radio filters and price slider sidebar
├── context/
│   ├── CartContext.js       # Cart state management and localStorage sync
│   └── FilterContext.js     # Search, category, & price filter state synced with URL params
├── data/
│   └── products.js          # Mock catalog product database and categories
├── public/                  # Static assets
├── jsconfig.json            # Module path aliases (@/*)
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies and scripts
└── README.md                # Project documentation
```

---

## Installation & Setup

Follow these steps to set up and run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/JeevanshGrover/WhatBytes-Frontend
cd whatbytes-assessment
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to view the application.

### 4. Build for production

```bash
npm run build
npm run start
```
