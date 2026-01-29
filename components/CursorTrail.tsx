'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TrailPoint {
  id: number
  x: number
  y: number
}

export default function CursorTrail() {
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let animationFrame: number

    const updateTrail = () => {
      setTrail(prevTrail => {
        const newTrail = [...prevTrail]
        
        // Add new point
        if (mousePosition.x !== 0 || mousePosition.y !== 0) {
          newTrail.push({
            id: Date.now(),
            x: mousePosition.x,
            y: mousePosition.y
          })
        }

        // Keep only last 15 points
        return newTrail.slice(-15)
      })

      animationFrame = requestAnimationFrame(updateTrail)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    animationFrame = requestAnimationFrame(updateTrail)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [mousePosition])

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {trail.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: 0, opacity: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400"
            style={{
              left: point.x - 6,
              top: point.y - 6,
              zIndex: 50 - index
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}