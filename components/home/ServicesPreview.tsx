'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { FlaskConical, Cpu, ArrowRight } from 'lucide-react'

const SERVICES = [
  {
    icon: FlaskConical,
    title: 'Custom Synthesis',
    desc: 'From product concept to manufacturing. Our PhD team handles complex multi-step syntheses with precision and confidentiality.',
    href: '/services#custom-synthesis',
    color: 'text-lab-400',
    bg: 'from-lab-500/10 to-lab-600/5',
  },
  {
    icon: Cpu,
    title: 'Drug Design & Virtual Screening',
    desc: 'Computational chemistry expertise combined with experimental validation for accelerated hit-to-lead discovery.',
    href: '/services#drug-design',
    color: 'text-teal-400',
    bg: 'from-teal-500/10 to-teal-600/5',
  },
]

export function ServicesPreview() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <p className="text-xs font-mono text-lab-500 uppercase tracking-widest mb-3">Our Services</p>
          <h2 className="font-display text-4xl font-bold text-white mb-4">
            From Concept to Manufacturing
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Beyond our catalog — custom solutions backed by decades of chemistry expertise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {SERVICES.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div key={s.title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                <Link href={s.href}
                  className={`group block p-8 rounded-2xl bg-gradient-to-br ${s.bg} border border-slate-800 hover:border-slate-600 transition-all`}>
                  <Icon size={28} className={`${s.color} mb-5`} />
                  <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-lab-300 transition-colors">
                    {s.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed mb-6">{s.desc}</p>
                  <span className={`inline-flex items-center gap-1.5 text-sm font-medium ${s.color} group-hover:gap-3 transition-all`}>
                    Learn more <ArrowRight size={16} />
                  </span>
                </Link>
              </motion.div>
            )
          })}
        </div>

        <div className="text-center">
          <Link href="/request-quote"
            className="inline-flex items-center gap-2 px-8 py-4 bg-lab-600 hover:bg-lab-700 text-white font-medium rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-lab-500/25">
            Request a Quote
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
