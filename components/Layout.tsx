'use client'

import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { ShoppingCart, Heart, User, Menu, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import CartDrawer from '@/components/ecommerce/CartDrawer'

export default function Layout({ children }: { children: React.ReactNode }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll()
  const headerY = useTransform(scrollYProgress, [0, 0.1], [0, -100])
  const headerOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const { state } = useCart()
  const { wishlist } = useWishlist()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <motion.header 
        style={{ y: headerY, opacity: headerOpacity }}
        className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ 
                  scale: 1.05,
                  rotate: [0, -2, 2, 0],
                  transition: { duration: 0.3 }
                }}
                className="flex items-center space-x-2"
              >
                <img src="/logo.svg" alt="Sissy Fantasy Island" className="h-8 w-auto" />
                <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent hidden sm:block">
                  Sissy Fantasy Island
                </span>
              </motion.div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-8">
              {['Toys', 'Costumes', 'Dungeon Rental', 'Accessories'].map((item, index) => (
                <motion.div
                  key={item}
                  whileHover={{ y: -2, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link 
                    href={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="hover:text-pink-500 transition-colors relative"
                  >
                    <motion.span
                      whileHover={{
                        textShadow: "0 0 8px rgba(236, 72, 153, 0.5)"
                      }}
                    >
                      {item}
                    </motion.span>
                    <motion.div
                      className="absolute -bottom-1 left-0 h-0.5 bg-pink-500"
                      initial={{ width: 0 }}
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
              
              <motion.div
                whileHover={{ scale: 1.2, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Button>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.2, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="relative"
                  onClick={() => setIsCartOpen(true)}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {state.itemCount > 0 && (
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                    >
                      {state.itemCount}
                    </motion.span>
                  )}
                </Button>
              </motion.div>
              
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      <main>{children}</main>
      
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <footer className="bg-gray-900 text-white py-12 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            background: [
              "radial-gradient(circle at 0% 0%, #ec4899 0%, transparent 50%)",
              "radial-gradient(circle at 100% 100%, #8b5cf6 0%, transparent 50%)",
              "radial-gradient(circle at 0% 100%, #ec4899 0%, transparent 50%)"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4">Sissy Fantasy Island</h3>
              <p className="text-gray-400">Your premier destination for fantasy fulfillment</p>
            </motion.div>
            
            {[
              { title: 'Categories', links: ['Toys', 'Costumes', 'Dungeon Rental', 'Accessories'] },
              { title: 'Support', links: ['Contact', 'Shipping', 'Returns', 'Privacy'] },
              { title: 'Connect', content: 'Discreet shipping worldwide' }
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <h4 className="font-semibold mb-4">{section.title}</h4>
                {section.links ? (
                  <ul className="space-y-2 text-gray-400">
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={link}
                        whileHover={{ x: 5, color: "#ec4899" }}
                        transition={{ duration: 0.2 }}
                      >
                        <Link href={`#${link.toLowerCase()}`}>{link}</Link>
                      </motion.li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-400">{section.content}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}