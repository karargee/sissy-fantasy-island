'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Users, Wifi, Car, Shield, Star, ChevronLeft, ChevronRight, MapPin, Phone, Mail, Check, X } from 'lucide-react'
import { useStore } from '@/lib/store'

interface Room {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  capacity: number
  size: string
  amenities: string[]
  features: string[]
  availability: { [key: string]: string[] } // date: available times
  rating: number
  reviews: number
}

const rooms: Room[] = [
  {
    id: 'executive',
    name: 'Executive Suite',
    description: 'Sophisticated BDSM dungeon with premium restraint systems and complete privacy. Features professional-grade bondage furniture, adjustable suspension points, and a comprehensive collection of impact play equipment. Perfect for power exchange dynamics, sensory deprivation, and disciplinary sessions with luxury comfort.',
    price: 150,
    images: ['/Slut-Me-Out-How-to-Use-a-Sex-Dungeon-3.jpg', '/Slut-Me-Out-How-to-Use-a-Sex-Dungeon-6.jpg', '/Slut-Me-Out-How-to-Use-a-Sex-Dungeon-7.jpg'],
    capacity: 2,
    size: '400 sq ft',
    amenities: ['Climate Control', 'Premium Sound System', 'Private Entrance', 'Bondage Furniture', 'Adjustable Lighting', 'Restraint Points', 'Impact Play Equipment'],
    features: ['Secure Access', 'Discreet Location', 'Professional Cleaning', '24/7 Support', 'Soundproofing', 'Medical-Grade Sanitization'],
    availability: {
      '2024-01-15': ['10:00', '14:00', '18:00'],
      '2024-01-16': ['12:00', '16:00', '20:00'],
      '2024-01-17': ['10:00', '14:00', '18:00', '20:00']
    },
    rating: 4.8,
    reviews: 127
  },
  {
    id: 'luxury',
    name: 'Luxury Chamber',
    description: 'Elegantly appointed BDSM playspace with advanced dungeon equipment and atmospheric lighting. Features a St. Andrews cross, spanking bench, medical examination table, and extensive toy collection. Designed for elaborate role-play scenarios, medical play, and intensive training sessions with sophisticated ambiance.',
    price: 200,
    images: ['/Slut-Me-Out-How-to-Use-a-Sex-Dungeon-8.jpg', '/Slut-Me-Out-How-to-Use-a-Sex-Dungeon-9.jpg', '/Slut-Me-Out-How-to-Use-a-Sex-Dungeon-10.jpg'],
    capacity: 3,
    size: '500 sq ft',
    amenities: ['Adjustable Lighting', 'St. Andrews Cross', 'Spanking Bench', 'Medical Table', 'Toy Collection', 'Mini Bar', 'Luxury Bathroom'],
    features: ['VIP Access', 'Concierge Service', 'Premium Linens', 'Aromatherapy', 'Temperature Control', 'Aftercare Area'],
    availability: {
      '2024-01-15': ['12:00', '16:00'],
      '2024-01-16': ['10:00', '14:00', '18:00'],
      '2024-01-17': ['12:00', '16:00', '20:00']
    },
    rating: 4.9,
    reviews: 89
  },
  {
    id: 'premium',
    name: 'Premium Experience',
    description: 'Our most exclusive BDSM dungeon with comprehensive equipment and full-service amenities. Features multiple play stations including suspension rigging, electro-play setup, sensory deprivation chamber, and professional dungeon furniture. Includes a fully equipped medical play area, extensive restraint collection, and premium aftercare facilities. The ultimate space for advanced BDSM practitioners and elaborate scene work.',
    price: 300,
    images: ['/Slut-Me-Out-How-to-Use-a-Sex-Dungeon-11.jpg', '/silicone-catsuit_01-1.jpg', '/Slut-Me-Out-How-to-Use-a-Sex-Dungeon-10.jpg'],
    capacity: 4,
    size: '600 sq ft',
    amenities: ['Full Concierge Service', 'Premium Refreshments', 'Extended Privacy', 'Jacuzzi', 'Private Balcony', 'Suspension Rigging', 'Electro-Play Setup', 'Sensory Deprivation Chamber'],
    features: ['Personal Assistant', 'Champagne Service', 'Luxury Amenities', 'Priority Support', 'Medical Play Area', 'Aftercare Suite', 'Professional Equipment'],
    availability: {
      '2024-01-15': ['14:00', '18:00'],
      '2024-01-16': ['16:00', '20:00'],
      '2024-01-17': ['10:00', '14:00', '18:00']
    },
    rating: 5.0,
    reviews: 156
  }
]

export default function DungeonRental() {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [bookingStep, setBookingStep] = useState(1) // 1: Select Room, 2: Choose Time, 3: Details, 4: Confirmation
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [duration, setDuration] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    specialRequests: '',
    guestCount: 1,
    addOns: [] as string[]
  })

  const { user } = useStore()

  // Generate next 7 days for booking
  const getAvailableDates = () => {
    const dates = []
    for (let i = 0; i < 7; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push(date.toISOString().split('T')[0])
    }
    return dates
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  const calculateTotal = () => {
    if (!selectedRoom) return 0
    const basePrice = selectedRoom.price * duration
    const addOnPrice = bookingData.addOns.length * 25 // $25 per add-on
    return basePrice + addOnPrice
  }

  const handleBooking = () => {
    // Simulate booking process
    alert(`Booking confirmed for ${selectedRoom?.name} on ${formatDate(selectedDate)} at ${selectedTime} for ${duration} hour(s). Total: $${calculateTotal()}`)
    setBookingStep(1)
    setSelectedRoom(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Professional BDSM Dungeon Rentals
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-6">
              Experience the finest in professional BDSM facilities with our fully equipped dungeons. Each space is designed for serious practitioners of bondage, discipline, dominance, submission, sadism, and masochism. Our dungeons feature professional-grade equipment, complete privacy, and the highest standards of safety and discretion.
            </p>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                <strong>Safety First:</strong> All equipment is professionally maintained and sanitized. Safe words are respected, and emergency protocols are in place. Experienced practitioners only - proper BDSM knowledge and consent practices required.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* BDSM Information Section */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">About Our BDSM Facilities</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-pink-600 dark:text-pink-400">Bondage & Restraint</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Our dungeons feature professional bondage equipment including suspension points, restraint furniture, and a comprehensive collection of cuffs, ropes, and chains. All equipment is regularly inspected for safety and properly maintained.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Suspension rigging with safety ratings</li>
                  <li>• St. Andrews crosses and bondage frames</li>
                  <li>• Medical-grade restraints and cuffs</li>
                  <li>• Rope and chain collections</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-purple-600 dark:text-purple-400">Discipline & Training</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Specialized furniture and equipment for discipline sessions, training scenarios, and power exchange dynamics. Each room includes spanking benches, punishment furniture, and training aids.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Spanking benches and punishment furniture</li>
                  <li>• Impact play equipment collection</li>
                  <li>• Training restraints and positioning aids</li>
                  <li>• Sensory deprivation equipment</li>
                </ul>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-red-600 dark:text-red-400">Medical & Role Play</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Dedicated medical play areas with examination tables, medical restraints, and authentic medical equipment for role-play scenarios. Perfect for medical fetish exploration and clinical fantasies.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Medical examination tables</li>
                  <li>• Clinical restraint systems</li>
                  <li>• Medical play equipment</li>
                  <li>• Sterile environment protocols</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4 text-indigo-600 dark:text-indigo-400">Aftercare & Safety</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Dedicated aftercare areas with comfortable seating, blankets, refreshments, and first aid supplies. Safety is our top priority with emergency protocols and trained staff available 24/7.
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                  <li>• Comfortable aftercare lounges</li>
                  <li>• Emergency safety protocols</li>
                  <li>• First aid and medical supplies</li>
                  <li>• 24/7 trained staff availability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-500" />
              <span>100% Confidential</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-500" />
              <span>Professional Cleaning</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-green-500" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-green-500" />
              <span>Private Parking</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {!selectedRoom ? (
          /* Room Selection */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="relative h-48 sm:h-64">
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold">
                    ${room.price}/hour
                  </div>
                  <div className="absolute bottom-4 left-4 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{room.rating}</span>
                    <span className="text-xs text-gray-600">({room.reviews})</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{room.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {room.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>Up to {room.capacity}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{room.size}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {room.amenities.slice(0, 3).map((amenity) => (
                        <span
                          key={amenity}
                          className="px-2 py-1 bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 text-xs rounded-full"
                        >
                          {amenity}
                        </span>
                      ))}
                      {room.amenities.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                          +{room.amenities.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedRoom(room)}
                    className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                  >
                    Book Now
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Booking Process */
          <div className="max-w-4xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              {/* Progress Steps */}
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedRoom(null)}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Rooms
                  </button>
                  <div className="flex items-center gap-4">
                    {[1, 2, 3, 4].map((step) => (
                      <div key={step} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          bookingStep >= step 
                            ? 'bg-pink-500 text-white' 
                            : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                        }`}>
                          {step}
                        </div>
                        {step < 4 && (
                          <div className={`w-8 h-1 mx-2 ${
                            bookingStep > step ? 'bg-pink-500' : 'bg-gray-200 dark:bg-gray-600'
                          }`} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6">
                {bookingStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Room Details</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <div className="relative mb-4">
                          <img
                            src={selectedRoom.images[currentImageIndex]}
                            alt={selectedRoom.name}
                            className="w-full h-48 sm:h-64 object-cover object-center rounded-lg"
                          />
                          <button
                            onClick={() => setCurrentImageIndex((prev) => 
                              prev === 0 ? selectedRoom.images.length - 1 : prev - 1
                            )}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setCurrentImageIndex((prev) => 
                              prev === selectedRoom.images.length - 1 ? 0 : prev + 1
                            )}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-2 hover:bg-white"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex gap-2 overflow-x-auto pb-2">
                          {selectedRoom.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentImageIndex(index)}
                              className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 ${
                                currentImageIndex === index 
                                  ? 'border-pink-500' 
                                  : 'border-gray-200 dark:border-gray-600'
                              }`}
                            >
                              <img
                                src={selectedRoom.images[index]}
                                alt=""
                                className="w-full h-full object-cover object-center"
                              />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold mb-2">{selectedRoom.name}</h3>
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="font-medium">{selectedRoom.rating}</span>
                            <span className="text-gray-600 dark:text-gray-400">({selectedRoom.reviews} reviews)</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                          {selectedRoom.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-2">
                            <Users className="w-5 h-5 text-pink-500" />
                            <span>Up to {selectedRoom.capacity} guests</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-pink-500" />
                            <span>{selectedRoom.size}</span>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">Amenities</h4>
                          <div className="grid grid-cols-1 gap-2">
                            {selectedRoom.amenities.map((amenity) => (
                              <div key={amenity} className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                <span className="text-sm">{amenity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4 mb-6">
                          <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                            ${selectedRoom.price}/hour
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Minimum 1 hour booking
                          </p>
                        </div>

                        <button
                          onClick={() => setBookingStep(2)}
                          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                        >
                          Continue Booking
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {bookingStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Select Date & Time</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div>
                        <h3 className="font-semibold mb-4">Available Dates</h3>
                        <div className="space-y-2">
                          {getAvailableDates().map((date) => (
                            <button
                              key={date}
                              onClick={() => setSelectedDate(date)}
                              className={`w-full p-3 text-left rounded-lg border transition-colors ${
                                selectedDate === date
                                  ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                                  : 'border-gray-200 dark:border-gray-600 hover:border-pink-300'
                              }`}
                            >
                              <div className="font-medium">{formatDate(date)}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {selectedRoom.availability[date]?.length || 0} slots available
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        {selectedDate && (
                          <>
                            <h3 className="font-semibold mb-4">Available Times</h3>
                            <div className="grid grid-cols-2 gap-2 mb-6">
                              {selectedRoom.availability[selectedDate]?.map((time) => (
                                <button
                                  key={time}
                                  onClick={() => setSelectedTime(time)}
                                  className={`p-3 rounded-lg border transition-colors ${
                                    selectedTime === time
                                      ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                                      : 'border-gray-200 dark:border-gray-600 hover:border-pink-300'
                                  }`}
                                >
                                  {time}
                                </button>
                              )) || (
                                <p className="text-gray-600 dark:text-gray-400 col-span-2">
                                  No available times for this date
                                </p>
                              )}
                            </div>

                            {selectedTime && (
                              <>
                                <h3 className="font-semibold mb-4">Duration</h3>
                                <div className="grid grid-cols-4 gap-2 mb-6">
                                  {[1, 2, 3, 4].map((hours) => (
                                    <button
                                      key={hours}
                                      onClick={() => setDuration(hours)}
                                      className={`p-3 rounded-lg border transition-colors ${
                                        duration === hours
                                          ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20'
                                          : 'border-gray-200 dark:border-gray-600 hover:border-pink-300'
                                      }`}
                                    >
                                      {hours}h
                                    </button>
                                  ))}
                                </div>

                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                                  <div className="flex justify-between items-center">
                                    <span>Total Cost:</span>
                                    <span className="text-xl font-bold text-pink-600 dark:text-pink-400">
                                      ${selectedRoom.price * duration}
                                    </span>
                                  </div>
                                </div>

                                <div className="flex gap-4">
                                  <button
                                    onClick={() => setBookingStep(1)}
                                    className="flex-1 border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                  >
                                    Back
                                  </button>
                                  <button
                                    onClick={() => setBookingStep(3)}
                                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                                  >
                                    Continue
                                  </button>
                                </div>
                              </>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}

                {bookingStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <h2 className="text-2xl font-bold mb-6">Booking Details</h2>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Full Name *</label>
                          <input
                            type="text"
                            value={bookingData.name}
                            onChange={(e) => setBookingData(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            placeholder="Enter your full name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Email Address *</label>
                          <input
                            type="email"
                            value={bookingData.email}
                            onChange={(e) => setBookingData(prev => ({ ...prev, email: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            placeholder="Enter your email"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Phone Number *</label>
                          <input
                            type="tel"
                            value={bookingData.phone}
                            onChange={(e) => setBookingData(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            placeholder="Enter your phone number"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Number of Guests</label>
                          <select
                            value={bookingData.guestCount}
                            onChange={(e) => setBookingData(prev => ({ ...prev, guestCount: parseInt(e.target.value) }))}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          >
                            {Array.from({ length: selectedRoom.capacity }, (_, i) => i + 1).map(num => (
                              <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">Special Requests</label>
                          <textarea
                            value={bookingData.specialRequests}
                            onChange={(e) => setBookingData(prev => ({ ...prev, specialRequests: e.target.value }))}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                            placeholder="Any special requests or requirements..."
                          />
                        </div>
                      </div>

                      <div>
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                          <h3 className="font-semibold mb-4">Booking Summary</h3>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Room:</span>
                              <span>{selectedRoom.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Date:</span>
                              <span>{formatDate(selectedDate)}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Time:</span>
                              <span>{selectedTime}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Duration:</span>
                              <span>{duration} hour{duration > 1 ? 's' : ''}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Guests:</span>
                              <span>{bookingData.guestCount}</span>
                            </div>
                            <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                              <div className="flex justify-between font-semibold">
                                <span>Total:</span>
                                <span className="text-pink-600 dark:text-pink-400">${calculateTotal()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                          <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">Privacy & Security</h4>
                          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                            <li>• All bookings are completely confidential</li>
                            <li>• Secure payment processing</li>
                            <li>• Professional discretion guaranteed</li>
                            <li>• Private entrance and parking</li>
                          </ul>
                        </div>

                        <div className="flex gap-4">
                          <button
                            onClick={() => setBookingStep(2)}
                            className="flex-1 border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            Back
                          </button>
                          <button
                            onClick={() => setBookingStep(4)}
                            disabled={!bookingData.name || !bookingData.email || !bookingData.phone}
                            className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Review & Pay
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {bookingStep === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-center"
                  >
                    <div className="max-w-md mx-auto">
                      <div className="text-6xl mb-4">🏰</div>
                      <h2 className="text-2xl font-bold mb-4">Confirm Your Booking</h2>
                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                        Please review your booking details and proceed with payment.
                      </p>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6 text-left">
                        <h3 className="font-semibold mb-4">Final Details</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Room:</span>
                            <span>{selectedRoom.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Date & Time:</span>
                            <span>{formatDate(selectedDate)} at {selectedTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Duration:</span>
                            <span>{duration} hour{duration > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Contact:</span>
                            <span>{bookingData.name}</span>
                          </div>
                          <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                            <div className="flex justify-between font-bold text-lg">
                              <span>Total Amount:</span>
                              <span className="text-pink-600 dark:text-pink-400">${calculateTotal()}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <button
                          onClick={() => setBookingStep(3)}
                          className="flex-1 border border-gray-300 dark:border-gray-600 py-3 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleBooking}
                          className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                        >
                          Confirm & Pay
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Contact Information */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-4">Need Assistance?</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Our professional staff is available 24/7 to help with your booking
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="font-semibold mb-2">Call Us</h3>
              <p className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-gray-600 dark:text-gray-400">bookings@sissyfantasyisland.com</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="font-semibold mb-2">Visit Us</h3>
              <p className="text-gray-600 dark:text-gray-400">Private Location<br />Disclosed Upon Booking</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}