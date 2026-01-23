'use client'

import { motion } from 'framer-motion'
import { Star, Gift, Crown, Zap } from 'lucide-react'
import { useStore } from '@/lib/store'

export default function LoyaltyProgram() {
  const { user } = useStore()
  
  if (!user) return null

  const loyaltyTiers = [
    { name: 'Bronze', min: 0, max: 99, color: 'from-amber-600 to-amber-800', icon: Star },
    { name: 'Silver', min: 100, max: 299, color: 'from-gray-400 to-gray-600', icon: Gift },
    { name: 'Gold', min: 300, max: 599, color: 'from-yellow-400 to-yellow-600', icon: Crown },
    { name: 'Platinum', min: 600, max: Infinity, color: 'from-purple-400 to-purple-600', icon: Zap }
  ]

  const currentTier = loyaltyTiers.find(tier => 
    user.loyaltyPoints >= tier.min && user.loyaltyPoints <= tier.max
  ) || loyaltyTiers[0]

  const nextTier = loyaltyTiers.find(tier => tier.min > user.loyaltyPoints)
  const pointsToNext = nextTier ? nextTier.min - user.loyaltyPoints : 0
  const progress = nextTier ? ((user.loyaltyPoints - currentTier.min) / (nextTier.min - currentTier.min)) * 100 : 100

  const CurrentIcon = currentTier.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-pink-200 dark:border-pink-800"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">Loyalty Rewards</h3>
          <p className="text-gray-600 dark:text-gray-400">Member since {user.memberSince}</p>
        </div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.6 }}
          className={`p-3 rounded-full bg-gradient-to-r ${currentTier.color} text-white shadow-lg`}
        >
          <CurrentIcon size={24} />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Current Tier</span>
            <span className={`px-3 py-1 rounded-full text-sm font-bold text-white bg-gradient-to-r ${currentTier.color}`}>
              {currentTier.name}
            </span>
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-bold text-pink-600">{user.loyaltyPoints}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">points</span>
          </div>

          {nextTier && (
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600 dark:text-gray-400">Progress to {nextTier.name}</span>
                <span className="text-gray-600 dark:text-gray-400">{pointsToNext} points to go</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-2 rounded-full bg-gradient-to-r ${currentTier.color}`}
                />
              </div>
            </div>
          )}
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Your Benefits</h4>
          <div className="space-y-2">
            {currentTier.name === 'Bronze' && (
              <>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                  5% discount on all orders
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                  Birthday surprise gift
                </div>
              </>
            )}
            {currentTier.name === 'Silver' && (
              <>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                  10% discount on all orders
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                  Free shipping on orders $25+
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                  Early access to sales
                </div>
              </>
            )}
            {currentTier.name === 'Gold' && (
              <>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                  15% discount on all orders
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                  Free shipping on all orders
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                  Priority customer support
                </div>
              </>
            )}
            {currentTier.name === 'Platinum' && (
              <>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                  20% discount on all orders
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                  Free express shipping
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                  Exclusive VIP products
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                  Personal shopping assistant
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-pink-200 dark:border-pink-800">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Earn 1 point for every $1 spent</p>
            <p className="text-xs text-gray-500 dark:text-gray-500">Points never expire</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
          >
            Redeem Points
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}