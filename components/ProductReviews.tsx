'use client'

import { motion } from 'framer-motion'
import { Star, ThumbsUp, ThumbsDown, User } from 'lucide-react'
import { useState } from 'react'
import { useStore } from '@/lib/store'

interface Review {
  id: string
  userId: string
  userName: string
  rating: number
  comment: string
  date: string
  verified: boolean
  helpful: number
  notHelpful: number
}

interface ProductReviewsProps {
  productId: string
  reviews: Review[]
  averageRating: number
  totalReviews: number
}

export default function ProductReviews({ productId, reviews, averageRating, totalReviews }: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: ''
  })
  const { user, addReview } = useStore()

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    addReview(productId, {
      userId: user.id,
      userName: user.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString(),
      verified: true
    })

    setNewReview({ rating: 5, comment: '' })
    setShowReviewForm(false)
  }

  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0]
    reviews.forEach(review => {
      distribution[review.rating - 1]++
    })
    return distribution.reverse()
  }

  const ratingDistribution = getRatingDistribution()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold">Customer Reviews</h3>
        {user && (
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
          >
            Write Review
          </button>
        )}
      </div>

      {/* Rating Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="text-center">
          <div className="text-4xl font-bold text-pink-600 mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex justify-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.floor(averageRating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <p className="text-gray-600">{totalReviews} reviews</p>
        </div>

        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <div key={rating} className="flex items-center gap-2">
              <span className="text-sm w-8">{rating}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full"
                  style={{
                    width: `${totalReviews > 0 ? (ratingDistribution[index] / totalReviews) * 100 : 0}%`
                  }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">{ratingDistribution[index]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form */}
      {showReviewForm && user && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="border rounded-lg p-4 mb-6"
        >
          <h4 className="font-bold mb-4">Write Your Review</h4>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setNewReview({ ...newReview, rating })}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        rating <= newReview.rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Comment</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                rows={4}
                placeholder="Share your experience with this product..."
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors"
              >
                Submit Review
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
        ) : (
          reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-b pb-4 last:border-b-0"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-pink-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-semibold">{review.userName}</span>
                    {review.verified && (
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                        Verified Purchase
                      </span>
                    )}
                    <span className="text-gray-500 text-sm">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{review.comment}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <button className="flex items-center gap-1 hover:text-green-600">
                      <ThumbsUp className="w-4 h-4" />
                      Helpful ({review.helpful || 0})
                    </button>
                    <button className="flex items-center gap-1 hover:text-red-600">
                      <ThumbsDown className="w-4 h-4" />
                      Not Helpful ({review.notHelpful || 0})
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}