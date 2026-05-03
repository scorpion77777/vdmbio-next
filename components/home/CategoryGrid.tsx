'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FlaskConical, Pill, Dna, Microscope, Atom, TestTube, Shield, Activity } from 'lucide-react'

const CATEGORIES = [
  { name: 'Antivirals', href: '/products?category=antivirals', icon: Shield, count: '80+', color: 'from-blue-500 to-blue-700' },
  { name: 'Apoptosis', href: '/products?category=apoptosis', icon: Activity, count: '60+', color: 'from-purple-500 to-purple-700' },
  { name: 'Cancer Research', href: '/products?category=cancer', icon: Microscope, count: '120+', color: 'from-red-500 to-red-700' },
  { name: 'Enzyme Inhibitors', href: '/products?category=enzyme-inhibitors', icon: TestTube, count: '200+', color: 'from-teal-500 to-teal-700' },
  { name: 'Antibiotics', href: '/products?category=antibiotics', icon: Pill, count: '45+', color: 'from-green-500 to-green-700' },
  { name: 'DNA Damage/Repair', href: '/products?category=dna-damage', icon: Dna, count: '30+', color: 'from-orange-500 to-orange-700' },
  { name: 'Fine Chemicals', href: '/products?category=fine-chemicals', icon: Atom, count: '90+', color: 'from-pink-500 to-pink-700' },
  { name: 'Anticoagulants', href: '/products?category=anticoagulants', icon: FlaskConical, count: '25+', color: 'from-indigo-500 to-indigo-700' },
]

export function CategoryGrid() {
  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-xs font-mono text-lab-500 uppercase tracking-widest mb-3">Browse by Research Area</motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl font-bold text-slate-900 dark:text-white">
            Find Your Compound
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div key={cat.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}>
                <Link href={cat.href}
                  className="group relative block p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-lab-300 dark:hover:border-lab-700 hover:shadow-lg hover:shadow-lab-500/10 transition-all overflow-hidden">
                  {/* Gradient accent */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                  <div className={`w-10 h-10 bg-gradient-to-br ${cat.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="font-semibold text-sm text-slate-900 dark:text-white mb-1 group-hover:text-lab-600 dark:group-hover:text-lab-400 transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">{cat.count} products</span>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-8">
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-medium text-lab-600 hover:text-lab-700 dark:text-lab-400 dark:hover:text-lab-300 transition-colors">
            View all categories →
          </Link>
        </div>
      </div>
    </section>
  )
}
