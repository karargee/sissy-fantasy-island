'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Ruler, User, Info } from 'lucide-react'
import { useState } from 'react'

interface SizeGuideProps {
  isOpen: boolean
  onClose: () => void
  category: string
}

const sizeCharts = {
  costumes: {
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    measurements: [
      { size: 'XS', bust: '32-34', waist: '24-26', hips: '34-36' },
      { size: 'S', bust: '34-36', waist: '26-28', hips: '36-38' },
      { size: 'M', bust: '36-38', waist: '28-30', hips: '38-40' },
      { size: 'L', bust: '38-40', waist: '30-32', hips: '40-42' },
      { size: 'XL', bust: '40-42', waist: '32-34', hips: '42-44' },
      { size: 'XXL', bust: '42-44', waist: '34-36', hips: '44-46' }
    ]
  },
  accessories: {
    sizes: ['One Size', 'S/M', 'L/XL'],
    measurements: [
      { size: 'One Size', description: 'Adjustable fit for most sizes' },
      { size: 'S/M', description: 'Fits sizes XS-M' },
      { size: 'L/XL', description: 'Fits sizes L-XXL' }
    ]
  }
}

export default function SizeGuide({ isOpen, onClose, category }: SizeGuideProps) {
  const [measurements, setMeasurements] = useState({
    bust: '',
    waist: '',
    hips: ''
  })
  const [recommendedSize, setRecommendedSize] = useState('')

  const calculateSize = () => {
    const bust = parseFloat(measurements.bust)
    const waist = parseFloat(measurements.waist)
    const hips = parseFloat(measurements.hips)

    if (!bust || !waist || !hips) return

    const chart = sizeCharts[category as keyof typeof sizeCharts]
    if (!chart || !chart.measurements) return

    for (const size of chart.measurements) {
      if ('bust' in size) {
        const [bustMin, bustMax] = size.bust.split('-').map(Number)
        const [waistMin, waistMax] = size.waist.split('-').map(Number)
        const [hipsMin, hipsMax] = size.hips.split('-').map(Number)

        if (bust >= bustMin && bust <= bustMax &&
            waist >= waistMin && waist <= waistMax &&
            hips >= hipsMin && hips <= hipsMax) {
          setRecommendedSize(size.size)
          return
        }
      }
    }
    setRecommendedSize('Custom fit recommended')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <Ruler className="w-6 h-6" />
                Size Guide & Fitting Tool
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Size Chart */}
                <div>
                  <h3 className="text-xl font-bold mb-4">Size Chart</h3>
                  {sizeCharts[category as keyof typeof sizeCharts] ? (
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-pink-50 dark:bg-pink-900/20">
                            <th className="border border-gray-300 p-3 text-left">Size</th>
                            {category === 'costumes' ? (
                              <>
                                <th className="border border-gray-300 p-3 text-left">Bust (inches)</th>
                                <th className="border border-gray-300 p-3 text-left">Waist (inches)</th>
                                <th className="border border-gray-300 p-3 text-left">Hips (inches)</th>
                              </>
                            ) : (
                              <th className="border border-gray-300 p-3 text-left">Description</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {sizeCharts[category as keyof typeof sizeCharts].measurements.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                              <td className="border border-gray-300 p-3 font-semibold">{row.size}</td>
                              {category === 'costumes' && 'bust' in row ? (
                                <>
                                  <td className="border border-gray-300 p-3">{row.bust}</td>
                                  <td className="border border-gray-300 p-3">{row.waist}</td>
                                  <td className="border border-gray-300 p-3">{row.hips}</td>
                                </>
                              ) : (
                                <td className="border border-gray-300 p-3">{'description' in row ? row.description : ''}</td>
                              )}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-gray-500">Size chart not available for this category.</p>
                  )}
                </div>

                {/* Fitting Tool */}
                {category === 'costumes' && (
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Find Your Size
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Bust (inches)</label>
                        <input
                          type="number"
                          value={measurements.bust}
                          onChange={(e) => setMeasurements({...measurements, bust: e.target.value})}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="Enter bust measurement"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Waist (inches)</label>
                        <input
                          type="number"
                          value={measurements.waist}
                          onChange={(e) => setMeasurements({...measurements, waist: e.target.value})}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="Enter waist measurement"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Hips (inches)</label>
                        <input
                          type="number"
                          value={measurements.hips}
                          onChange={(e) => setMeasurements({...measurements, hips: e.target.value})}
                          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                          placeholder="Enter hip measurement"
                        />
                      </div>
                      <button
                        onClick={calculateSize}
                        className="w-full bg-pink-500 text-white py-3 rounded-lg font-semibold hover:bg-pink-600 transition-colors"
                      >
                        Find My Size
                      </button>
                      {recommendedSize && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200"
                        >
                          <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                            Recommended Size
                          </h4>
                          <p className="text-green-700 dark:text-green-400 text-lg font-bold">
                            {recommendedSize}
                          </p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Measuring Tips */}
              <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2 flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  How to Measure
                </h4>
                <ul className="text-blue-700 dark:text-blue-400 text-sm space-y-1">
                  <li>• <strong>Bust:</strong> Measure around the fullest part of your chest</li>
                  <li>• <strong>Waist:</strong> Measure around the narrowest part of your waist</li>
                  <li>• <strong>Hips:</strong> Measure around the fullest part of your hips</li>
                  <li>• Use a flexible measuring tape and keep it parallel to the floor</li>
                  <li>• Measure over undergarments for the most accurate fit</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}