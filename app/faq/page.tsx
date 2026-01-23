'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import Header from '@/components/Header'

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      question: 'How discreet is your packaging?',
      answer: 'All orders are shipped in plain, unmarked packaging with no branding or product information visible. The return address is generic and does not indicate the nature of the contents.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Bitcoin for maximum privacy and convenience.'
    },
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 5-7 business days. Express shipping (2-3 days) and overnight shipping options are available at checkout.'
    },
    {
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for unused items in original packaging. Hygiene products cannot be returned for health reasons. See our Returns page for full details.'
    },
    {
      question: 'Are your products body-safe?',
      answer: 'Yes! All our products are made from body-safe, non-toxic materials including medical-grade silicone, stainless steel, and premium fabrics.'
    },
    {
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship worldwide. International shipping typically takes 7-14 business days depending on your location.'
    },
    {
      question: 'How do I track my order?',
      answer: 'Once your order ships, you will receive a tracking number via email. You can also track your order from your account dashboard.'
    },
    {
      question: 'Is my personal information secure?',
      answer: 'Absolutely. We use industry-standard SSL encryption and never share your personal information with third parties. See our Privacy Policy for details.'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our products, shipping, and policies.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-lg">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 transition-transform ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-600">
                  {faq.answer}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <a href="/contact" className="bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 inline-block">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}