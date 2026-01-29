'use client'

import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import { useStore } from '@/lib/store'

const accessories = [
  { id: '15', name: 'Leather Collar', price: 29.99, image: '/black-glossy-silicone-furry-feet-paws2_01.jpg', category: 'Accessories' },
  { id: '16', name: 'Silk Blindfold', price: 19.99, image: '/silicone-transparent-hood_01.jpg', category: 'Accessories' },
  { id: '17', name: 'Feather Tickler', price: 15.99, image: '/glossy_silicone_gloves_feet_01.jpg', category: 'Accessories' },
  { id: '18', name: 'Satin Gloves', price: 24.99, image: '/Black-Glossy-Silicone-Furry-Paws-with-Pink-Pads2_01.jpg', category: 'Accessories' }
]

export default function AccessoriesPage() {
  const { addToCart, addToWishlist, wishlist } = useStore()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header currentPage="accessories" />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Premium Accessories</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Complete your fantasy with our luxury accessories collection.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {accessories.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative flex items-center justify-center">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain hover:scale-105 transition-transform bg-white p-2" 
                />
              </div>
              <div className="p-4">
                <div className="text-xs uppercase tracking-wide mb-1 text-pink-500">{product.category}</div>
                <h3 className="font-semibold text-sm mb-2">{product.name}</h3>
                <div className="text-lg font-bold text-pink-600 mb-4">${product.price}</div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.image
                    })}
                    className="flex-1 bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button 
                    onClick={() => addToWishlist(product.id)}
                    className={`p-2 border rounded transition-colors ${
                      wishlist.includes(product.id)
                        ? 'border-pink-500 bg-pink-50 text-pink-500'
                        : 'border-pink-500 text-pink-500 hover:bg-pink-50'
                    }`}
                  >
                    <Heart size={16} className={wishlist.includes(product.id) ? 'fill-current' : ''} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}