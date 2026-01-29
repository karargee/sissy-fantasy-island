'use client'

import { motion } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Gift } from 'lucide-react'
import { useStore } from '@/lib/store'
import Link from 'next/link'
import { useState } from 'react'

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart, user, updateUser } = useStore()
  const [pointsToRedeem, setPointsToRedeem] = useState(0)
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 9.99
  const pointsDiscount = pointsToRedeem * 0.01
  const total = Math.max(0, subtotal + shipping - pointsDiscount)

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some items to get started</p>
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
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="flex gap-4">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{item.name}</h3>
                    <p className="text-pink-600 font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            
            {user && user.loyaltyPoints > 0 && (
              <div className="mb-4 p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="text-purple-600" size={20} />
                  <span className="font-semibold">Loyalty Points: {user.loyaltyPoints}</span>
                </div>
                <input
                  type="number"
                  min="0"
                  max={user.loyaltyPoints}
                  value={pointsToRedeem}
                  onChange={(e) => setPointsToRedeem(Math.min(user.loyaltyPoints, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 border rounded-lg mb-2"
                  placeholder="Points to redeem"
                />
                <p className="text-xs text-gray-600">100 points = $1 discount</p>
              </div>
            )}
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>
              {pointsDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Points Discount</span>
                  <span>-${pointsDiscount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <Link href="/checkout">
              <button className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600">
                Proceed to Checkout
              </button>
            </Link>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Free shipping on orders over $50
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}