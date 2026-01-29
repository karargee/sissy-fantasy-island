'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, ShoppingCart, Star, Minus, Plus, Eye } from 'lucide-react'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  image: string
  images?: string[]
  category: string
  rating?: number
  description?: string
  sizes?: string[]
  colors?: string[]
}

interface QuickViewProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export default function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)

  if (!product) return null

  const images = product.images || [product.image]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.8, opacity: 0, rotateY: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              {/* Image Gallery */}
              <div className="md:w-1/2 relative">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-colors"
                >
                  <X size={20} />
                </button>
                
                <div className="aspect-square bg-gradient-to-br from-pink-100 to-purple-100 relative overflow-hidden">
                  <motion.img
                    key={selectedImage}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Image Navigation */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedImage(index)}
                          className={`w-3 h-3 rounded-full transition-colors ${
                            index === selectedImage ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Thumbnail Strip */}
                {images.length > 1 && (
                  <div className="flex gap-2 p-4 overflow-x-auto">
                    {images.map((img, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                          index === selectedImage ? 'border-pink-500' : 'border-gray-200'
                        }`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </motion.button>
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="md:w-1/2 p-6 overflow-y-auto">
                <div className="text-sm text-pink-500 uppercase tracking-wide mb-2">{product.category}</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h2>
                
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} className={i < product.rating! ? 'fill-current' : ''} />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.rating}/5)</span>
                  </div>
                )}

                <div className="text-3xl font-bold text-pink-600 mb-6">${product.price}</div>

                {/* Description */}
                {product.description && (
                  <p className="text-gray-600 mb-6">{product.description}</p>
                )}

                {/* Size Selection */}
                {product.sizes && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Size</h4>
                    <div className="flex gap-2">
                      {product.sizes.map((size) => (
                        <motion.button
                          key={size}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border rounded-lg transition-colors ${
                            selectedSize === size
                              ? 'border-pink-500 bg-pink-50 text-pink-600'
                              : 'border-gray-300 hover:border-pink-300'
                          }`}
                        >
                          {size}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Selection */}
                {product.colors && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Color</h4>
                    <div className="flex gap-2">
                      {product.colors.map((color) => (
                        <motion.button
                          key={color}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedColor(color)}
                          className={`w-8 h-8 rounded-full border-2 transition-colors ${
                            selectedColor === color ? 'border-pink-500' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color.toLowerCase() }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Quantity</h4>
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-pink-300"
                    >
                      <Minus size={16} />
                    </motion.button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:border-pink-300"
                    >
                      <Plus size={16} />
                    </motion.button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02, boxShadow: "0 10px 30px rgba(236, 72, 153, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:from-pink-600 hover:to-purple-600 transition-all"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 border border-pink-500 text-pink-500 rounded-lg hover:bg-pink-50 transition-colors"
                  >
                    <Heart size={18} />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}