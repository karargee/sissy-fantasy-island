'use client'

import { motion } from 'framer-motion'
import { Package, Truck, CheckCircle, Clock, ArrowLeft } from 'lucide-react'
import { useStore } from '@/lib/store'
import Link from 'next/link'
import Header from '@/components/Header'

export default function OrdersPage() {
  const { orders, user } = useStore()

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="text-yellow-500" />
      case 'processing': return <Package className="text-blue-500" />
      case 'shipped': return <Truck className="text-purple-500" />
      case 'delivered': return <CheckCircle className="text-green-500" />
      default: return <Clock />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header currentPage="orders" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 className="text-3xl font-bold">Order History</h1>
        </div>

        {!user ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">Please login to view your orders</p>
            <Link href="/">
              <button className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600">
                Go to Homepage
              </button>
            </Link>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
            <Link href="/">
              <button className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600">
                Start Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="capitalize font-semibold">{order.status}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <p className="font-bold text-pink-600">${item.price}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-xl font-bold text-pink-600">${order.total.toFixed(2)}</p>
                  </div>
                  {order.trackingNumber && (
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Tracking</p>
                      <p className="font-mono text-sm">{order.trackingNumber}</p>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
