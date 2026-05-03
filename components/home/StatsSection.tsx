'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const STATS = [
  { value: '700+', label: 'Products Available', desc: 'Constantly growing catalog' },
  { value: '15+', label: 'Years of Excellence', desc: 'Since 2009' },
  { value: '200+', label: 'New Enzyme Inhibitors', desc: 'Recently added' },
  { value: '98%', label: 'Purity Standards', desc: 'HPLC verified' },
]

export function StatsSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="bg-lab-950 border-y border-lab-900/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((stat, i) => (
            <motion.div key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-center">
              <div className="font-display text-4xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm font-semibold text-lab-300 mb-0.5">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
