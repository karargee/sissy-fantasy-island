'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'

export default function AgeVerification() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    const verified = localStorage.getItem('ageVerified')
    if (!verified) {
      setShowModal(true)
    }
  }, [])

  const handleVerify = (isAdult: boolean) => {
    if (isAdult) {
      localStorage.setItem('ageVerified', 'true')
      setShowModal(false)
    } else {
      window.location.href = 'https://www.google.com'
    }
  }

  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-lg p-8 max-w-md w-full text-center"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">
                Age Verification Required
              </h2>
              <p className="text-gray-600 mb-4">
                This website contains adult content. You must be 18 years or older to enter.
              </p>
              <p className="text-sm text-gray-500">
                By entering this site, you confirm that you are of legal age in your jurisdiction.
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => handleVerify(true)}
                className="flex-1 bg-pink-500 hover:bg-pink-600"
              >
                I am 18 or older
              </Button>
              <Button
                onClick={() => handleVerify(false)}
                variant="outline"
                className="flex-1"
              >
                I am under 18
              </Button>
            </div>

            <p className="text-xs text-gray-400 mt-4">
              This verification is required by law and helps protect minors.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}