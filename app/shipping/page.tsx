'use client'

import { motion } from 'framer-motion'
import { Truck, Shield, Clock, Package } from 'lucide-react'
import Header from '@/components/Header'

export default function ShippingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fast, discreet, and secure shipping worldwide.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            { icon: Shield, title: "100% Discreet", desc: "Plain packaging with no branding" },
            { icon: Truck, title: "Free Shipping", desc: "On orders over $50" },
            { icon: Clock, title: "Fast Delivery", desc: "2-5 business days" },
            { icon: Package, title: "Secure Packaging", desc: "Protected and tamper-proof" }
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
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold mb-6">Shipping Rates & Times</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">Shipping Method</th>
                  <th className="text-left py-3">Cost</th>
                  <th className="text-left py-3">Delivery Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3">Standard Shipping</td>
                  <td className="py-3">$5.99</td>
                  <td className="py-3">5-7 business days</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Express Shipping</td>
                  <td className="py-3">$12.99</td>
                  <td className="py-3">2-3 business days</td>
                </tr>
                <tr className="border-b">
                  <td className="py-3">Overnight Shipping</td>
                  <td className="py-3">$24.99</td>
                  <td className="py-3">1 business day</td>
                </tr>
                <tr>
                  <td className="py-3">International</td>
                  <td className="py-3">$19.99+</td>
                  <td className="py-3">7-14 business days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  )
}