'use client'

import { motion } from 'framer-motion'
import { Heart, ShoppingCart, ArrowLeft } from 'lucide-react'
import { useStore } from '@/lib/store'
import Link from 'next/link'

const allProducts = [
  { id: '1', name: 'Pink Satin Dress Set', price: 89.99, image: '/677f2b7845044f8b.webp', category: 'Costumes' },
  { id: '2', name: 'Deluxe Costume Collection', price: 149.99, image: '/75cb3ea7242d5b02.webp', category: 'Costumes' },
  { id: '3', name: 'Sparkly Accessories Kit', price: 59.99, image: '/8f529c75300a9be6.webp', category: 'Costumes' },
  { id: '4', name: 'Premium Costume Experience', price: 299.99, image: '/917db59e89ae9d07.webp', category: 'Costumes' }
]

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useStore()
  
  const wishlistItems = allProducts.filter(product => wishlist.includes(product.id))

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Save items you love for later</p>
          <Link href="/">
            <button className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600">
              Continue Shopping
            </button>
          </Link>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          <span className="text-gray-500">({wishlistItems.length} items)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-pink-100 overflow-hidden relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform" 
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white shadow-sm"
                >
                  <Heart size={16} className="text-pink-500 fill-current" />
                </button>
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</div>
                <h3 className="font-semibold text-sm mb-2">{product.name}</h3>
                <div className="text-lg font-bold text-pink-600 mb-4">${product.price}</div>
                <button 
                  onClick={() => addToCart({
                    id: product.id,
                    name: product.name,
                    price: product.price,
                    image: product.image
                  })}
                  className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}