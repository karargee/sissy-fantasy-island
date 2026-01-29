'use client'

import { motion } from 'framer-motion'
import { Bitcoin, Truck } from 'lucide-react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { useStore } from '@/lib/store'

export default function CheckoutPage() {
  const router = useRouter()
  const { cart } = useStore()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  })
  
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 50 ? 0 : 5.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleProceedToPayment = async () => {
    if (!formData.firstName || !formData.email || !formData.address) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formData,
          cart,
          totals: { subtotal, shipping, tax, total }
        })
      })

      if (response.ok) {
        router.push('/bitcoin-payment')
      } else {
        alert('Error processing order. Please try again.')
      }
    } catch (error) {
      alert('Error processing order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 pb-8">
      <Header />

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Checkout</h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Billing Information</h2>
            <div className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 sm:mb-2">First Name *</label>
                  <input name="firstName" value={formData.firstName} onChange={handleInputChange} type="text" required className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 sm:mb-2">Last Name *</label>
                  <input name="lastName" value={formData.lastName} onChange={handleInputChange} type="text" required className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 sm:mb-2">Email *</label>
                <input name="email" value={formData.email} onChange={handleInputChange} type="email" required className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5 sm:mb-2">Address *</label>
                <input name="address" value={formData.address} onChange={handleInputChange} type="text" required className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 sm:mb-2">City</label>
                  <input name="city" value={formData.city} onChange={handleInputChange} type="text" className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5 sm:mb-2">State</label>
                  <input name="state" value={formData.state} onChange={handleInputChange} type="text" className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium mb-1.5 sm:mb-2">ZIP Code</label>
                  <input name="zipCode" value={formData.zipCode} onChange={handleInputChange} type="text" className="w-full px-3 sm:px-4 py-2 sm:py-2.5 text-sm sm:text-base border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" />
                </div>
              </div>
            </div>

            <h3 className="text-lg sm:text-xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 flex items-center space-x-2">
              <Bitcoin className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Payment Method</span>
            </h3>
            
            <div className="p-4 sm:p-5 lg:p-6 bg-orange-50 border-2 border-orange-300 rounded-lg">
              <div className="flex items-center space-x-2 text-orange-800 mb-2 sm:mb-3">
                <Bitcoin className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-bold text-base sm:text-lg">Bitcoin Payment Only</span>
              </div>
              <p className="text-xs sm:text-sm text-orange-700 mb-3 sm:mb-4">We only accept Bitcoin for secure and private transactions.</p>
              <button 
                onClick={handleProceedToPayment}
                disabled={loading}
                className="w-full bg-orange-500 text-white py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-orange-600 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                <Bitcoin className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>{loading ? 'Processing...' : 'Proceed to Bitcoin Payment'}</span>
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Order Summary</h2>
            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center space-x-3 sm:space-x-4">
                  <img src={item.image} alt={item.name} className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm sm:text-base truncate">{item.name}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-bold text-sm sm:text-base whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t pt-3 sm:pt-4 space-y-2">
              <div className="flex justify-between text-sm sm:text-base">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm sm:text-base">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-base sm:text-lg border-t pt-2 mt-2">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center space-x-2 mt-4 sm:mt-6 text-xs sm:text-sm text-gray-600">
              <Truck className="w-4 h-4" />
              <span>Discreet packaging guaranteed</span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}