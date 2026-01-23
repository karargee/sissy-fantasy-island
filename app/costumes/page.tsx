'use client'

import { motion } from 'framer-motion'
import { Heart, X } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '@/lib/store'
import Header from '@/components/Header'

const costumes = [
  { id: '1', name: 'Pink Satin Dress Set', price: 89.99, image: '/677f2b7845044f8b.webp', category: 'Costumes', isNew: true },
  { id: '2', name: 'French Maid Outfit', price: 129.99, image: '/75cb3ea7242d5b02.webp', category: 'Costumes' },
  { id: '3', name: 'Schoolgirl Uniform', price: 99.99, image: '/8f529c75300a9be6.webp', category: 'Costumes' },
  { id: '4', name: 'Princess Gown', price: 199.99, image: '/917db59e89ae9d07.webp', category: 'Costumes' },
  { id: '5', name: 'Elegant Evening Dress', price: 159.99, image: '/928881209a442461.webp', category: 'Costumes' },
  { id: '6', name: 'Vintage Style Outfit', price: 139.99, image: '/95a16934f7821a27.webp', category: 'Costumes' },
  { id: '7', name: 'Glamour Collection', price: 179.99, image: '/cb17fecf993b1bee.webp', category: 'Costumes' },
  { id: '8', name: 'Fantasy Ensemble', price: 219.99, image: '/e29b8a57eb5669ad.webp', category: 'Costumes' },
  { id: '9', name: 'Deluxe Costume Set', price: 249.99, image: '/e8cf9aa48714ecb8.webp', category: 'Costumes' },
  { id: '10', name: 'Premium Collection', price: 299.99, image: '/ea19f3a04bab1612.webp', category: 'Costumes' },
  { id: '11', name: 'Silicone Catsuit', price: 399.99, image: '/silicone-catsuit_01.jpg', category: 'Dungeon Rentals', isNew: true },
  { id: '12', name: 'Dragon Drone Hood', price: 199.99, image: '/silicone_dragon_drone_hood_01-1.jpg', category: 'Dungeon Rentals' },
  { id: '13', name: 'Puppy Gimp Suit', price: 449.99, image: '/silicone_puppy_gimp_suit_01-11.jpg', category: 'Dungeon Rentals' },
  { id: '14', name: 'Muscle Suit Venom', price: 499.99, image: '/black-glossy-silicone-muscle-suit-venom_01.jpg', category: 'Dungeon Rentals' },
  { id: '15', name: 'Full Face Gas Mask', price: 179.99, image: '/silicone_full_face_gas_mask_a_01.jpg', category: 'Dungeon Rentals' },
  { id: '16', name: 'Furry Paws Set', price: 149.99, image: '/Black-Glossy-Silicone-Furry-Paws-with-Pink-Pads2_01.jpg', category: 'Dungeon Rentals' },
  { id: '17', name: 'Bull Drone Hood', price: 189.99, image: '/silicone_bull_drone_hood_01.jpg', category: 'Dungeon Rentals' },
  { id: '18', name: 'Transparent Hood', price: 129.99, image: '/silicone-transparent-hood_01.jpg', category: 'Dungeon Rentals' }
]

export default function CostumesPage() {
  const [selectedProduct, setSelectedProduct] = useState<typeof costumes[0] | null>(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const { addToCart, addToWishlist, wishlist } = useStore()
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header currentPage="costumes" />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Fantasy Costumes</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform yourself with our exquisite collection of costumes and outfits.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {costumes.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-square bg-pink-100 overflow-hidden relative">
                {product.isNew && (
                  <div className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 rounded text-xs font-semibold z-10">
                    NEW
                  </div>
                )}
                <img src={product.image} alt={product.name} className="w-full h-full object-contain hover:scale-105 transition-transform cursor-pointer" onClick={() => setSelectedProduct(product)} />
              </div>
              <div className="p-4">
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">{product.category}</div>
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

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 border-b flex items-center justify-between">
              <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
              <button onClick={() => setSelectedProduct(null)} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="aspect-square bg-pink-100 rounded-lg overflow-hidden">
                  <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-full object-contain" />
                </div>
                
                <div>
                  <div className="text-xs text-gray-500 uppercase tracking-wide mb-2">{selectedProduct.category}</div>
                  <div className="text-3xl font-bold text-pink-600 mb-4">${selectedProduct.price}</div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">Size</label>
                    <div className="flex flex-wrap gap-2">
                      {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-2 border rounded-lg text-sm ${
                            selectedSize === size
                              ? 'border-pink-500 bg-pink-50 text-pink-600'
                              : 'border-gray-200 hover:border-pink-300'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-2">Color</label>
                    <div className="flex flex-wrap gap-2">
                      {['Pink', 'Black', 'Red', 'Purple', 'White'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-2 border rounded-lg text-sm ${
                            selectedColor === color
                              ? 'border-pink-500 bg-pink-50 text-pink-600'
                              : 'border-gray-200 hover:border-pink-300'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => {
                        addToCart({
                          id: selectedProduct.id,
                          name: selectedProduct.name,
                          price: selectedProduct.price,
                          image: selectedProduct.image
                        })
                        setSelectedProduct(null)
                      }}
                      className="flex-1 bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
                    >
                      Add to Cart
                    </button>
                    <button 
                      onClick={() => addToWishlist(selectedProduct.id)}
                      className={`p-3 border rounded-lg transition-colors ${
                        wishlist.includes(selectedProduct.id)
                          ? 'border-pink-500 bg-pink-50 text-pink-500'
                          : 'border-pink-500 text-pink-500 hover:bg-pink-50'
                      }`}
                    >
                      <Heart size={20} className={wishlist.includes(selectedProduct.id) ? 'fill-current' : ''} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}