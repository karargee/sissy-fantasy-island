'use client'

import { motion } from 'framer-motion'
import { Search, Filter, Grid, List, ArrowLeft } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const allProducts = [
  { id: '1', name: 'Pink Satin Dress Set', price: 89.99, image: '/677f2b7845044f8b.webp', category: 'Costumes', rating: 5 },
  { id: '2', name: 'Deluxe Costume Collection', price: 149.99, image: '/75cb3ea7242d5b02.webp', category: 'Costumes', rating: 5 },
  { id: '3', name: 'Sparkly Accessories Kit', price: 59.99, image: '/8f529c75300a9be6.webp', category: 'Costumes', rating: 4 },
  { id: '4', name: 'Premium Costume Experience', price: 299.99, image: '/917db59e89ae9d07.webp', category: 'Costumes', rating: 5 },
  { id: '5', name: 'Premium Vibrating Massager', price: 149.99, image: '/41tUMEw2hyL._AC_SX679_.jpg', category: 'Toys', rating: 5 },
  { id: '6', name: 'Deluxe Training Kit', price: 299.99, image: '/51qiE+X+42L._AC_SL1500_.jpg', category: 'Toys', rating: 4 },
  { id: '7', name: 'Advanced Pleasure Device', price: 189.99, image: '/611b2T1dO4L._AC_SX679_.jpg', category: 'Toys', rating: 5 },
  { id: '8', name: 'Stainless Steel Chastity Cage', price: 79.99, image: '/51ebfKqUzLL._AC_SX679_.jpg', category: 'Chastity', rating: 4 }
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  
  const [searchTerm, setSearchTerm] = useState(query)
  const [filteredProducts, setFilteredProducts] = useState(allProducts)
  const [sortBy, setSortBy] = useState('relevance')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [viewMode, setViewMode] = useState('grid')

  useEffect(() => {
    let filtered = allProducts

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter)
    }

    // Price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
    }

    setFilteredProducts(filtered)
  }, [searchTerm, sortBy, categoryFilter, priceRange])

  const categories = ['all', ...Array.from(new Set(allProducts.map(p => p.category)))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 className="text-3xl font-bold">Search Results</h1>
          {query && <span className="text-gray-500">for "{query}"</span>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="bg-white rounded-lg p-6 h-fit">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            
            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-400" size={16} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Price Range</label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="500"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
              
              <div className="flex items-center gap-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="relevance">Sort by Relevance</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                </select>

                {/* View Mode */}
                <div className="flex border rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-pink-500 text-white' : 'hover:bg-gray-100'}`}
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-pink-500 text-white' : 'hover:bg-gray-100'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                : 'space-y-4'
              }>
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={viewMode === 'grid' 
                      ? 'bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow'
                      : 'bg-white rounded-lg shadow-sm p-4 flex gap-4 hover:shadow-md transition-shadow'
                    }
                  >
                    {viewMode === 'grid' ? (
                      <>
                        <div className="aspect-square bg-pink-100 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover hover:scale-105 transition-transform" 
                          />
                        </div>
                        <div className="p-4">
                          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</div>
                          <h3 className="font-semibold text-sm mb-2">{product.name}</h3>
                          <div className="text-lg font-bold text-pink-600 mb-4">${product.price}</div>
                          <button className="w-full bg-pink-500 text-white py-2 rounded hover:bg-pink-600 transition-colors">
                            Add to Cart
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-20 h-20 object-cover rounded-lg" 
                        />
                        <div className="flex-1">
                          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</div>
                          <h3 className="font-semibold mb-2">{product.name}</h3>
                          <div className="text-lg font-bold text-pink-600">${product.price}</div>
                        </div>
                        <div className="flex items-center">
                          <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors">
                            Add to Cart
                          </button>
                        </div>
                      </>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}