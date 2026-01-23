'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, User, ArrowRight, Heart, Share2 } from 'lucide-react'

const blogPosts = [
  {
    id: '1',
    title: 'The Ultimate Guide to Sissy Fashion',
    excerpt: 'Discover the latest trends and timeless classics in sissy fashion. From elegant dresses to playful accessories.',
    image: '/677f2b7845044f8b.webp',
    author: 'Fashion Team',
    date: '2024-01-15',
    category: 'Style Guide',
    readTime: '5 min read'
  },
  {
    id: '2',
    title: 'Caring for Your Delicate Costumes',
    excerpt: 'Learn proper care techniques to keep your precious costumes looking beautiful for years to come.',
    image: '/75cb3ea7242d5b02.webp',
    author: 'Care Expert',
    date: '2024-01-12',
    category: 'Care Instructions',
    readTime: '3 min read'
  },
  {
    id: '3',
    title: 'Building Your Perfect Sissy Wardrobe',
    excerpt: 'Essential pieces every sissy should have in their collection. Start your journey with these must-haves.',
    image: '/8f529c75300a9be6.webp',
    author: 'Style Consultant',
    date: '2024-01-10',
    category: 'Style Guide',
    readTime: '7 min read'
  },
  {
    id: '4',
    title: 'Accessorizing Like a Pro',
    excerpt: 'The art of accessorizing can transform any outfit. Learn the secrets of professional styling.',
    image: '/917db59e89ae9d07.webp',
    author: 'Accessory Expert',
    date: '2024-01-08',
    category: 'Style Guide',
    readTime: '4 min read'
  }
]

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Style & Care Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Your guide to fashion, care tips, and styling advice for the perfect sissy experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full text-xs font-semibold">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white hover:text-pink-600 dark:hover:text-pink-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-gray-400" />
                    <span className="text-sm text-gray-500">
                      {new Date(post.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <Heart size={16} className="text-gray-400 hover:text-pink-500" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                    >
                      <Share2 size={16} className="text-gray-400 hover:text-blue-500" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  )
}