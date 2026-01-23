'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Star, Check, Minus } from 'lucide-react'
import { useStore } from '@/lib/store'

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating: number
  category: string
  features: string[]
  sizes?: string[]
  colors?: string[]
}

interface ProductComparisonProps {
  isOpen: boolean
  onClose: () => void
  products: Product[]
}

export default function ProductComparison({ isOpen, onClose, products }: ProductComparisonProps) {
  const { compareList, removeFromCompare, clearCompare, addToCart } = useStore()

  const compareProducts = products.filter(p => compareList.includes(p.id))

  const allFeatures = Array.from(
    new Set(compareProducts.flatMap(p => p.features || []))
  )

  const hasFeature = (product: Product, feature: string) => {
    return product.features?.includes(feature) || false
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold">Compare Products ({compareProducts.length})</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={clearCompare}
                  className="text-red-600 hover:text-red-700 px-3 py-1 text-sm"
                >
                  Clear All
                </button>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <X size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-x-auto">
              {compareProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg mb-4">No products to compare</p>
                  <p className="text-gray-400">Add products to comparison from product pages</p>
                </div>
              ) : (
                <div className="min-w-full">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left p-4 w-48">Product</th>
                        {compareProducts.map((product) => (
                          <th key={product.id} className="p-4 min-w-64">
                            <div className="relative">
                              <button
                                onClick={() => removeFromCompare(product.id)}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                              >
                                <X size={12} />
                              </button>
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-48 object-cover rounded-lg mb-3"
                              />
                              <h3 className="font-bold text-sm mb-2">{product.name}</h3>
                              <div className="text-2xl font-bold text-pink-600 mb-2">
                                ${product.price}
                              </div>
                              <div className="flex items-center justify-center mb-3">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < product.rating
                                        ? 'text-yellow-400 fill-current'
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                                <span className="ml-1 text-sm text-gray-600">
                                  ({product.rating})
                                </span>
                              </div>
                              <button
                                onClick={() => addToCart({
                                  id: product.id,
                                  name: product.name,
                                  price: product.price,
                                  image: product.image
                                })}
                                className="w-full bg-pink-500 text-white py-2 rounded-lg text-sm hover:bg-pink-600 transition-colors"
                              >
                                Add to Cart
                              </button>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-4 font-semibold">Category</td>
                        {compareProducts.map((product) => (
                          <td key={product.id} className="p-4 text-center">
                            {product.category}
                          </td>
                        ))}
                      </tr>
                      
                      {compareProducts.some(p => p.sizes) && (
                        <tr className="border-t bg-gray-50 dark:bg-gray-700">
                          <td className="p-4 font-semibold">Available Sizes</td>
                          {compareProducts.map((product) => (
                            <td key={product.id} className="p-4 text-center">
                              {product.sizes ? (
                                <div className="flex flex-wrap gap-1 justify-center">
                                  {product.sizes.map((size) => (
                                    <span
                                      key={size}
                                      className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs"
                                    >
                                      {size}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      )}

                      {compareProducts.some(p => p.colors) && (
                        <tr className="border-t">
                          <td className="p-4 font-semibold">Available Colors</td>
                          {compareProducts.map((product) => (
                            <td key={product.id} className="p-4 text-center">
                              {product.colors ? (
                                <div className="flex flex-wrap gap-1 justify-center">
                                  {product.colors.map((color) => (
                                    <span
                                      key={color}
                                      className="px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded text-xs"
                                    >
                                      {color}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      )}

                      {allFeatures.length > 0 && (
                        <>
                          <tr className="border-t">
                            <td colSpan={compareProducts.length + 1} className="p-4 font-bold text-lg bg-pink-50 dark:bg-pink-900/20">
                              Features
                            </td>
                          </tr>
                          {allFeatures.map((feature, index) => (
                            <tr key={feature} className={`border-t ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''}`}>
                              <td className="p-4 font-medium">{feature}</td>
                              {compareProducts.map((product) => (
                                <td key={product.id} className="p-4 text-center">
                                  {hasFeature(product, feature) ? (
                                    <Check className="w-5 h-5 text-green-500 mx-auto" />
                                  ) : (
                                    <Minus className="w-5 h-5 text-gray-400 mx-auto" />
                                  )}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}