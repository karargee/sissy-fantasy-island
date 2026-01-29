'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Eye, EyeOff, Mail, Lock, User, Shield } from 'lucide-react'
import { useStore } from '@/lib/store'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [showVerification, setShowVerification] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    ageVerified: false,
    termsAccepted: false
  })
  const [loading, setLoading] = useState(false)
  const { setUser } = useStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (!isLogin && !showVerification) {
      // Send verification email
      try {
        const response = await fetch('/api/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, action: 'send' })
        })
        const result = await response.json()
        
        if (result.success) {
          setEmailSent(true)
          setShowVerification(true)
        } else {
          alert('Failed to send verification email')
        }
      } catch (error) {
        alert('Error sending verification email')
      }
      setLoading(false)
      return
    }

    if (!isLogin && showVerification) {
      // Verify code
      try {
        const response = await fetch('/api/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, action: 'verify', code: verificationCode })
        })
        const result = await response.json()
        
        if (result.success) {
          setUser({
            id: '1',
            name: formData.name,
            email: formData.email,
            loyaltyPoints: 0,
            memberSince: '2024'
          })
          onClose()
        } else {
          alert(result.message)
        }
      } catch (error) {
        alert('Error verifying code')
      }
      setLoading(false)
      return
    }

    // Login logic
    setTimeout(() => {
      setUser({
        id: '1',
        name: formData.email.split('@')[0],
        email: formData.email,
        loyaltyPoints: 150,
        memberSince: '2024'
      })
      setLoading(false)
      onClose()
    }, 1500)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
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
            className="bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                <Shield size={16} />
                <span className="text-sm font-medium">Age Verification Required</span>
              </div>
              <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">
                You must be 18+ to access this site and create an account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {showVerification ? (
                <div className="text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Check Your Email</h3>
                    <p className="text-sm text-gray-600">We sent a verification code to {formData.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Verification Code</label>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      required
                      maxLength={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 text-center text-lg tracking-widest"
                      placeholder="Enter code"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Enter the 6-digit code from your email</p>
                </div>
              ) : (
                <>
                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <div className="relative">
                        <User size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <div className="relative">
                      <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {!isLogin && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Confirm Password</label>
                      <div className="relative">
                        <Lock size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                          placeholder="Confirm your password"
                        />
                      </div>
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        name="ageVerified"
                        checked={formData.ageVerified}
                        onChange={handleInputChange}
                        required
                        className="mr-3 w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                      />
                      <span className="text-sm">I confirm I am 18 years or older</span>
                    </label>

                    {!isLogin && (
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="termsAccepted"
                          checked={formData.termsAccepted}
                          onChange={handleInputChange}
                          required
                          className="mr-3 w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 rounded focus:ring-pink-500"
                        />
                        <span className="text-sm">
                          I agree to the{' '}
                          <a href="#" className="text-pink-500 hover:underline">Terms of Service</a>
                          {' '}and{' '}
                          <a href="#" className="text-pink-500 hover:underline">Privacy Policy</a>
                        </span>
                      </label>
                    )}
                  </div>
                </>
              )}

              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-pink-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    {showVerification ? 'Verifying...' : (isLogin ? 'Signing In...' : 'Sending Code...')}
                  </div>
                ) : (
                  showVerification ? 'Verify Email' : (isLogin ? 'Sign In' : 'Send Verification')
                )}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              {!showVerification && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-2 text-pink-500 hover:underline font-medium"
                  >
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              )}
              {showVerification && (
                <button
                  onClick={() => {
                    setShowVerification(false)
                    setEmailSent(false)
                    setVerificationCode('')
                  }}
                  className="text-sm text-pink-500 hover:underline"
                >
                  Back to signup
                </button>
              )}
            </div>

            {isLogin && !showVerification && (
              <div className="mt-4 text-center">
                <a href="#" className="text-sm text-pink-500 hover:underline">
                  Forgot your password?
                </a>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}