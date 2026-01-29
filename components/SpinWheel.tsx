'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Gift, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

const wheelSegments = [
  { label: '5% OFF', color: '#ff6b6b', angle: 0 },
  { label: 'FREE SHIPPING', color: '#4ecdc4', angle: 45 },
  { label: '10% OFF', color: '#45b7d1', angle: 90 },
  { label: 'TRY AGAIN', color: '#f9ca24', angle: 135 },
  { label: '15% OFF', color: '#f0932b', angle: 180 },
  { label: 'FREE GIFT', color: '#eb4d4b', angle: 225 },
  { label: '20% OFF', color: '#6c5ce7', angle: 270 },
  { label: 'TRY AGAIN', color: '#a29bfe', angle: 315 }
]

interface SpinWheelProps {
  isOpen: boolean
  onClose: () => void
}

export default function SpinWheel({ isOpen, onClose }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [result, setResult] = useState<string | null>(null)
  const [hasSpun, setHasSpun] = useState(false)

  const spin = () => {
    if (isSpinning || hasSpun) return

    setIsSpinning(true)
    setResult(null)

    // Random spin between 1440-2160 degrees (4-6 full rotations)
    const spinAmount = 1440 + Math.random() * 720
    const finalRotation = rotation + spinAmount

    setRotation(finalRotation)

    // Calculate result after spin
    setTimeout(() => {
      const normalizedRotation = finalRotation % 360
      const segmentAngle = 360 / wheelSegments.length
      const resultIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % wheelSegments.length
      
      setResult(wheelSegments[resultIndex].label)
      setIsSpinning(false)
      setHasSpun(true)
    }, 3000)
  }

  const reset = () => {
    setHasSpun(false)
    setResult(null)
    setRotation(0)
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
            initial={{ scale: 0.5, opacity: 0, rotateY: -90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            exit={{ scale: 0.5, opacity: 0, rotateY: 90 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Background Sparkles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-pink-300"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    rotate: [0, 180, 360],
                    opacity: [0, 1, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                >
                  <Sparkles size={16} />
                </motion.div>
              ))}
            </div>

            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 bg-gray-100 hover:bg-gray-200 rounded-full p-2 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <Gift className="w-12 h-12 text-pink-500 mx-auto" />
              </motion.div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent mb-2">
                Spin to Win!
              </h2>
              <p className="text-gray-600">Get exclusive discounts and free gifts!</p>
            </div>

            {/* Wheel Container */}
            <div className="relative w-64 h-64 mx-auto mb-6">
              {/* Wheel */}
              <motion.div
                className="w-full h-full rounded-full relative overflow-hidden shadow-lg border-4 border-white"
                style={{ rotate: rotation }}
                transition={{ duration: 3, ease: "easeOut" }}
              >
                {wheelSegments.map((segment, index) => (
                  <div
                    key={index}
                    className="absolute w-full h-full"
                    style={{
                      transform: `rotate(${segment.angle}deg)`,
                      clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%)',
                      backgroundColor: segment.color,
                    }}
                  >
                    <div
                      className="absolute text-white font-bold text-xs"
                      style={{
                        top: '20px',
                        right: '10px',
                        transform: 'rotate(22.5deg)',
                        transformOrigin: 'center',
                      }}
                    >
                      {segment.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Center Circle */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-lg border-4 border-gray-200 flex items-center justify-center z-10">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="text-pink-500"
                >
                  <Sparkles size={24} />
                </motion.div>
              </div>

              {/* Pointer */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-20">
                <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
              </div>
            </div>

            {/* Result Display */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center mb-6 p-4 bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl"
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-2">🎉 Congratulations!</h3>
                  <p className="text-lg font-semibold text-pink-600">{result}</p>
                  <p className="text-sm text-gray-600 mt-2">Use code: SPIN{result.replace(/\s+/g, '')}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Buttons */}
            <div className="flex gap-3">
              {!hasSpun ? (
                <motion.button
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(236, 72, 153, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={spin}
                  disabled={isSpinning}
                  className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-pink-600 hover:to-purple-600 transition-all"
                >
                  {isSpinning ? 'Spinning...' : 'SPIN NOW!'}
                </motion.button>
              ) : (
                <>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={reset}
                    className="flex-1 border-2 border-pink-500 text-pink-500 py-3 rounded-xl font-semibold hover:bg-pink-50 transition-colors"
                  >
                    Spin Again
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(236, 72, 153, 0.3)" }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-600 transition-all"
                  >
                    Claim Reward
                  </motion.button>
                </>
              )}
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              * One spin per customer. Offer valid for 24 hours.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}