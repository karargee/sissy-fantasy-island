'use client'

import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'
import { useStore } from '@/lib/store'
import { useEffect } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'light' ? (
          <Sun size={20} className="text-yellow-500" />
        ) : (
          <Moon size={20} className="text-blue-400" />
        )}
      </motion.div>
    </motion.button>
  )
}