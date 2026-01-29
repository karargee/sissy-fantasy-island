'use client'

import { motion } from 'framer-motion'
import { Ruler } from 'lucide-react'
import Header from '@/components/Header'

const sizeCharts = {
  costumes: [
    { size: 'XS', chest: '30-32"', waist: '24-26"', hips: '32-34"', height: '5\'0"-5\'4"' },
    { size: 'S', chest: '32-34"', waist: '26-28"', hips: '34-36"', height: '5\'4"-5\'7"' },
    { size: 'M', chest: '34-36"', waist: '28-30"', hips: '36-38"', height: '5\'7"-5\'10"' },
    { size: 'L', chest: '36-38"', waist: '30-32"', hips: '38-40"', height: '5\'10"-6\'1"' },
    { size: 'XL', chest: '38-40"', waist: '32-34"', hips: '40-42"', height: '6\'1"-6\'3"' },
    { size: '2XL', chest: '40-42"', waist: '34-36"', hips: '42-44"', height: '6\'3"-6\'5"' },
    { size: '3XL', chest: '42-44"', waist: '36-38"', hips: '44-46"', height: '6\'5"+"' }
  ],
  lingerie: [
    { size: 'XS', chest: '30-32"', waist: '24-26"', hips: '32-34"' },
    { size: 'S', chest: '32-34"', waist: '26-28"', hips: '34-36"' },
    { size: 'M', chest: '34-36"', waist: '28-30"', hips: '36-38"' },
    { size: 'L', chest: '36-38"', waist: '30-32"', hips: '38-40"' },
    { size: 'XL', chest: '38-40"', waist: '32-34"', hips: '40-42"' },
    { size: '2XL', chest: '40-42"', waist: '34-36"', hips: '42-44"' }
  ],
  shoes: [
    { size: 'US 6', eu: '36-37', uk: '4', length: '9.25"' },
    { size: 'US 7', eu: '37-38', uk: '5', length: '9.5"' },
    { size: 'US 8', eu: '38-39', uk: '6', length: '9.75"' },
    { size: 'US 9', eu: '39-40', uk: '7', length: '10"' },
    { size: 'US 10', eu: '40-41', uk: '8', length: '10.25"' },
    { size: 'US 11', eu: '41-42', uk: '9', length: '10.5"' },
    { size: 'US 12', eu: '42-43', uk: '10', length: '10.75"' }
  ]
}

export default function SizeGuidePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Header currentPage="size-guide" />
      <div className="py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Size Guide
            </h1>
            <p className="text-gray-600">Find your perfect fit with our comprehensive sizing charts</p>
          </motion.div>

          {/* How to Measure */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <Ruler className="w-8 h-8 text-pink-500" />
              <h2 className="text-2xl font-bold text-pink-600">How to Measure</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-4 bg-pink-50 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Chest</h3>
                <p className="text-sm text-gray-700">Measure around the fullest part of your chest, keeping the tape parallel to the floor.</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Waist</h3>
                <p className="text-sm text-gray-700">Measure around your natural waistline, keeping the tape comfortably loose.</p>
              </div>
              <div className="p-4 bg-pink-50 rounded-lg">
                <h3 className="font-bold text-lg mb-2">Hips</h3>
                <p className="text-sm text-gray-700">Measure around the fullest part of your hips, approximately 8" below your waist.</p>
              </div>
            </div>
          </motion.div>

          {/* Costumes Size Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Costumes & Dresses</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-pink-100">
                    <th className="px-4 py-3 text-left font-semibold">Size</th>
                    <th className="px-4 py-3 text-left font-semibold">Chest</th>
                    <th className="px-4 py-3 text-left font-semibold">Waist</th>
                    <th className="px-4 py-3 text-left font-semibold">Hips</th>
                    <th className="px-4 py-3 text-left font-semibold">Height</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeCharts.costumes.map((row, i) => (
                    <tr key={row.size} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-4 py-3 font-semibold text-pink-600">{row.size}</td>
                      <td className="px-4 py-3">{row.chest}</td>
                      <td className="px-4 py-3">{row.waist}</td>
                      <td className="px-4 py-3">{row.hips}</td>
                      <td className="px-4 py-3">{row.height}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Lingerie Size Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Lingerie & Intimates</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-purple-100">
                    <th className="px-4 py-3 text-left font-semibold">Size</th>
                    <th className="px-4 py-3 text-left font-semibold">Chest</th>
                    <th className="px-4 py-3 text-left font-semibold">Waist</th>
                    <th className="px-4 py-3 text-left font-semibold">Hips</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeCharts.lingerie.map((row, i) => (
                    <tr key={row.size} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-4 py-3 font-semibold text-purple-600">{row.size}</td>
                      <td className="px-4 py-3">{row.chest}</td>
                      <td className="px-4 py-3">{row.waist}</td>
                      <td className="px-4 py-3">{row.hips}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Shoes Size Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-pink-600 mb-6">Shoes & Heels</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-pink-100">
                    <th className="px-4 py-3 text-left font-semibold">US Size</th>
                    <th className="px-4 py-3 text-left font-semibold">EU Size</th>
                    <th className="px-4 py-3 text-left font-semibold">UK Size</th>
                    <th className="px-4 py-3 text-left font-semibold">Foot Length</th>
                  </tr>
                </thead>
                <tbody>
                  {sizeCharts.shoes.map((row, i) => (
                    <tr key={row.size} className={i % 2 === 0 ? 'bg-gray-50' : ''}>
                      <td className="px-4 py-3 font-semibold text-pink-600">{row.size}</td>
                      <td className="px-4 py-3">{row.eu}</td>
                      <td className="px-4 py-3">{row.uk}</td>
                      <td className="px-4 py-3">{row.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl font-bold mb-4">Sizing Tips</h3>
            <ul className="space-y-2">
              <li>• If you're between sizes, we recommend sizing up for comfort</li>
              <li>• Measurements are approximate and may vary by manufacturer</li>
              <li>• Check individual product pages for specific sizing notes</li>
              <li>• Contact us if you need help choosing the right size</li>
              <li>• Consider body shape and personal preference when selecting sizes</li>
            </ul>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
