'use client'

import { motion } from 'framer-motion'
import { Camera, Coffee, Sparkles, MapPin, Shield, Star } from 'lucide-react'
import { useState } from 'react'
import PaymentModal from '@/components/PaymentModal'
import Header from '@/components/Header'

const services = [
  {
    id: 'photography',
    name: 'Professional Photography',
    price: 100,
    duration: '2 hours',
    icon: Camera,
    description: 'Professional photo shoots with high-end equipment',
    features: ['High-resolution photos', 'Multiple outfit changes', 'Professional lighting', 'Digital gallery']
  },
  {
    id: 'catering',
    name: 'Premium Catering',
    price: 75,
    duration: 'Per person',
    icon: Coffee,
    description: 'Gourmet catering services with premium ingredients',
    features: ['Custom menus', 'Dietary accommodations', 'Professional service', 'Premium ingredients']
  },
  {
    id: 'styling',
    name: 'Personal Styling',
    price: 150,
    duration: '3 hours',
    icon: Sparkles,
    description: 'Expert styling services including makeup and hair',
    features: ['Professional makeup', 'Hair styling', 'Wardrobe selection', 'Style consultation']
  },
  {
    id: 'transport',
    name: 'Luxury Transport',
    price: 200,
    duration: 'Per trip',
    icon: MapPin,
    description: 'Discreet luxury transportation with professional chauffeurs',
    features: ['Premium vehicles', 'Professional drivers', 'Complete discretion', 'Door-to-door service']
  },
  {
    id: 'training',
    name: 'Feminization Training',
    price: 250,
    duration: '4 hours',
    icon: Sparkles,
    description: 'Comprehensive feminization and etiquette training',
    features: ['Voice coaching', 'Movement training', 'Etiquette lessons', 'Confidence building']
  },
  {
    id: 'wardrobe',
    name: 'Complete Wardrobe Service',
    price: 300,
    duration: 'Full day',
    icon: Star,
    description: 'Personal shopping and complete wardrobe transformation',
    features: ['Personal shopper', 'Size fitting', 'Style matching', 'Accessory selection']
  }
]

export default function ServicesPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [showPayment, setShowPayment] = useState(false)

  const toggleService = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const calculateTotal = () => {
    return selectedServices.reduce((total, serviceId) => {
      const service = services.find(s => s.id === serviceId)
      return total + (service?.price || 0)
    }, 0)
  }

  const getSelectedItems = () => {
    return selectedServices.map(serviceId => {
      const service = services.find(s => s.id === serviceId)
      return service ? { name: service.name, price: service.price } : null
    }).filter(Boolean)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header currentPage="services" />
      <div className="py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
          >
            Premium Services
          </motion.h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {services.map((service, index) => {
              const Icon = service.icon
              const isSelected = selectedServices.includes(service.id)
              
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => toggleService(service.id)}
                  className={`bg-white rounded-2xl p-6 shadow-lg cursor-pointer transition-all hover:shadow-xl ${
                    isSelected ? 'ring-2 ring-pink-500 bg-pink-50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-pink-100 rounded-full">
                      <Icon className="w-6 h-6 text-pink-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">{service.name}</h3>
                      <p className="text-pink-600 font-semibold">${service.price} - {service.duration}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="space-y-1">
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm">
                        <Star className="w-3 h-3 text-pink-500 fill-current" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {selectedServices.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-lg mb-8"
            >
              <h3 className="text-xl font-bold mb-4">Selected Services</h3>
              <div className="space-y-2 mb-4">
                {selectedServices.map(serviceId => {
                  const service = services.find(s => s.id === serviceId)
                  return service ? (
                    <div key={serviceId} className="flex justify-between">
                      <span>{service.name}</span>
                      <span>${service.price}</span>
                    </div>
                  ) : null
                })}
              </div>
              <div className="border-t pt-4 flex justify-between items-center">
                <span className="text-xl font-bold">Total: ${calculateTotal()}</span>
                <button 
                  onClick={() => setShowPayment(true)}
                  className="bg-pink-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
                >
                  Proceed to Payment
                </button>
              </div>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-bold mb-6">Secure Payment Options</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">💳</div>
                <div className="text-sm font-medium">Credit Cards</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">₿</div>
                <div className="text-sm font-medium">Cryptocurrency</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🅿️</div>
                <div className="text-sm font-medium">PayPal</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl mb-2">🏦</div>
                <div className="text-sm font-medium">Bank Transfer</div>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <Shield className="w-5 h-5 text-green-600" />
              <span className="text-sm text-green-700">
                All payments are secured with 256-bit SSL encryption
              </span>
            </div>
          </motion.div>

          <PaymentModal 
            isOpen={showPayment}
            onClose={() => setShowPayment(false)}
            total={calculateTotal()}
            items={getSelectedItems()}
          />
        </div>
      </div>
    </div>
  )
}