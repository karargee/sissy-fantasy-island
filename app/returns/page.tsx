'use client'

import { motion } from 'framer-motion'
import { RotateCcw, Shield, Clock } from 'lucide-react'
import Header from '@/components/Header'

export default function ReturnsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Returns & Exchanges</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your satisfaction is our priority. Easy returns within 30 days.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: Clock, title: "30-Day Returns", desc: "Return items within 30 days of purchase" },
            { icon: Shield, title: "Quality Guarantee", desc: "100% satisfaction guaranteed" },
            { icon: RotateCcw, title: "Easy Process", desc: "Simple online return process" }
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 bg-white rounded-lg shadow-lg"
            >
              <item.icon className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 space-y-8"
        >
          <div>
            <h2 className="text-2xl font-bold mb-4">Return Policy</h2>
            <div className="space-y-4 text-gray-700">
              <p>We want you to be completely satisfied with your purchase. If you're not happy with your order, you can return it within 30 days of delivery.</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Items must be unused and in original packaging</li>
                <li>Hygiene products cannot be returned for health reasons</li>
                <li>Custom or personalized items are non-returnable</li>
                <li>Return shipping costs are covered by us for defective items</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">How to Return</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Contact our support team at sissyfantasyisand@gmail.com</li>
              <li>Provide your order number and reason for return</li>
              <li>Receive your prepaid return label</li>
              <li>Package items securely and attach the label</li>
              <li>Drop off at any authorized shipping location</li>
            </ol>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Refund Timeline</h3>
            <p className="text-gray-700">Once we receive your return, we'll process your refund within 3-5 business days. The refund will be credited to your original payment method.</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}