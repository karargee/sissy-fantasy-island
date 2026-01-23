'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ShoppingCart, Heart, User, Search, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '@/lib/store'

interface HeaderProps {
  currentPage?: string
}

export default function Header({ currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { cart, wishlist, setCartOpen } = useStore()
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  const navItems = [
    { name: 'Toys', href: '/toys' },
    { name: 'Costumes', href: '/costumes' },
    { name: 'Dungeon Rental', href: '/dungeon' }
  ]

  return (
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
            <Link href="/">Sissy Fantasy Island</Link>
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, i) => (
              <motion.div key={item.name} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link 
                  href={item.href} 
                  className={`hover:text-pink-500 transition-colors relative group ${
                    currentPage === item.name.toLowerCase().replace(' rental', '') ? 'text-pink-500 font-semibold' : ''
                  }`}
                >
                  {item.name}
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
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <Search size={20} />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.1 }} 
              whileTap={{ scale: 0.95 }} 
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
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            >
              <User size={20} />
            </motion.button>
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
              className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col space-y-4 pt-4">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Link 
                      href={item.href} 
                      className={`block py-2 px-4 text-lg hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 rounded-lg transition-colors ${
                        currentPage === item.name.toLowerCase().replace(' rental', '') ? 'text-pink-500 font-semibold bg-pink-50' : ''
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <div className="flex items-center justify-around pt-4 border-t border-gray-200 dark:border-gray-700">
                  <motion.button 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <Search size={20} />
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors relative"
                  >
                    <Heart size={20} />
                    {wishlist.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                  </motion.button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }} 
                    whileTap={{ scale: 0.95 }} 
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <User size={20} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}