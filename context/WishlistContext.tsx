'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface WishlistItem {
  id: string
  name: string
  price: number
  image: string
  category: string
}

const WishlistContext = createContext<{
  wishlist: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
} | null>(null)

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])

  const addToWishlist = (item: WishlistItem) => {
    setWishlist(prev => {
      if (prev.find(w => w.id === item.id)) return prev
      return [...prev, item]
    })
  }

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(item => item.id !== id))
  }

  const isInWishlist = (id: string) => {
    return wishlist.some(item => item.id === id)
  }

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider')
  }
  return context
}