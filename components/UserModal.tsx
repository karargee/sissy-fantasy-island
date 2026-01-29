'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Mail, Lock, Star, Package, Heart, Clock, Settings, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '@/lib/store'

interface UserModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function UserModal({ isOpen, onClose }: UserModalProps) {
  const [activeTab, setActiveTab] = useState('profile')
  const [isLogin, setIsLogin] = useState(true)
  const { user, setUser, orders, wishlist, recentlyViewed } = useStore()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault()
    if (isLogin) {
      // Mock login
      setUser({
        id: '1',
        name: formData.name || 'Princess Luna',
        email: formData.email,
        loyaltyPoints: 1250,
        membershipTier: 'Gold',
        preferences: {
          language: 'en',
          currency: 'USD',
          sizes: { tops: 'M', bottoms: 'L', shoes: '8' }
        }
      })
    } else {
      // Mock registration
      setUser({
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        loyaltyPoints: 0,
        membershipTier: 'Bronze',
        preferences: {
          language: 'en',
          currency: 'USD',
          sizes: {}
        }
      })
    }
    onClose()
  }

  const handleLogout = () => {
    setUser(null)
    onClose()
  }

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'orders', name: 'Orders', icon: Package },
    { id: 'wishlist', name: 'Wishlist', icon: Heart },
    { id: 'recent', name: 'Recently Viewed', icon: Clock },
    { id: 'settings', name: 'Settings', icon: Settings }
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold">
                {user ? `Welcome, ${user.name}` : 'Account'}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <X size={20} />
              </button>
            </div>

            {!user ? (
              // Login/Register Form
              <div className="p-6">
                <div className="flex justify-center mb-6">
                  <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => setIsLogin(true)}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        isLogin ? 'bg-white dark:bg-gray-600 shadow' : ''
                      }`}
                    >
                      Login
                    </button>
                    <button
                      onClick={() => setIsLogin(false)}
                      className={`px-4 py-2 rounded-md transition-colors ${
                        !isLogin ? 'bg-white dark:bg-gray-600 shadow' : ''
                      }`}
                    >
                      Register
                    </button>
                  </div>
                </div>

                <form onSubmit={handleAuth} className="max-w-md mx-auto space-y-4">
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Your name"
                      />
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({...formData, password: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                      placeholder="Password"
                    />
                  </div>
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium mb-1">Confirm Password</label>
                      <input
                        type="password"
                        required
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Confirm password"
                      />
                    </div>
                  )}
                  <button
                    type="submit"
                    className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
                  >
                    {isLogin ? 'Login' : 'Create Account'}
                  </button>
                </form>
              </div>
            ) : (
              // User Dashboard
              <div className="flex h-[600px]">
                {/* Sidebar */}
                <div className="w-64 bg-gray-50 dark:bg-gray-700 p-4">
                  <div className="space-y-2">
                    {tabs.map((tab) => {
                      const Icon = tab.icon
                      return (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            activeTab === tab.id
                              ? 'bg-pink-500 text-white'
                              : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          <Icon size={20} />
                          {tab.name}
                        </button>
                      )
                    })}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/20 text-red-600"
                    >
                      <LogOut size={20} />
                      Logout
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                  {activeTab === 'profile' && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Profile Information</h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-medium mb-1">Name</label>
                          <input
                            type="text"
                            value={user.name}
                            className="w-full p-3 border rounded-lg"
                            readOnly
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Email</label>
                          <input
                            type="email"
                            value={user.email}
                            className="w-full p-3 border rounded-lg"
                            readOnly
                          />
                        </div>
                      </div>
                      <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-4 text-white mb-4">
                        <h4 className="font-bold mb-2">Loyalty Status</h4>
                        <div className="flex justify-between items-center">
                          <span>{user.membershipTier} Member</span>
                          <span>{user.loyaltyPoints} Points</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'orders' && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Order History</h3>
                      {orders.length === 0 ? (
                        <p className="text-gray-500">No orders yet</p>
                      ) : (
                        <div className="space-y-4">
                          {orders.map((order) => (
                            <div key={order.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-semibold">Order #{order.id}</span>
                                <span className={`px-2 py-1 rounded text-sm ${
                                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                              <p className="text-gray-600">{order.date}</p>
                              <p className="font-bold">${order.total}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'wishlist' && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Wishlist ({wishlist.length})</h3>
                      {wishlist.length === 0 ? (
                        <p className="text-gray-500">No items in wishlist</p>
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          {wishlist.map((productId) => (
                            <div key={productId} className="border rounded-lg p-4">
                              <p>Product ID: {productId}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'recent' && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Recently Viewed</h3>
                      {recentlyViewed.length === 0 ? (
                        <p className="text-gray-500">No recently viewed items</p>
                      ) : (
                        <div className="grid grid-cols-2 gap-4">
                          {recentlyViewed.map((productId) => (
                            <div key={productId} className="border rounded-lg p-4">
                              <p>Product ID: {productId}</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'settings' && (
                    <div>
                      <h3 className="text-xl font-bold mb-4">Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Language</label>
                          <select className="w-full p-3 border rounded-lg">
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Currency</label>
                          <select className="w-full p-3 border rounded-lg">
                            <option value="USD">USD ($)</option>
                            <option value="EUR">EUR (€)</option>
                            <option value="GBP">GBP (£)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}