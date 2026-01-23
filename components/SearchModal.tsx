'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Search, Star, ShoppingCart, Heart } from 'lucide-react'
import { useStore } from '@/lib/store'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

const mockProducts = [
  { id: '1', name: 'Pink Satin Dress Set', price: 89.99, image: '/677f2b7845044f8b.webp', category: 'Costumes', rating: 5 },
  { id: '2', name: 'Deluxe Costume Collection', price: 149.99, image: '/75cb3ea7242d5b02.webp', category: 'Costumes', rating: 5 },
  { id: '3', name: 'Sparkly Accessories Kit', price: 59.99, image: '/8f529c75300a9be6.webp', category: 'Accessories', rating: 4 },
  { id: '4', name: 'Premium Costume Experience', price: 299.99, image: '/917db59e89ae9d07.webp', category: 'Costumes', rating: 5 },
  { id: '5', name: 'Luxury Lingerie Set', price: 79.99, image: '/677f2b7845044f8b.webp', category: 'Lingerie', rating: 5 },
  { id: '6', name: 'Fantasy Role Play Kit', price: 129.99, image: '/75cb3ea7242d5b02.webp', category: 'Toys', rating: 4 },
]

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<typeof mockProducts>([])
  const [isSearching, setIsSearching] = useState(false)
  const { addToCart, addToWishlist, wishlist } = useStore()

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true)
      const timer = setTimeout(() => {
        const results = mockProducts.filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(searchQuery.toLowerCase())
        )
        setSearchResults(results)
        setIsSearching(false)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleClose = () => {
    setSearchQuery('')
    setSearchResults([])
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20 p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl max-h-[80vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold">Search Products</h2>
                <button
                  onClick={handleClose}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, categories..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  autoFocus
                />
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-96">
              {isSearching ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
                  <span className="ml-3 text-gray-600 dark:text-gray-400">Searching...</span>
                </div>
              ) : searchQuery && searchResults.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-gray-600 dark:text-gray-400">No products found for "{searchQuery}"</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">Try different keywords or browse our categories</p>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
                  </p>
                  {searchResults.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">{product.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{product.category}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={12} className={i < product.rating ? 'fill-current' : ''} />
                            ))}
                          </div>
                          <span className="text-lg font-bold text-pink-600">${product.price}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            addToCart({
                              id: product.id,
                              name: product.name,
                              price: product.price,
                              image: product.image
                            })
                          }}
                          className="bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 transition-colors"
                        >
                          <ShoppingCart size={16} />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => addToWishlist(product.id)}
                          className={`p-2 border rounded-lg transition-colors ${
                            wishlist.includes(product.id)
                              ? 'border-pink-500 bg-pink-50 text-pink-500'
                              : 'border-pink-500 text-pink-500 hover:bg-pink-50'
                          }`}
                        >
                          <Heart size={16} className={wishlist.includes(product.id) ? 'fill-current' : ''} />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-gray-600 dark:text-gray-400">Start typing to search our products</p>
                  <div className="flex flex-wrap justify-center gap-2 mt-4">
                    {['Costumes', 'Toys', 'Accessories', 'Lingerie'].map((category) => (
                      <button
                        key={category}
                        onClick={() => setSearchQuery(category)}
                        className="px-3 py-1 bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-full text-sm hover:bg-pink-200 dark:hover:bg-pink-900/40 transition-colors"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}