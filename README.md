# 🛒 TrueCart

### Shop with Confidence

TrueCart is a modern full-stack e-commerce web application built with **Next.js, React, TypeScript, Tailwind CSS, Redux Toolkit, MongoDB, and Firebase Authentication**.

The project provides a responsive shopping experience with product browsing, search, filtering, sorting, authentication, cart management, and product details.

---

## ✨ Features

- 🏠 Modern responsive homepage
- 🎞️ Dynamic hero product slider
- 🛍️ Product listing and product cards
- 🔎 Product search
- 🏷️ Brand and category filtering
- ⭐ Rating-based filtering
- 💰 Price range filtering
- ↕️ Price sorting — Low to High / High to Low
- 🛒 Add to Cart functionality
- 🔢 Cart quantity management
- 👤 Firebase authentication
- 📦 User orders section
- 📱 Responsive mobile navigation
- 🖼️ Dynamic product images
- 💳 Payment integration support
- 🗄️ MongoDB database
- ⚡ Next.js API routes
- 🎨 Black, white and gray modern UI

---

## 🖥️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Lucide React
- Swiper.js

### State Management

- Redux Toolkit
- React Redux

### Backend

- Next.js API Routes
- Node.js
- Mongoose

### Database

- MongoDB Atlas

### Authentication

- Firebase Authentication

### Other Tools

- Git
- GitHub
- Axios
- Stripe
- Vercel

---

## 📂 Project Structure

```text
truecart-ecommerce/
│
├── public/
│   └── truecart-logo.png
│
├── scripts/
│   └── seed-products.ts
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── products/
│   │   ├── store/
│   │   ├── cart/
│   │   ├── signin/
│   │   ├── orders/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Slider.tsx
│   │   ├── Card.tsx
│   │   └── ...
│   │
│   ├── lib/
│   │   ├── firebase.ts
│   │   ├── utils.ts
│   │   └── interface.ts
│   │
│   ├── models/
│   │   └── Product.ts
│   │
│   └── redux/
│       ├── slice/
│       └── hooks/
│
├── .env.local
├── .gitignore
├── next.config.js
├── package.json
└── README.md
