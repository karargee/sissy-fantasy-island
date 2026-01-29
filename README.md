# Sissy Fantasy Island E-commerce Site

A modern e-commerce website built with Next.js, Tailwind CSS, shadcn/ui, and Framer Motion.

## Features

- 🛍️ Product catalog with categories (Toys, Costumes, Accessories)
- 🏰 Dungeon rental booking system
- 🎨 Beautiful animations with Framer Motion
- 📱 Responsive design with Tailwind CSS
- 🎯 Modern UI components with shadcn/ui
- ⚡ Fast performance with Next.js 14

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Homepage
│   ├── toys/           # Toys category
│   ├── costumes/       # Costumes category
│   ├── dungeon/        # Dungeon rental
│   └── accessories/    # Accessories category
├── components/         # Reusable components
│   ├── ui/            # shadcn/ui components
│   ├── Layout.tsx     # Main layout wrapper
│   └── ProductCard.tsx # Product display component
└── lib/               # Utility functions
    └── utils.ts       # Helper functions
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Framer Motion** - Animation library
- **TypeScript** - Type safety
- **Lucide React** - Icon library

## Customization

- Colors and themes can be modified in `tailwind.config.js`
- Component styles are in `components/ui/`
- Global styles are in `app/globals.css`
- Product data is currently hardcoded but can be connected to a CMS or database

## Deployment

The site can be deployed to Vercel, Netlify, or any platform that supports Next.js.

```bash
npm run build
npm start
```