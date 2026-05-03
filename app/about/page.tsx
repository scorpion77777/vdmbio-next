'use client'
import { motion } from 'framer-motion'
import { FlaskConical, Microscope, Users, Award } from 'lucide-react'

export default function AboutPage() {
  const values = [
    { icon: FlaskConical, title: 'Innovation', desc: 'Pioneering complex and emerging technologies that deliver value-adding products.' },
    { icon: Microscope, title: 'Research Excellence', desc: 'PhD scientists with post-doctoral experience in chemistry and biochemistry.' },
    { icon: Users, title: 'Customer Focus', desc: 'Direct, honest, results-oriented approach to serving research institutions worldwide.' },
    { icon: Award, title: 'Quality First', desc: 'HPLC-verified purity standards with consistent delivery and competitive pricing.' },
  ]

  return (
    <div className="pt-24 min-h-screen">
      {/* Hero */}
      <section className="bg-slate-950 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-xs font-mono text-lab-400 uppercase tracking-widest mb-4">About Us</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="font-display text-5xl font-bold text-white mb-6">
            VDM Biochemicals
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-slate-400 leading-relaxed">
            A dynamically developing company specializing in the development, manufacture, and distribution of
            innovative chemicals, analytical reagents, and specialty products for life science research.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="text-xs font-mono text-lab-500 uppercase tracking-widest mb-3">Mission Statement</p>
              <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Beyond Manufacturing
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                We see our mission as not only that of toll and custom manufacturer, but as a trade supplier where we can
                reach the end-user market with high quality innovative technologies, services and products based on our
                research and development programs.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Innovation and a strong chemistry foundation enable us to develop leading market positions and create
                long-lasting value for our customers.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="grid grid-cols-2 gap-4">
              {values.map((v, i) => {
                const Icon = v.icon
                return (
                  <motion.div key={v.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="p-5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                    <Icon size={22} className="text-lab-500 mb-3" />
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm mb-1">{v.title}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
                  </motion.div>
                )
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Expertise */}
      <section className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-mono text-lab-500 uppercase tracking-widest mb-3">Our Expertise</p>
            <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white">Research Areas</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {['Drug Discovery', 'Cancer Research', 'Molecular Biology', 'Microbiology', 'Virology', 'Biochemistry'].map((area, i) => (
              <motion.div key={area} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-center">
                <div className="w-10 h-10 bg-gradient-to-br from-lab-500 to-teal-500 rounded-xl mx-auto mb-3 flex items-center justify-center">
                  <FlaskConical size={18} className="text-white" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{area}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
