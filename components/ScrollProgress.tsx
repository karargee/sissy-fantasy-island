'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 to-purple-500 transform-origin-left z-50"
        style={{ scaleX }}
      />
      
      {/* Circular Progress Indicator */}
      <motion.div
        className="fixed bottom-8 left-8 w-12 h-12 z-40"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          <path
            className="text-gray-200"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
          />
          <motion.path
            className="text-pink-500"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            style={{
              pathLength: scrollYProgress
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-xs font-bold text-pink-500"
            style={{
              opacity: useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
            }}
          >
            <motion.span
              style={{
                display: 'inline-block'
              }}
            >
              %
            </motion.span>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}