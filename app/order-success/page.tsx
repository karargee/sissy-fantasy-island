'use client'

import { motion } from 'framer-motion'
import { CheckCircle, Package, Mail, Download } from 'lucide-react'
import Link from 'next/link'
import Header from '@/components/Header'

export default function OrderSuccessPage() {
  const orderNumber = 'SFI-' + Math.random().toString(36).substr(2, 9).toUpperCase()

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>

          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-8">Thank you for your purchase. Your order has been received and is being processed.</p>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold mb-4">Order Details</h2>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span>Order Number:</span>
                <span className="font-mono">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span>Order Date:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Status:</span>
                <span className="text-green-600 font-semibold">Paid</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping Status:</span>
                <span className="text-blue-600 font-semibold">Processing</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Package className="w-8 h-8 text-pink-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Processing</h3>
              <p className="text-sm text-gray-600">Your order is being prepared</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Mail className="w-8 h-8 text-pink-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Email Sent</h3>
              <p className="text-sm text-gray-600">Confirmation sent to your email</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <Download className="w-8 h-8 text-pink-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Receipt</h3>
              <p className="text-sm text-gray-600">Download your receipt</p>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/dashboard" className="block w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors">
              View Order Status
            </Link>
            <Link href="/" className="block w-full border border-pink-500 text-pink-500 py-3 rounded-lg hover:bg-pink-50 transition-colors">
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}