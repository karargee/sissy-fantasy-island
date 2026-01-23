'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, User, Bot, Minimize2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { useStore } from '@/lib/store'

interface Message {
  id: string
  text: string
  sender: 'user' | 'agent'
  timestamp: Date
  type?: 'text' | 'quick-reply'
}

const quickReplies = [
  'What are your shipping options?',
  'How do I track my order?',
  'What is your return policy?',
  'Do you offer size exchanges?',
  'Are your products discreet?'
]

const botResponses: { [key: string]: string } = {
  'shipping': 'We offer free discreet shipping on orders over $50. Standard delivery takes 3-5 business days, express delivery 1-2 days.',
  'tracking': 'You can track your order in your account dashboard or use the tracking number sent to your email.',
  'returns': 'We accept returns within 30 days of purchase. Items must be unused and in original packaging.',
  'exchanges': 'Yes! We offer free size exchanges within 30 days. Just contact us with your order number.',
  'discreet': 'Absolutely! All packages are shipped in plain, unmarked packaging with no indication of contents.',
  'default': 'Thank you for your message! A customer service representative will be with you shortly. Our average response time is under 2 minutes.'
}

export default function LiveChatSupport() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! How can I help you today?',
      sender: 'agent',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { chatOpen, setChatOpen } = useStore()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate agent response
    setTimeout(() => {
      const responseKey = Object.keys(botResponses).find(key => 
        text.toLowerCase().includes(key)
      ) || 'default'

      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponses[responseKey],
        sender: 'agent',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, agentMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputText.trim()) {
      sendMessage(inputText.trim())
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-pink-500 text-white p-4 rounded-full shadow-lg hover:bg-pink-600 transition-colors z-40"
      >
        <MessageCircle size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 60 : 500
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 w-80 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-pink-500 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <User size={16} />
                </div>
                <div>
                  <h3 className="font-semibold">Customer Support</h3>
                  <p className="text-xs opacity-90">Usually replies instantly</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded"
                >
                  <Minimize2 size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-2 max-w-[80%] ${
                        message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                      }`}>
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                          message.sender === 'user' 
                            ? 'bg-pink-500 text-white' 
                            : 'bg-gray-200 dark:bg-gray-600'
                        }`}>
                          {message.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                        </div>
                        <div className={`p-3 rounded-2xl ${
                          message.sender === 'user'
                            ? 'bg-pink-500 text-white rounded-br-sm'
                            : 'bg-gray-100 dark:bg-gray-700 rounded-bl-sm'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                          <p className={`text-xs mt-1 opacity-70 ${
                            message.sender === 'user' ? 'text-pink-100' : 'text-gray-500'
                          }`}>
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                          <Bot size={12} />
                        </div>
                        <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl rounded-bl-sm">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                {messages.length === 1 && (
                  <div className="px-4 pb-2">
                    <p className="text-xs text-gray-500 mb-2">Quick questions:</p>
                    <div className="flex flex-wrap gap-1">
                      {quickReplies.slice(0, 3).map((reply) => (
                        <button
                          key={reply}
                          onClick={() => sendMessage(reply)}
                          className="text-xs bg-gray-100 dark:bg-gray-700 hover:bg-pink-100 dark:hover:bg-pink-900/20 px-2 py-1 rounded-full transition-colors"
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-sm"
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim()}
                      className="bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}