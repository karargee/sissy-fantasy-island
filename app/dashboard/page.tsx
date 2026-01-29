'use client'

import { motion } from 'framer-motion'
import { User, Package, Heart, Settings, LogOut, Eye } from 'lucide-react'
import { useState } from 'react'
import Header from '@/components/Header'
import { useStore } from '@/lib/store'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('orders')
  const { user, setUser } = useStore()

  const orders = [
    { id: 'SFI-ABC123', date: '2024-01-15', status: 'Delivered', total: 89.99, items: 2 },
    { id: 'SFI-DEF456', date: '2024-01-10', status: 'Shipped', total: 159.99, items: 1 },
    { id: 'SFI-GHI789', date: '2024-01-05', status: 'Processing', total: 45.99, items: 1 }
  ]

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in to view your dashboard</h1>
          <button className="bg-pink-500 text-white px-6 py-3 rounded-lg">Sign In</button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-10 h-10 text-pink-500" />
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-pink-500">Member since {user.memberSince}</p>
              </div>

              <nav className="space-y-2">
                {[
                  { id: 'orders', label: 'Order History', icon: Package },
                  { id: 'wishlist', label: 'Wishlist', icon: Heart },
                  { id: 'profile', label: 'Profile Settings', icon: Settings }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id ? 'bg-pink-100 text-pink-600' : 'hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                ))}
                <button
                  onClick={() => setUser(null)}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-red-100 text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Order History</h2>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold">{order.id}</h3>
                            <p className="text-gray-600">{order.date}</p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-600' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-600' :
                            'bg-yellow-100 text-yellow-600'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span>{order.items} item(s) • ${order.total}</span>
                          <button className="flex items-center space-x-2 text-pink-500 hover:text-pink-600">
                            <Eye className="w-4 h-4" />
                            <span>View Details</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Wishlist</h2>
                  <p className="text-gray-600">Your wishlist is empty. Start adding items you love!</p>
                </div>
              )}

              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
                  <form className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input type="text" defaultValue={user.name} className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input type="email" defaultValue={user.email} className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone</label>
                      <input type="tel" className="w-full px-4 py-2 border rounded-lg" />
                    </div>
                    <button className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600">
                      Save Changes
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}