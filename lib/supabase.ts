import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Product {
  id: string
  name: string
  price: number
  category: string
  images: string[]
  description: string
  in_stock: number
  rating: number
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  items: any[]
  total: number
  status: 'pending' | 'processing' | 'shipped' | 'delivered'
  tracking_number?: string
  created_at: string
}

export interface User {
  id: string
  email: string
  name: string
  loyalty_points: number
  membership_tier: string
  created_at: string
}
