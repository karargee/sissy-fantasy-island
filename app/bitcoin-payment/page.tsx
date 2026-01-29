'use client'

import { motion } from 'framer-motion'
import { Copy, Check, Bitcoin } from 'lucide-react'
import { useState } from 'react'
import Header from '@/components/Header'

export default function BitcoinPaymentPage() {
  const [copied, setCopied] = useState(false)
  const bitcoinAddress = 'bc1qer33ht99k4smfhnsrghkk9zn5gm5fw8ce62t23'

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bitcoinAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Bitcoin Payment</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Send your payment to the Bitcoin address below
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <Bitcoin className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">Bitcoin Address</h2>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-center font-mono text-sm break-all mb-4">
              {bitcoinAddress}
            </p>
            <button
              onClick={copyToClipboard}
              className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors flex items-center justify-center space-x-2"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>

          <div className="space-y-4 text-sm text-gray-600">
            <div className="flex items-start space-x-2">
              <span className="font-bold">1.</span>
              <p>Copy the Bitcoin address above</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-bold">2.</span>
              <p>Open your Bitcoin wallet</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-bold">3.</span>
              <p>Send the exact amount to this address</p>
            </div>
            <div className="flex items-start space-x-2">
              <span className="font-bold">4.</span>
              <p>Your order will be processed after confirmation</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>Note:</strong> Bitcoin transactions may take 10-30 minutes to confirm. Please be patient.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}