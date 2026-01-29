'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, Lock, Shield, X, Check } from 'lucide-react'
import { useState } from 'react'

interface PaymentGatewayProps {
  isOpen: boolean
  onClose: () => void
  total: number
  bookingDetails: {
    room: string
    date: string
    time: string
    duration: number
  }
}

export default function PaymentGateway({ isOpen, onClose, total, bookingDetails }: PaymentGatewayProps) {
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
    email: '',
    phone: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setProcessing(false)
    setSuccess(true)
    
    setTimeout(() => {
      setSuccess(false)
      onClose()
    }, 2000)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
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
          className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {success ? (
            <div className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Check className="w-10 h-10 text-white" />
              </motion.div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h2>
              <p className="text-gray-600">Your booking has been confirmed. Check your email for details.</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold">Secure Payment</h2>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6">
                {/* Booking Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold mb-2">Booking Summary</h3>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>Room:</span>
                      <span>{bookingDetails.room}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date & Time:</span>
                      <span>{bookingDetails.date} at {bookingDetails.time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span>{bookingDetails.duration} hours</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span className="text-pink-600">${total}</span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-4">Payment Method</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: 'card', name: 'Credit Card', icon: '💳' },
                      { id: 'crypto', name: 'Cryptocurrency', icon: '₿' },
                      { id: 'bank', name: 'Bank Transfer', icon: '🏦' }
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`p-4 border-2 rounded-lg text-center transition-colors ${
                          paymentMethod === method.id
                            ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                            : 'border-gray-200 hover:border-pink-300'
                        }`}
                      >
                        <div className="text-2xl mb-2">{method.icon}</div>
                        <div className="text-sm font-medium">{method.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  {paymentMethod === 'card' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-2">Card Number</label>
                        <input
                          type="text"
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          value={formData.cardNumber}
                          onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Expiry Date</label>
                          <input
                            type="text"
                            placeholder="MM/YY"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            value={formData.expiryDate}
                            onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">CVV</label>
                          <input
                            type="text"
                            placeholder="123"
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                            value={formData.cvv}
                            onChange={(e) => setFormData({...formData, cvv: e.target.value})}
                            required
                          />
                        </div>
                      </div>
                    </>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="john@example.com"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                  </div>

                  {/* Security Info */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Your payment information is encrypted and secure</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={processing}
                    className="w-full bg-pink-500 text-white py-4 rounded-lg font-semibold hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {processing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Pay ${total} Securely
                      </>
                    )}
                  </button>
                </form>

                {/* Trust Indicators */}
                <div className="mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center">V</div>
                    <span>Visa</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-4 bg-red-600 rounded text-white text-xs flex items-center justify-center">M</div>
                    <span>Mastercard</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-6 h-4 bg-yellow-500 rounded text-white text-xs flex items-center justify-center">₿</div>
                    <span>Bitcoin</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>SSL Secured</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}