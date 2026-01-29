'use client'

import { motion } from 'framer-motion'
import Header from '@/components/Header'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header currentPage="terms" />
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
          >
            Terms & Conditions
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
          >
            <div className="text-sm text-gray-500 mb-6">Last Updated: January 2024</div>

            <section>
              <h2 className="text-2xl font-bold text-pink-600 mb-4">1. Age Requirement</h2>
              <p className="text-gray-700 leading-relaxed">
                You must be at least 18 years of age to access or use this website. By using this site, you represent and warrant that you are of legal age to form a binding contract and meet all eligibility requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-pink-600 mb-4">2. Product Information</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions, colors, or other content are accurate, complete, reliable, current, or error-free.
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>All products are for adult use only</li>
                <li>Products are made from body-safe materials</li>
                <li>Colors may vary slightly from images</li>
                <li>Sizes are approximate and may vary by manufacturer</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-pink-600 mb-4">3. Orders & Payment</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                By placing an order, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Provide accurate billing and shipping information</li>
                <li>Pay all charges at the prices in effect when incurred</li>
                <li>Accept responsibility for all charges made under your account</li>
                <li>Understand that we reserve the right to refuse or cancel any order</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-pink-600 mb-4">4. Shipping & Delivery</h2>
              <p className="text-gray-700 leading-relaxed">
                All orders are shipped in discreet, unmarked packaging. Delivery times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers or customs.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-pink-600 mb-4">5. Returns & Refunds</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Due to the intimate nature of our products:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Opened or used items cannot be returned for hygiene reasons</li>
                <li>Unopened items may be returned within 30 days</li>
                <li>Defective items will be replaced or refunded</li>
                <li>Return shipping costs are the customer's responsibility</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-pink-600 mb-4">6. Privacy & Discretion</h2>
              <p className="text-gray-700 leading-relaxed">
                We are committed to protecting your privacy. All personal information is kept confidential and secure. We never share customer information with third parties except as required for order fulfillment.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-pink-600 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All content on this website, including text, graphics, logos, and images, is the property of Sissy Fantasy Island and protected by copyright laws. Unauthorized use is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-pink-600 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                We are not liable for any indirect, incidental, special, or consequential damages arising from the use of our products or services. Our liability is limited to the purchase price of the product.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-pink-600 mb-4">9. Dungeon Rental Services</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                For mobile dungeon rentals:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Bookings require 48 hours advance notice</li>
                <li>Cancellations within 24 hours incur a 50% fee</li>
                <li>All activities must be safe, sane, and consensual</li>
                <li>We reserve the right to refuse service</li>
                <li>Damage to equipment will be charged to the customer</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-pink-600 mb-4">10. Modifications</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the site constitutes acceptance of modified terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-pink-600 mb-4">11. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                For questions about these terms, please contact us through our contact page or email us directly.
              </p>
            </section>

            <div className="mt-8 p-6 bg-pink-50 rounded-lg border-2 border-pink-200">
              <p className="text-sm text-gray-700">
                By using this website, you acknowledge that you have read, understood, and agree to be bound by these Terms & Conditions.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
