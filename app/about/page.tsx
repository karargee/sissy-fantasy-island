'use client'

import { motion } from 'framer-motion'
import { Heart, Shield, Truck, Award } from 'lucide-react'
import Header from '@/components/Header'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">About Sissy Fantasy Island</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your trusted destination for premium fantasy products and experiences since 2020.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Sissy Fantasy Island was founded with a simple mission: to provide a safe, discreet, and judgment-free space for individuals to explore their fantasies and express themselves authentically.
            </p>
            <p className="text-gray-700 mb-4">
              We understand that privacy and quality are paramount. That's why we've built our business on the pillars of discretion, premium products, and exceptional customer service.
            </p>
            <p className="text-gray-700">
              Today, we serve thousands of satisfied customers worldwide, offering everything from luxury costumes to premium toys, all delivered with the utmost care and confidentiality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { icon: Shield, title: '100% Discreet', desc: 'Plain packaging, no branding' },
              { icon: Award, title: 'Premium Quality', desc: 'Only the finest materials' },
              { icon: Truck, title: 'Fast Shipping', desc: 'Quick & reliable delivery' },
              { icon: Heart, title: 'Customer First', desc: '24/7 support team' }
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <item.icon className="w-12 h-12 text-pink-500 mx-auto mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span><strong>Privacy First:</strong> Your information is always protected and never shared.</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span><strong>Quality Guaranteed:</strong> We only offer products we'd use ourselves.</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span><strong>Inclusive Community:</strong> Everyone is welcome, no judgment.</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-500 mr-2">•</span>
                <span><strong>Customer Satisfaction:</strong> Your happiness is our success.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}