'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Gift, Shield, Star, Check } from 'lucide-react'

export default function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [preferences, setPreferences] = useState({
    newProducts: true,
    exclusiveOffers: true,
    events: false,
    tips: false
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setTimeout(() => {
        setSubscribed(false)
        setEmail('')
      }, 3000)
    }
  }

  if (subscribed) {
    return (
      <motion.section 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="py-20 bg-gradient-to-r from-green-500 to-emerald-600 text-white relative overflow-hidden"
      >
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-6xl mb-4"
          >
            ✅
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">Welcome to the Family!</h2>
          <p className="text-xl opacity-90 mb-6">
            Thank you for subscribing! Check your email for a special welcome offer.
          </p>
          <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
            <p className="text-sm">
              🎁 Your 15% off coupon is on its way!
            </p>
          </div>
        </div>
      </motion.section>
    )
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      className="py-20 bg-gradient-to-r from-pink-500 to-purple-600 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Gift className="w-8 h-8" />
                <span className="text-lg font-semibold">Exclusive Member Benefits</span>
              </div>
              
              <h2 className="text-4xl font-bold mb-6">
                Join Our Private Community
              </h2>
              
              <p className="text-xl mb-8 opacity-90">
                Get exclusive access to new products, special offers, and members-only events. 
                Your privacy is guaranteed.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  { icon: Gift, text: "15% off your first order" },
                  { icon: Star, text: "Early access to new collections" },
                  { icon: Shield, text: "Exclusive member-only sales" },
                  { icon: Mail, text: "Private event invitations" }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <benefit.icon size={16} />
                    </div>
                    <span>{benefit.text}</span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Shield size={16} />
                  <span className="font-semibold">Privacy Guaranteed</span>
                </div>
                <p className="text-sm opacity-90">
                  We never share your information. Unsubscribe anytime with one click.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full px-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-4">
                    What would you like to hear about?
                  </label>
                  <div className="space-y-3">
                    {[
                      { key: 'newProducts', label: 'New product launches' },
                      { key: 'exclusiveOffers', label: 'Exclusive offers & discounts' },
                      { key: 'events', label: 'Special events & experiences' },
                      { key: 'tips', label: 'Style tips & guides' }
                    ].map((pref) => (
                      <label key={pref.key} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences[pref.key as keyof typeof preferences]}
                          onChange={(e) => setPreferences(prev => ({
                            ...prev,
                            [pref.key]: e.target.checked
                          }))}
                          className="w-4 h-4 text-pink-600 bg-white/20 border-white/30 rounded focus:ring-white/50"
                        />
                        <span className="text-sm">{pref.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="text-xs opacity-75">
                  By subscribing, you agree to our{' '}
                  <a href="#" className="underline hover:no-underline">Privacy Policy</a>
                  {' '}and{' '}
                  <a href="#" className="underline hover:no-underline">Terms of Service</a>.
                  You can unsubscribe at any time.
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-white text-pink-600 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Mail size={20} />
                  Subscribe & Get 15% Off
                </motion.button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs opacity-75">
                  Join 10,000+ satisfied customers who trust us with their privacy
                </p>
                <div className="flex justify-center items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="text-yellow-300 fill-current" />
                  ))}
                  <span className="text-xs ml-2 opacity-75">4.9/5 rating</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}