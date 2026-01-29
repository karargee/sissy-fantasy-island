'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Smartphone, DollarSign, Building, Lock, CheckCircle, AlertCircle, Loader } from 'lucide-react'
import { useState } from 'react'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
  items: Array<{ name: string; price: number }>
}

type PaymentMethod = 'credit' | 'crypto' | 'paypal' | 'bank'
type PaymentStatus = 'idle' | 'processing' | 'success' | 'error'

export default function PaymentModal({ isOpen, onClose, total, items }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('credit')
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  
  // Credit Card Form State
  const [cardNumber, setCardNumber] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')
  const [cardName, setCardName] = useState('')
  const [billingAddress, setBillingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: 'US'
  })

  // Crypto Form State
  const [cryptoType, setCryptoType] = useState('bitcoin')
  const [walletAddress, setWalletAddress] = useState('')

  // PayPal Form State
  const [paypalEmail, setPaypalEmail] = useState('')

  // Bank Transfer State
  const [bankAccount, setBankAccount] = useState('')
  const [routingNumber, setRoutingNumber] = useState('')

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const validateCreditCard = () => {
    if (!cardNumber || cardNumber.replace(/\s/g, '').length < 13) return false
    if (!expiryDate || expiryDate.length < 5) return false
    if (!cvv || cvv.length < 3) return false
    if (!cardName.trim()) return false
    return true
  }

  const validateCrypto = () => {
    return walletAddress.length > 20
  }

  const validatePayPal = () => {
    return paypalEmail.includes('@')
  }

  const validateBank = () => {
    return bankAccount.length > 5 && routingNumber.length === 9
  }

  const isFormValid = () => {
    switch (selectedMethod) {
      case 'credit': return validateCreditCard()
      case 'crypto': return validateCrypto()
      case 'paypal': return validatePayPal()
      case 'bank': return validateBank()
      default: return false
    }
  }

  const processPayment = async () => {
    if (!isFormValid()) {
      setErrorMessage('Please fill in all required fields correctly')
      return
    }

    setPaymentStatus('processing')
    setErrorMessage('')

    // Mock payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))

    // Simulate success/failure (90% success rate)
    if (Math.random() > 0.1) {
      setPaymentStatus('success')
      setTimeout(() => {
        onClose()
        resetForm()
      }, 2000)
    } else {
      setPaymentStatus('error')
      setErrorMessage('Payment failed. Please try again or use a different payment method.')
    }
  }

  const resetForm = () => {
    setPaymentStatus('idle')
    setErrorMessage('')
    setCardNumber('')
    setExpiryDate('')
    setCvv('')
    setCardName('')
    setBillingAddress({ street: '', city: '', state: '', zip: '', country: 'US' })
    setWalletAddress('')
    setPaypalEmail('')
    setBankAccount('')
    setRoutingNumber('')
  }

  const handleClose = () => {
    if (paymentStatus !== 'processing') {
      onClose()
      resetForm()
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b flex items-center justify-between">
            <h2 className="text-2xl font-bold">Complete Payment</h2>
            <button 
              onClick={handleClose}
              disabled={paymentStatus === 'processing'}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          {/* Payment Status Overlay */}
          <AnimatePresence>
            {paymentStatus === 'processing' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-white/95 flex items-center justify-center z-10 rounded-2xl"
              >
                <div className="text-center">
                  <Loader className="w-12 h-12 text-pink-500 animate-spin mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Processing Payment...</h3>
                  <p className="text-gray-600">Please wait while we process your payment securely.</p>
                </div>
              </motion.div>
            )}
            
            {paymentStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 bg-white/95 flex items-center justify-center z-10 rounded-2xl"
              >
                <div className="text-center">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-green-600 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600">Thank you for your purchase. You will receive a confirmation email shortly.</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-6">
            {/* Order Summary */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              {items.map((item, index) => (
                <div key={index} className="flex justify-between mb-2">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
              ))}
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-pink-600">${total}</span>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-6">
              <h3 className="font-semibold mb-4">Select Payment Method</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { id: 'credit', icon: CreditCard, label: 'Credit Card', color: 'blue' },
                  { id: 'crypto', icon: DollarSign, label: 'Cryptocurrency', color: 'yellow' },
                  { id: 'paypal', icon: Smartphone, label: 'PayPal', color: 'blue' },
                  { id: 'bank', icon: Building, label: 'Bank Transfer', color: 'green' }
                ].map((method) => {
                  const Icon = method.icon
                  return (
                    <button
                      key={method.id}
                      onClick={() => setSelectedMethod(method.id as PaymentMethod)}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        selectedMethod === method.id
                          ? 'border-pink-500 bg-pink-50'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      <Icon className="w-6 h-6 mx-auto mb-2" />
                      <div className="text-sm font-medium">{method.label}</div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Payment Forms */}
            <div className="mb-6">
              {selectedMethod === 'credit' && (
                <div className="space-y-4">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Credit Card Information
                  </h4>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Card Number</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Expiry Date</label>
                      <input
                        type="text"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                        placeholder="MM/YY"
                        maxLength={5}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').substring(0, 4))}
                        placeholder="123"
                        maxLength={4}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Street Address</label>
                      <input
                        type="text"
                        value={billingAddress.street}
                        onChange={(e) => setBillingAddress({...billingAddress, street: e.target.value})}
                        placeholder="123 Main St"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">City</label>
                      <input
                        type="text"
                        value={billingAddress.city}
                        onChange={(e) => setBillingAddress({...billingAddress, city: e.target.value})}
                        placeholder="New York"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">State</label>
                      <input
                        type="text"
                        value={billingAddress.state}
                        onChange={(e) => setBillingAddress({...billingAddress, state: e.target.value})}
                        placeholder="NY"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">ZIP Code</label>
                      <input
                        type="text"
                        value={billingAddress.zip}
                        onChange={(e) => setBillingAddress({...billingAddress, zip: e.target.value})}
                        placeholder="10001"
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'crypto' && (
                <div className="space-y-4">
                  <h4 className="font-semibold">Cryptocurrency Payment</h4>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Cryptocurrency Type</label>
                    <select
                      value={cryptoType}
                      onChange={(e) => setCryptoType(e.target.value)}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    >
                      <option value="bitcoin">Bitcoin (BTC)</option>
                      <option value="ethereum">Ethereum (ETH)</option>
                      <option value="litecoin">Litecoin (LTC)</option>
                      <option value="dogecoin">Dogecoin (DOGE)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Wallet Address</label>
                    <input
                      type="text"
                      value={walletAddress}
                      onChange={(e) => setWalletAddress(e.target.value)}
                      placeholder="Enter your wallet address"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-800">
                      <strong>Note:</strong> You will receive payment instructions after clicking "Complete Payment".
                    </p>
                  </div>
                </div>
              )}

              {selectedMethod === 'paypal' && (
                <div className="space-y-4">
                  <h4 className="font-semibold">PayPal Payment</h4>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">PayPal Email</label>
                    <input
                      type="email"
                      value={paypalEmail}
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      placeholder="your-email@example.com"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                      You will be redirected to PayPal to complete your payment securely.
                    </p>
                  </div>
                </div>
              )}

              {selectedMethod === 'bank' && (
                <div className="space-y-4">
                  <h4 className="font-semibold">Bank Transfer</h4>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Account Number</label>
                    <input
                      type="text"
                      value={bankAccount}
                      onChange={(e) => setBankAccount(e.target.value.replace(/\D/g, ''))}
                      placeholder="Account number"
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Routing Number</label>
                    <input
                      type="text"
                      value={routingNumber}
                      onChange={(e) => setRoutingNumber(e.target.value.replace(/\D/g, '').substring(0, 9))}
                      placeholder="9-digit routing number"
                      maxLength={9}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    />
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      Bank transfers may take 1-3 business days to process.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errorMessage && paymentStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2"
              >
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700">{errorMessage}</p>
              </motion.div>
            )}

            {/* Security Notice */}
            <div className="mb-6 p-4 bg-gray-50 border rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium text-green-600">Secure Payment</span>
              </div>
              <p className="text-xs text-gray-600">
                Your payment information is encrypted and secure. We never store your payment details.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleClose}
                disabled={paymentStatus === 'processing'}
                className="flex-1 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={processPayment}
                disabled={!isFormValid() || paymentStatus === 'processing'}
                className="flex-1 py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paymentStatus === 'processing' ? 'Processing...' : `Pay $${total}`}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}