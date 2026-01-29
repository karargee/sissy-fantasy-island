'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart, ShoppingCart } from 'lucide-react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'

interface ProductCardProps {
  id: string
  name: string
  price: number
  image: string
  category: string
  isNew?: boolean
}

export default function ProductCard({ id, name, price, image, category, isNew }: ProductCardProps) {
  const { dispatch } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  
  const addToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { id, name, price, image, category }
    })
  }
  
  const toggleWishlist = () => {
    if (isInWishlist(id)) {
      removeFromWishlist(id)
    } else {
      addToWishlist({ id, name, price, image, category })
    }
  }

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden group cursor-pointer">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            loading="lazy"
            quality={75}
            className="object-cover transition-transform group-hover:scale-105"
          />
          {isNew && (
            <div className="absolute top-2 left-2 bg-pink-500 text-white px-2 py-1 text-xs rounded">
              NEW
            </div>
          )}
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button 
              variant="secondary" 
              size="icon" 
              className="h-8 w-8"
              onClick={toggleWishlist}
            >
              <Heart className={`h-4 w-4 ${isInWishlist(id) ? 'fill-red-500 text-red-500' : ''}`} />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {category}
          </div>
          <h3 className="font-semibold text-sm mb-2 line-clamp-2">{name}</h3>
          <div className="text-lg font-bold text-pink-600">
            ${price.toFixed(2)}
          </div>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" size="sm" onClick={addToCart}>
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}