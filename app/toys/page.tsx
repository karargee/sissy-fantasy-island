'use client'

import { motion } from 'framer-motion'
import { Heart, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'
import { useStore } from '@/lib/store'
import { products } from '@/lib/products'
import { useState } from 'react'

const toys = products.filter(product => product.category === 'Toys' || product.category === 'Chastity')

export default function ToysPage() {
  const { addToCart, addToWishlist, wishlist } = useStore()
  const [activeFilter, setActiveFilter] = useState('All')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [sortBy, setSortBy] = useState('featured')

  let filteredToys = activeFilter === 'All' ? toys : toys.filter(toy => {
    if (activeFilter === 'Toys') return toy.category === 'Toys'
    if (activeFilter === 'Chastity') return toy.category === 'Chastity'
    return true
  })

  filteredToys = filteredToys.filter(toy => toy.price >= priceRange[0] && toy.price <= priceRange[1])

  if (sortBy === 'price-low') filteredToys.sort((a, b) => a.price - b.price)
  if (sortBy === 'price-high') filteredToys.sort((a, b) => b.price - a.price)
  if (sortBy === 'name') filteredToys.sort((a, b) => a.name.localeCompare(b.name))

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header currentPage="toys" />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Premium Toys</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated collection of high-quality toys and chastity devices designed for your ultimate satisfaction.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex gap-4 p-1 bg-gray-100 rounded-lg">
            <button 
              onClick={() => setActiveFilter('All')}
              className={`px-4 py-2 rounded-md ${
                activeFilter === 'All' ? 'bg-pink-500 text-white' : 'hover:bg-pink-100'
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setActiveFilter('Toys')}
              className={`px-4 py-2 rounded-md ${
                activeFilter === 'Toys' ? 'bg-pink-500 text-white' : 'hover:bg-pink-100'
              }`}
            >
              Toys
            </button>
            <button 
              onClick={() => setActiveFilter('Chastity')}
              className={`px-4 py-2 rounded-md ${
                activeFilter === 'Chastity' ? 'bg-pink-500 text-white' : 'hover:bg-pink-100'
              }`}
            >
              Chastity
            </button>
          </div>

          <div className="flex gap-4 items-center">
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={20} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border rounded-lg"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm">Max: ${priceRange[1]}</span>
              <input
                type="range"
                min="0"
                max="500"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                className="w-32"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredToys.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <Link href={`/product/${product.id}`}>
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative flex items-center justify-center cursor-pointer">
                  {product.badge && (
                    <div className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 rounded text-xs font-semibold z-10">
                      {product.badge}
                    </div>
                  )}
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-full h-full object-contain hover:scale-105 transition-transform bg-white p-2" 
                  />
                </div>
              </Link>
              <div className="p-4">
                <div className={`text-xs uppercase tracking-wide mb-1 ${
                  product.category === 'Chastity' ? 'text-purple-500' : 'text-pink-500'
                }`}>{product.category}</div>
                <Link href={`/product/${product.id}`}>
                  <h3 className="font-semibold text-sm mb-2 hover:text-pink-600 cursor-pointer">{product.name}</h3>
                </Link>
                <div className="text-lg font-bold text-pink-600 mb-4">${product.price}</div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => addToCart({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.images[0]
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