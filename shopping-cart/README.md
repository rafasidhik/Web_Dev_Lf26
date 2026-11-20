# Task 13: Shopping Cart

A modern, responsive e-commerce shopping cart web app built with Next.js App Router, TypeScript, TanStack Query, and Zustand for the μLearn Web Development Challenge.

## Overview

A full-stack e-commerce shopping cart web application built using Next.js App Router, React 19, TypeScript, TanStack Query, and Zustand. Features asynchronous product catalog retrieval from the Fake Store API, client-side caching with 5-minute stale-time management, realistic Indian market retail pricing in Indian Rupees (INR) with deterministic category-tier fallbacks, global cart state management with intelligent duplicate prevention, interactive quantity controls with auto-removal on zero, real-time subtotal and grand total dynamic calculations via Intl.NumberFormat, client-side persistence using Zustand persist middleware with localStorage and schema migration, zero-mismatch SSR hydration safety powered by React 19 useSyncExternalStore, accessible UI controls, and a fully responsive shopping layout.

## Features

- Asynchronous product catalog retrieval from Fake Store API powered by TanStack Query (`["products"]`)
- Client-side server state caching with a 5-minute `staleTime`, background re-fetching controls, and automatic retry handling to eliminate redundant API requests
- Realistic Indian market retail pricing (INR) deterministically assigned per product category and type, with category-based fallback pricing for dynamic items
- Localized Indian currency formatting using native `Intl.NumberFormat` with the `en-IN` locale (`formatPrice`) producing clean retail notation (e.g., ₹299, ₹1,299, ₹74,999)
- Global cart state management powered by Zustand with component-level selective subscriptions to prevent unnecessary re-renders
- Intelligent duplicate prevention incrementing product quantity seamlessly when existing items are added rather than creating duplicate entries
- Interactive quantity adjustment controls with automatic item removal from the cart when quantity reaches zero
- Explicit single-item removal and one-click cart clearing with instantaneous state synchronization across the UI
- Real-time dynamically calculated item counts, item subtotals, and grand total reflecting active cart modifications
- Client-side cart persistence using Zustand `persist` middleware with `localStorage` and defensive schema migration upgrading legacy records
- SSR hydration safety using React 19 `useSyncExternalStore` preventing server-client markup divergence and eliminating hydration mismatch warnings
- Dedicated initial loading state and graceful error handling with a one-click refetch retry button and empty-product messaging
- Strict TypeScript static typing with zero `any` types and full ESLint compliance
- Accessibility considerations including semantic markup, product image `alt` attributes, and descriptive `aria-label` tags on all icon controls
- Fully responsive layout tested across viewports (320px to 1440px) styled with pure modern CSS and custom design tokens

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- TanStack Query
- Zustand
- Fake Store API
- CSS3
- Turbopack

## Getting Started

### Prerequisites

- Modern web browser
- Git
- Node.js & npm

### Installation

```bash
git clone https://github.com/rafasidhik/Web_Dev_Lf26.git
cd Web_Dev_Lf26/shopping-cart
npm install
```

### Run Locally

Start the development server:

```bash
npm run dev
```

Or build and run the production server:

```bash
npm run build
npm run start
```

## Live Demo

[View Project](https://shopping-cart-cartify.vercel.app/)
