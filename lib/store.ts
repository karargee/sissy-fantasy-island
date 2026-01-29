import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  phone?: string
  address?: string
  createdAt: string
  loyaltyPoints: number
  memberSince: string
  membershipTier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum'
  preferences: {
    language: string
    currency: string
    sizes: { [key: string]: string }
  }
}

interface Product {
  id: string
  name: string
  price: number
  image: string
  images?: string[]
  category: string
  rating: number
  reviews: Review[]
  sizes?: string[]
  colors?: string[]
  inStock: number
  description?: string
}

interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
  verified: boolean
}

interface Order {
  id: string
  userId: string
  items: CartItem[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  date: string
  trackingNumber?: string
}

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

interface StoreState {
  // User Management
  user: User | null
  setUser: (user: User | null) => void
  updateUser: (userData: Partial<User>) => void
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  clearCart: () => void
  
  // Cart & Wishlist
  cart: CartItem[]
  wishlist: string[]
  addToCart: (item: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: string) => void
  updateCartQuantity: (id: string, quantity: number) => void
  addToWishlist: (productId: string) => void
  removeFromWishlist: (productId: string) => void
  
  // Recently Viewed & Recommendations
  recentlyViewed: string[]
  addToRecentlyViewed: (productId: string) => void
  recommendations: string[]
  updateRecommendations: (productIds: string[]) => void
  
  // Product Comparison
  compareList: string[]
  addToCompare: (productId: string) => void
  removeFromCompare: (productId: string) => void
  clearCompare: () => void
  
  // Orders & Tracking
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: Order['status']) => void
  
  // Reviews & Ratings
  addReview: (productId: string, review: Omit<Review, 'id'>) => void
  
  // UI State
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  chatOpen: boolean
  setChatOpen: (open: boolean) => void
  
  // Preferences
  language: string
  setLanguage: (lang: string) => void
  currency: string
  setCurrency: (curr: string) => void
  
  // Inventory
  updateStock: (productId: string, quantity: number) => void
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // User Management
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (userData) => set((state) => ({
        user: state.user ? { ...state.user, ...userData } : null
      })),
      login: async (email, password) => {
        // Simulate login - in real app, this would call an API
        const mockUser: User = {
          id: '1',
          name: 'Demo User',
          email,
          phone: '',
          address: '',
          createdAt: new Date().toISOString(),
          loyaltyPoints: 150,
          memberSince: '2024-01-01',
          membershipTier: 'Silver',
          preferences: {
            language: 'en',
            currency: 'USD',
            sizes: {}
          }
        }
        set({ user: mockUser })
        return true
      },
      logout: () => set({ user: null, cart: [], wishlist: [] }),
      clearCart: () => set({ cart: [] }),
      
      // Cart & Wishlist
      cart: [],
      wishlist: [],
      addToCart: (item) => set((state) => {
        const existingItem = state.cart.find(cartItem => cartItem.id === item.id)
        if (existingItem) {
          return {
            cart: state.cart.map(cartItem =>
              cartItem.id === item.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
            )
          }
        }
        return { cart: [...state.cart, { ...item, quantity: 1 }] }
      }),
      removeFromCart: (id) => set((state) => ({
        cart: state.cart.filter(item => item.id !== id)
      })),
      updateCartQuantity: (id, quantity) => set((state) => {
        if (quantity <= 0) {
          return { cart: state.cart.filter(item => item.id !== id) }
        }
        return {
          cart: state.cart.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
        }
      }),
      addToWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.includes(productId)
          ? state.wishlist
          : [...state.wishlist, productId]
      })),
      removeFromWishlist: (productId) => set((state) => ({
        wishlist: state.wishlist.filter(id => id !== productId)
      })),
      
      // Recently Viewed & Recommendations
      recentlyViewed: [],
      addToRecentlyViewed: (productId) => set((state) => {
        const filtered = state.recentlyViewed.filter(id => id !== productId)
        return { recentlyViewed: [productId, ...filtered].slice(0, 10) }
      }),
      recommendations: [],
      updateRecommendations: (productIds) => set({ recommendations: productIds }),
      
      // Product Comparison
      compareList: [],
      addToCompare: (productId) => set((state) => ({
        compareList: state.compareList.includes(productId)
          ? state.compareList
          : [...state.compareList, productId].slice(0, 4)
      })),
      removeFromCompare: (productId) => set((state) => ({
        compareList: state.compareList.filter(id => id !== productId)
      })),
      clearCompare: () => set({ compareList: [] }),
      
      // Orders & Tracking
      orders: [],
      addOrder: (order) => set((state) => ({
        orders: [...state.orders, order]
      })),
      updateOrderStatus: (orderId, status) => set((state) => ({
        orders: state.orders.map(order =>
          order.id === orderId ? { ...order, status } : order
        )
      })),
      
      // Reviews & Ratings
      addReview: (productId, review) => {
        // This would typically update a products database
        console.log('Adding review for product:', productId, review)
      },
      
      // UI State
      cartOpen: false,
      setCartOpen: (open) => set({ cartOpen: open }),
      chatOpen: false,
      setChatOpen: (open) => set({ chatOpen: open }),
      
      // Preferences
      language: 'en',
      setLanguage: (lang) => set({ language: lang }),
      currency: 'USD',
      setCurrency: (curr) => set({ currency: curr }),
      
      // Inventory
      updateStock: (productId, quantity) => {
        // This would typically update a products database
        console.log('Updating stock for product:', productId, quantity)
      }
    }),
    {
      name: 'sissy-fantasy-store',
      partialize: (state) => ({
        user: state.user,
        cart: state.cart,
        wishlist: state.wishlist,
        recentlyViewed: state.recentlyViewed,
        compareList: state.compareList,
        orders: state.orders,
        language: state.language,
        currency: state.currency
      })
    }
  )
)