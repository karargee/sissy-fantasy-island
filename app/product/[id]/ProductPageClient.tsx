'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { Star, Heart, ShoppingCart, Minus, Plus, Share2, Shield, Truck, RotateCcw, Check, ArrowLeft } from 'lucide-react'
import { getProductById, getRelatedProducts } from '@/lib/products'
import { useStore } from '@/lib/store'

export default function ProductPageClient() {
  const params = useParams()
  const productId = params.id as string
  const product = getProductById(productId)
  const relatedProducts = product ? getRelatedProducts(productId, product.category) : []
  
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [showReviews, setShowReviews] = useState(false)
  
  const { addToCart, addToWishlist, wishlist, addToRecentlyViewed } = useStore()

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id)
      setSelectedSize(product.sizes?.[0] || '')
      setSelectedColor(product.colors?.[0] || '')
    }
  }, [product, addToRecentlyViewed])

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/" className="text-pink-500 hover:text-pink-600 flex items-center justify-center gap-2">
            <ArrowLeft size={20} /> Return to Home
          </Link>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    })
  }

  const averageRating = product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Sissy Fantasy Island
            </Link>
            <Link href="/" className="text-pink-500 hover:text-pink-600 flex items-center gap-2">
              <ArrowLeft size={20} /> Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-6">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-pink-500">Home</Link>
          <span>/</span>
          <Link href={`/${product.category.toLowerCase()}`} className="hover:text-pink-500">{product.category}</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div 
              className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
            >
              <img 
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-bold text-white ${
                  product.badge === 'NEW' ? 'bg-green-500' :
                  product.badge === 'POPULAR' ? 'bg-orange-500' :
                  product.badge === 'SALE' ? 'bg-red-500' : 'bg-purple-500'
                }`}>
                  {product.badge}
                </div>
              )}
              <button className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors">
                <Share2 size={20} className="text-gray-700" />
              </button>
            </motion.div>
            
            {/* Image Thumbnails */}
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-pink-500' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="text-sm text-pink-500 uppercase tracking-wide font-semibold mb-2">{product.category}</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={20} className={i < Math.floor(averageRating) ? 'fill-current' : ''} />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviewCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-3 mb-6">
                <span className="text-3xl font-bold text-pink-600">${product.price}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-sm font-semibold">
                      Save ${(product.originalPrice - product.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <Check size={16} className="text-green-500" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            {product.sizes && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Size: {selectedSize}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border rounded-lg font-medium ${
                        selectedSize === size
                          ? 'border-pink-500 bg-pink-50 text-pink-600'
                          : 'border-gray-300 text-gray-700 hover:border-pink-300'
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
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Color: {selectedColor}</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border rounded-lg font-medium ${
                        selectedColor === color
                          ? 'border-pink-500 bg-pink-50 text-pink-600'
                          : 'border-gray-300 text-gray-700 hover:border-pink-300'
                      }`}
                    >
                      {color}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart */}
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-4 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-600 transition-all flex items-center justify-center space-x-2"
              >
                <ShoppingCart size={20} />
                <span>Add to Cart</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => addToWishlist(product.id)}
                className={`p-4 border rounded-lg transition-colors ${
                  wishlist.includes(product.id)
                    ? 'border-pink-500 bg-pink-50 text-pink-500'
                    : 'border-gray-300 text-gray-700 hover:border-pink-300'
                }`}
              >
                <Heart size={20} className={wishlist.includes(product.id) ? 'fill-current' : ''} />
              </motion.button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Shield className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Secure Payment</div>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">Free Shipping</div>
              </div>
              <div className="text-center">
                <RotateCcw className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                <div className="text-sm font-medium text-gray-900">30-Day Returns</div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setShowReviews(false)}
              className={`px-6 py-3 font-medium ${
                !showReviews ? 'border-b-2 border-pink-500 text-pink-600' : 'text-gray-600'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setShowReviews(true)}
              className={`px-6 py-3 font-medium ${
                showReviews ? 'border-b-2 border-pink-500 text-pink-600' : 'text-gray-600'
              }`}
            >
              Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="py-8">
            {!showReviews ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-medium text-gray-900">{key}</span>
                    <span className="text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {product.reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                          <span className="text-pink-600 font-semibold">{review.userName[0]}</span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{review.userName}</div>
                          <div className="text-sm text-gray-500">{review.date}</div>
                        </div>
                      </div>
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={16} className={i < review.rating ? 'fill-current' : ''} />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                    {review.verified && (
                      <div className="mt-2 text-sm text-green-600 flex items-center space-x-1">
                        <Check size={14} />
                        <span>Verified Purchase</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}