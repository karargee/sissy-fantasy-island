'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your privacy is our top priority. We are committed to protecting your personal information.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto"
        >
          <div className="space-y-8 text-gray-700">
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Information We Collect</h2>
              <p className="mb-4">We collect information you provide directly to us, such as when you:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Create an account or make a purchase</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact us for support</li>
                <li>Participate in surveys or promotions</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Process and fulfill your orders</li>
                <li>Communicate with you about your account or transactions</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our products and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Information Sharing</h2>
              <p className="mb-4">We do not sell, trade, or rent your personal information to third parties. We may share your information only in these limited circumstances:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>With service providers who help us operate our business</li>
                <li>To comply with legal requirements</li>
                <li>To protect our rights and safety</li>
                <li>With your explicit consent</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Data Security</h2>
              <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Access and update your personal information</li>
                <li>Delete your account and personal data</li>
                <li>Opt out of marketing communications</li>
                <li>Request a copy of your data</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p className="mt-2">Email: sissyfantasyisand@gmail.com</p>
              <p>Phone: 1-800-FANTASY (326-8279)</p>
            </div>

            <div className="text-sm text-gray-500 pt-4 border-t">
              <p>Last updated: January 2024</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}