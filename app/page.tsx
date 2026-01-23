'use client'

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ShoppingCart, Heart, User, Search, Star, Shield, Truck, Award, ChevronRight, Quote, Eye, Menu, X } from 'lucide-react'
import { useState, useEffect, lazy, Suspense } from 'react'
import dynamic from 'next/dynamic'
import { useStore } from '@/lib/store'

const QuickView = dynamic(() => import('@/components/QuickView'), { ssr: false })
const LiveChatBot = dynamic(() => import('@/components/LiveChatBot'), { ssr: false })
const ShoppingCartComponent = dynamic(() => import('@/components/ShoppingCart'), { ssr: false })
const AuthModal = dynamic(() => import('@/components/AuthModal'), { ssr: false })
const SearchModal = dynamic(() => import('@/components/SearchModal'), { ssr: false })
const ThemeToggle = dynamic(() => import('@/components/ThemeToggle'), { ssr: false })
const LoyaltyProgram = dynamic(() => import('@/components/LoyaltyProgram'), { ssr: false })
const CursorTrail = dynamic(() => import('@/components/CursorTrail'), { ssr: false })
const ScrollProgress = dynamic(() => import('@/components/ScrollProgress'), { ssr: false })

const FloatingParticle = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute w-2 h-2 bg-pink-300 rounded-full opacity-30"
    animate={{
      y: [-20, -100],
      x: [0, Math.random() * 100 - 50],
      opacity: [0.3, 0]
    }}
    transition={{
      duration: 3,
      delay,
      repeat: Infinity,
      ease: "easeOut"
    }}
    style={{
      left: `${Math.random() * 100}%`,
      top: '100%'
    }}
  />
)

const testimonials = [
  { name: "Sarah M.", rating: 5, text: "Absolutely amazing quality and discreet shipping. Will definitely order again!" },
  { name: "Alex K.", rating: 5, text: "The costumes are beautiful and fit perfectly. Customer service was excellent." },
  { name: "Jamie L.", rating: 5, text: "Fast delivery and exactly as described. Very happy with my purchase." }
]

const featuredProducts = [
  { 
    id: '1', 
    name: 'Pink Satin Dress Set', 
    price: 89.99, 
    image: '/677f2b7845044f8b.webp', 
    images: ['/677f2b7845044f8b.webp', '/75cb3ea7242d5b02.webp'],
    category: 'Costumes', 
    badge: 'NEW',
    rating: 5,
    description: 'Luxurious pink satin dress with matching accessories. Perfect for special occasions.',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pink', 'Purple', 'Blue']
  },
  { 
    id: '2', 
    name: 'Premium Chastity Device', 
    price: 79.99, 
    image: '/61IXqiIONfL._AC_SX679_.jpg', 
    images: ['/61IXqiIONfL._AC_SX679_.jpg', '/51ebfKqUzLL._AC_SX679_.jpg'],
    category: 'Toys', 
    badge: 'SALE',
    rating: 5,
    description: 'High-quality chastity device made from medical-grade materials.',
    sizes: ['Small', 'Medium', 'Large'],
    colors: ['Clear', 'Black']
  },
  { 
    id: '3', 
    name: 'Vibrating Pleasure Ring', 
    price: 45.99, 
    image: '/611b2T1dO4L._AC_SX679_.jpg', 
    images: ['/611b2T1dO4L._AC_SX679_.jpg', '/41tUMEw2hyL._AC_SX679_.jpg'],
    category: 'Toys', 
    badge: 'POPULAR',
    rating: 4,
    description: 'Premium vibrating ring with multiple intensity levels.',
    sizes: ['One Size'],
    colors: ['Black', 'Purple']
  },
  { 
    id: '4', 
    name: 'Premium Costume Experience', 
    price: 299.99, 
    image: '/917db59e89ae9d07.webp', 
    images: ['/917db59e89ae9d07.webp', '/677f2b7845044f8b.webp'],
    category: 'Costumes', 
    badge: 'LUXURY',
    rating: 5,
    description: 'Ultimate luxury costume experience with handcrafted details and premium fabrics.',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Burgundy', 'Navy', 'Emerald']
  }
]

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [quickViewProduct, setQuickViewProduct] = useState<any>(null)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [showSearchModal, setShowSearchModal] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  const { cart, setCartOpen, addToCart, addToWishlist, wishlist, user, addToRecentlyViewed } = useStore()
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const videos = [
    '/video.webm',
    '/Gush211.mp4', 
    '/a866c64953a4481092365c6e7e3a670b.webm',
    '/acc21c25df5e46efb53ba92f73c68551.webm',
    '/d4d50da4f0144ee6921fa1af6b5874ad.webm',
    '/e57d8ead2174488e829386b02c3c1b75.mp4'
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Rotate videos every 10 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videos.length)
    }, 10000)
    return () => clearInterval(timer)
  }, [videos.length])



  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 overflow-hidden">
      {/* Interactive Components */}
      <CursorTrail />
      <ScrollProgress />
      <LiveChatBot />
      <ShoppingCartComponent />
      <QuickView 
        product={quickViewProduct} 
        isOpen={!!quickViewProduct} 
        onClose={() => setQuickViewProduct(null)} 
      />
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
      <SearchModal 
        isOpen={showSearchModal} 
        onClose={() => setShowSearchModal(false)} 
      />


      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <FloatingParticle key={i} delay={i * 0.5} />
        ))}
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-lg"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
            >
              Sissy Fantasy Island
            </motion.div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {['Toys', 'Costumes', 'Accessories', 'Dungeon Rental'].map((item, i) => (
                <motion.div key={item} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                  <Link href={`/${item.toLowerCase().replace(' rental', '').replace(' ', '-')}`} className="hover:text-pink-500 transition-colors relative group">
                    {item}
                    <motion.div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300" />
                  </Link>
                </motion.div>
              ))}
            </nav>
            
            {/* Desktop Icons */}
            <div className="hidden md:flex items-center space-x-4">
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={() => setShowSearchModal(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <Search size={20} />
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={() => {
                  console.log('Wishlist clicked', wishlist)
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {wishlist.length}
                  </motion.span>
                )}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={() => setCartOpen(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative"
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={() => setShowAuthModal(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <User size={20} />
              </motion.button>
              <ThemeToggle />
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <motion.button 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.95 }} 
                onClick={() => setCartOpen(true)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative"
              >
                <ShoppingCart size={20} />
                {cartItemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-xs"
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.button>
            </div>
          </div>
          
          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-2 pb-2 border-t border-gray-200 dark:border-gray-700"
              >
                <div className="flex flex-col space-y-2 pt-2">
                  {['Toys', 'Costumes', 'Accessories', 'Dungeon Rental'].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link 
                        href={`/${item.toLowerCase().replace(' rental', '').replace(' ', '-')}`} 
                        className="block py-2 px-3 text-sm hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item}
                      </Link>
                    </motion.div>
                  ))}
                  
                  <div className="flex items-center justify-around pt-2 border-t border-gray-200 dark:border-gray-700">
                    <motion.button 
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.95 }} 
                      onClick={() => {
                        setShowSearchModal(true)
                        setMobileMenuOpen(false)
                      }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <Search size={18} />
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.95 }} 
                      onClick={() => {
                        console.log('Wishlist clicked', wishlist)
                        setMobileMenuOpen(false)
                      }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative"
                    >
                      <Heart size={18} />
                      {wishlist.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                          {wishlist.length}
                        </span>
                      )}
                    </motion.button>
                    <motion.button 
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.95 }} 
                      onClick={() => {
                        user ? null : setShowAuthModal(true)
                        setMobileMenuOpen(false)
                      }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <User size={18} />
                    </motion.button>
                    <ThemeToggle />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* User Dashboard */}
      {user && (
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-8 bg-white dark:bg-gray-800"
        >
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold">Welcome back, {user.name}!</h2>
                  <p className="text-gray-600 dark:text-gray-300">Continue your fantasy journey</p>
                </div>
              </div>
              <LoyaltyProgram />
            </div>
          </div>
        </motion.section>
      )}

      {/* Hero Section with Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.video
            key={currentVideo}
            style={{ y, opacity }}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 0.3, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 2 }}
            autoPlay
            muted
            loop
            playsInline
            webkit-playsinline="true"
            preload="metadata"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover object-center sm:object-cover"
            src={videos[currentVideo]}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-600/20" />
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-3xl md:text-5xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"
          >
            Welcome to Your Fantasy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-8"
          >
            Discover premium toys, costumes, and experiences in complete discretion
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex justify-center"
          >
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(236, 72, 153, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-500 text-white px-8 py-4 rounded-lg text-lg hover:bg-pink-600 transition-all duration-300 shadow-lg flex items-center gap-2"
            >
              Shop Now <ChevronRight size={20} />
            </motion.button>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Indicators */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-white/50 backdrop-blur-sm"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: "100% Discreet", desc: "Private packaging" },
              { icon: Truck, title: "Free Shipping", desc: "Orders over $50" },
              { icon: Award, title: "Premium Quality", desc: "Luxury materials" },
              { icon: Star, title: "5-Star Rated", desc: "1000+ reviews" }
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center p-6 rounded-lg bg-white/80 backdrop-blur-sm shadow-lg"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mb-4"
                >
                  <item.icon className="w-6 h-6 text-pink-500" />
                </motion.div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Categories with 3D Effects */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 bg-gradient-to-b from-white to-pink-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
          >
            Shop by Category
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Toys', href: '/toys', image: '/61IXqiIONfL._AC_SX679_.jpg' },
              { name: 'Costumes', href: '/costumes', image: '/silicone-catsuit_01.jpg' },
              { name: 'Dungeon Rental', href: '/dungeon', image: '/Slut-Me-Out-How-to-Use-a-Sex-Dungeon-8.jpg' }
            ].map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 50, rotateY: -30 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8, ease: "easeOut" }}
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)"
                }}
                className="group cursor-pointer perspective-1000"
              >
                <Link href={category.href}>
                  <div className="relative aspect-square rounded-2xl overflow-hidden shadow-xl">
                    <motion.img
                      src={category.image}
                      alt={category.name}
                      className="absolute inset-0 w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-500"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 + 0.3 }}
                        className="text-2xl font-bold text-center drop-shadow-lg mb-4"
                      >
                        {category.name}
                      </motion.h3>
                      <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.2 + 0.5 }}
                        className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        Explore Collection
                      </motion.div>
                    </div>
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20"
                    />
                    <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ChevronRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Featured Products with Advanced Animations */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="py-20 bg-gradient-to-b from-pink-50 to-purple-50"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
          >
            Featured Products
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 50, rotateX: -20 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                  whileHover={{ 
                    y: -10, 
                    rotateX: 5,
                    boxShadow: "0 25px 50px rgba(0,0,0,0.15)"
                  }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden group relative"
                >
                  <Link href={`/product/${product.id}`}>
                    <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 overflow-hidden relative">
                      <motion.div
                        className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white z-10 ${
                          product.badge === 'NEW' ? 'bg-green-500' :
                          product.badge === 'POPULAR' ? 'bg-orange-500' :
                          product.badge === 'SALE' ? 'bg-red-500' : 'bg-purple-500'
                        }`}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: index * 0.1 + 0.3, type: "spring" }}
                      >
                        {product.badge}
                      </motion.div>
                      
                      {/* Quick View Button */}
                      <motion.button
                        initial={{ opacity: 0, scale: 0 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        onClick={(e) => {
                          e.preventDefault()
                          setQuickViewProduct(product)
                        }}
                        className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors z-10"
                      >
                        <Eye size={16} className="text-gray-700" />
                      </motion.button>
                      
                      <motion.img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                      />
                      <motion.div 
                        className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </Link>
                  <motion.div 
                    className="p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.4 }}
                  >
                    <div className="text-xs text-pink-500 uppercase tracking-wide mb-2 font-semibold">{product.category}</div>
                    <Link href={`/product/${product.id}`}>
                      <h3 className="font-bold text-gray-900 mb-3 group-hover:text-pink-600 transition-colors cursor-pointer">{product.name}</h3>
                    </Link>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-2xl font-bold text-pink-600">${product.price}</div>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.5 + i * 0.1 }}
                          >
                            <Star size={16} className={i < product.rating ? 'fill-current' : ''} />
                          </motion.div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <motion.button 
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(236, 72, 153, 0.3)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image
                          })
                          addToRecentlyViewed(product.id)
                        }}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <ShoppingCart size={18} /> Add to Cart
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => addToWishlist(product.id)}
                        className={`p-3 border rounded-lg transition-colors ${
                          wishlist.includes(product.id)
                            ? 'border-pink-500 bg-pink-50 text-pink-500'
                            : 'border-pink-500 text-pink-500 hover:bg-pink-50'
                        }`}
                      >
                        <Heart size={18} className={wishlist.includes(product.id) ? 'fill-current' : ''} />
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Carousel */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
          >
            What Our Customers Say
          </motion.h2>
          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 100, rotateY: 90 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                exit={{ opacity: 0, x: -100, rotateY: -90 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 text-center shadow-xl"
              >
                <Quote className="w-12 h-12 text-pink-400 mx-auto mb-6" />
                <p className="text-xl text-gray-700 mb-6 italic">"{testimonials[currentTestimonial].text}"</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="font-semibold text-gray-900">- {testimonials[currentTestimonial].name}</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i === currentTestimonial ? 'bg-pink-500' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Newsletter Signup */}
      <motion.section 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="text-4xl font-bold mb-6"
            >
              Stay Updated with Exclusive Offers
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl mb-8 opacity-90"
            >
              Get 15% off your first order and be the first to know about new arrivals
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input 
                type="email" 
                id="newsletter-email"
                placeholder="Enter your email" 
                className="flex-1 px-6 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255,255,255,0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={async () => {
                  const input = document.getElementById('newsletter-email') as HTMLInputElement
                  const email = input?.value
                  if (!email) return
                  
                  try {
                    const res = await fetch('/api/newsletter', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ email })
                    })
                    const data = await res.json()
                    if (data.success) {
                      alert('✅ Subscribed! Check your email for 15% off code.')
                      input.value = ''
                    } else {
                      alert('❌ ' + (data.error || 'Failed to subscribe'))
                    }
                  } catch (error) {
                    alert('❌ Failed to subscribe. Please try again.')
                  }
                }}
                className="bg-white text-pink-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Subscribe
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-gray-900 text-white py-16"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Sissy Fantasy Island
              </h3>
              <p className="text-gray-400 mb-4">Your premier destination for fantasy fulfillment with complete discretion and luxury quality.</p>
              <div className="flex space-x-4">
                {['📘', '📷', '🐦', '📺'].map((icon, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors"
                  >
                    {icon}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            {[
              { title: "Categories", items: ["Toys", "Costumes", "Dungeon Rental", "Services"] },
              { title: "Support", items: ["Contact", "Shipping", "Returns", "Privacy"] },
              { title: "Legal", items: ["Terms", "FAQ", "Size Guide"] }
            ].map((section, i) => (
              <motion.div 
                key={section.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (i + 2) * 0.1 }}
              >
                <h4 className="font-semibold mb-4 text-lg">{section.title}</h4>
                <ul className="space-y-2">
                  {section.items.map((item, j) => (
                    <motion.li key={item} whileHover={{ x: 5 }}>
                      <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="text-gray-400 hover:text-pink-400 transition-colors">{item}</Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400"
          >
            <p>&copy; 2024 Sissy Fantasy Island. All rights reserved. | Discreet shipping worldwide</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  )
}