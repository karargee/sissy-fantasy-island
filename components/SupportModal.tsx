'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Phone, Mail, Clock, Shield, Truck, Award, ChevronDown, ChevronUp } from 'lucide-react'

interface SupportModalProps {
  isOpen: boolean
  onClose: () => void
}

const faqs = [
  {
    question: "How discreet is your shipping?",
    answer: "All orders are shipped in plain, unmarked packaging with no indication of contents. Billing appears as 'SFI Services' on statements."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and cryptocurrency for maximum privacy. All transactions are SSL encrypted."
  },
  {
    question: "How do I book a private room?",
    answer: "Visit our Private Experience Rooms section, select your preferred room, choose date/time, and complete the secure booking process."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day return policy for unopened items. For hygiene reasons, certain items cannot be returned once opened."
  },
  {
    question: "Is my personal information secure?",
    answer: "Yes, we use military-grade encryption and never share customer information. Your privacy is our top priority."
  }
]

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [activeTab, setActiveTab] = useState('chat')
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'support', message: 'Hello! How can I help you today?', time: '2:30 PM' }
  ])
  const [newMessage, setNewMessage] = useState('')
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: 'normal'
  })

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: chatMessages.length + 1,
        sender: 'user',
        message: newMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setChatMessages(prev => [...prev, userMessage])
      setNewMessage('')

      // Simulate support response
      setTimeout(() => {
        const supportResponse = {
          id: chatMessages.length + 2,
          sender: 'support',
          message: 'Thank you for your message. A support specialist will assist you shortly.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setChatMessages(prev => [...prev, supportResponse])
      }, 1000)
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for contacting us! We will respond within 24 hours.')
    setContactForm({ name: '', email: '', subject: '', message: '', priority: 'normal' })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex h-[80vh]">
              {/* Sidebar */}
              <div className="w-1/3 bg-gray-50 dark:bg-gray-900 p-6 border-r border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Support Center</h2>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="space-y-4 mb-8">
                  <button
                    onClick={() => setActiveTab('chat')}
                    className={`w-full p-3 text-left rounded-lg transition-colors ${
                      activeTab === 'chat' 
                        ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <MessageCircle size={20} />
                      <div>
                        <div className="font-medium">Live Chat</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Get instant help</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('faq')}
                    className={`w-full p-3 text-left rounded-lg transition-colors ${
                      activeTab === 'faq' 
                        ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Award size={20} />
                      <div>
                        <div className="font-medium">FAQ</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Common questions</div>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`w-full p-3 text-left rounded-lg transition-colors ${
                      activeTab === 'contact' 
                        ? 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400' 
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Mail size={20} />
                      <div>
                        <div className="font-medium">Contact Form</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Send us a message</div>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 dark:text-green-400 mb-2">
                      <Clock size={16} />
                      <span className="font-medium">24/7 Support</span>
                    </div>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      We're here to help anytime, day or night
                    </p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-pink-500" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-pink-500" />
                      <span>support@sissyfantasyisland.com</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 flex flex-col">
                {activeTab === 'chat' && (
                  <>
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <h3 className="font-semibold">Live Chat Support</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Average response time: 2 minutes
                      </p>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto">
                      <div className="space-y-4">
                        {chatMessages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                              msg.sender === 'user'
                                ? 'bg-pink-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-700'
                            }`}>
                              <p className="text-sm">{msg.message}</p>
                              <p className={`text-xs mt-1 ${
                                msg.sender === 'user' ? 'text-pink-100' : 'text-gray-500 dark:text-gray-400'
                              }`}>
                                {msg.time}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                          placeholder="Type your message..."
                          className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                        <button
                          onClick={sendMessage}
                          className="bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 transition-colors"
                        >
                          <Send size={20} />
                        </button>
                      </div>
                    </div>
                  </>
                )}

                {activeTab === 'faq' && (
                  <div className="flex-1 p-6 overflow-y-auto">
                    <h3 className="text-xl font-bold mb-6">Frequently Asked Questions</h3>
                    <div className="space-y-4">
                      {faqs.map((faq, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg"
                        >
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                            className="w-full p-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                          >
                            <span className="font-medium">{faq.question}</span>
                            {expandedFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>
                          <AnimatePresence>
                            {expandedFaq === index && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="border-t border-gray-200 dark:border-gray-700"
                              >
                                <div className="p-4 text-gray-600 dark:text-gray-300">
                                  {faq.answer}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'contact' && (
                  <div className="flex-1 p-6 overflow-y-auto">
                    <h3 className="text-xl font-bold mb-6">Contact Us</h3>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Name *</label>
                          <input
                            type="text"
                            value={contactForm.name}
                            onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Email *</label>
                          <input
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                            required
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Priority</label>
                        <select
                          value={contactForm.priority}
                          onChange={(e) => setContactForm(prev => ({ ...prev, priority: e.target.value }))}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        >
                          <option value="low">Low</option>
                          <option value="normal">Normal</option>
                          <option value="high">High</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Subject *</label>
                        <input
                          type="text"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                          required
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Message *</label>
                        <textarea
                          value={contactForm.message}
                          onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                          required
                          rows={6}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}