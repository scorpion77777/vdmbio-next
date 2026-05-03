'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronRight, FlaskConical, Microscope, Dna } from 'lucide-react'

const SLIDES = [
  {
    headline: 'Enabling Research &\nDevelopment',
    sub: 'Rely on our expertise in your life science research. 700+ innovative biochemicals for cutting-edge science.',
    cta: { label: 'Explore Products', href: '/products' },
    badge: 'Life Science Research',
    icon: FlaskConical,
    accent: 'from-lab-600 to-lab-800',
  },
  {
    headline: '200 New Enzyme\nInhibitors Available',
    sub: 'Our expanding portfolio of enzyme inhibitors and activators covers the full spectrum of biochemical pathways.',
    cta: { label: 'View Enzyme Inhibitors', href: '/products?category=enzyme-inhibitors' },
    badge: 'New Arrivals',
    icon: Microscope,
    accent: 'from-teal-600 to-teal-800',
  },
  {
    headline: 'From Concept to\nManufacturing',
    sub: 'Custom synthesis services backed by PhD scientists with decades of post-doctoral experience.',
    cta: { label: 'Our Services', href: '/services' },
    badge: 'Custom Synthesis',
    icon: Dna,
    accent: 'from-lab-700 to-teal-700',
  },
]

export function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 6000)
    return () => clearInterval(t)
  }, [])

  const slide = SLIDES[current]
  const Icon = slide.icon

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-molecule-pattern opacity-30" />
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className={`absolute inset-0 bg-gradient-to-br ${slide.accent} opacity-10`}
        />
        {/* Floating orbs */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-lab-500/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-float" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <AnimatePresence mode="wait">
              <motion.div key={current}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-lab-500/10 border border-lab-500/20 rounded-full mb-6">
                  <Icon size={14} className="text-lab-400" />
                  <span className="text-xs font-mono text-lab-400 uppercase tracking-widest">{slide.badge}</span>
                </div>
                {/* Headline */}
                <h1 className="font-display text-5xl sm:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6 whitespace-pre-line">
                  {slide.headline}
                </h1>
                {/* Sub */}
                <p className="text-lg text-slate-400 leading-relaxed mb-8 max-w-lg">
                  {slide.sub}
                </p>
                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <Link href={slide.cta.href}
                    className="inline-flex items-center gap-2 px-6 py-3.5 bg-lab-600 hover:bg-lab-700 text-white font-medium rounded-xl transition-all hover:scale-105 hover:shadow-lg hover:shadow-lab-500/25">
                    {slide.cta.label}
                    <ArrowRight size={18} />
                  </Link>
                  <Link href="/request-quote"
                    className="inline-flex items-center gap-2 px-6 py-3.5 border border-slate-700 hover:border-lab-500 text-slate-300 hover:text-white font-medium rounded-xl transition-all">
                    Request Quote
                    <ChevronRight size={18} />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slide dots */}
            <div className="flex gap-2 mt-12">
              {SLIDES.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className={`h-1 rounded-full transition-all ${i === current ? 'bg-lab-400 w-8' : 'bg-slate-700 w-3'}`} />
              ))}
            </div>
          </div>

          {/* Right: Molecule visualization */}
          <div className="hidden lg:flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div key={current}
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="relative w-80 h-80 xl:w-96 xl:h-96">
                {/* Central atom */}
                <div className="absolute inset-1/3 bg-gradient-to-br from-lab-400 to-green-700 rounded-full blur-sm opacity-80 animate-pulse-slow" />
                <div className="absolute inset-1/3 bg-gradient-to-br from-lab-400 to-teal-900 rounded-full" />
                {/* Orbiting elements */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <motion.div key={i}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 12 + i * 2, repeat: Infinity, ease: 'linear' }}
                    style={{ position: 'absolute', inset: 0, transformOrigin: 'center' }}>
                    <div style={{
                      position: 'absolute',
                      top: '50%', left: '50%',
                      transform: `rotate(${deg}deg) translateX(${120 + i * 8}px) translateY(-50%)`,
                    }}>
                      <div className={`w-${3 + (i % 3)} h-${3 + (i % 3)} rounded-full`}
                        style={{
                          width: `${8 + (i % 3) * 4}px`,
                          height: `${8 + (i % 3) * 4}px`,
                          background: i % 2 === 0
                            ? 'rgba(14, 142, 231, 0.7)'
                            : 'rgba(20, 184, 166, 0.7)',
                          boxShadow: `0 0 12px ${i % 2 === 0 ? 'rgba(14,142,231,0.5)' : 'rgba(20,184,166,0.5)'}`,
                        }} />
                    </div>
                  </motion.div>
                ))}
                {/* Connecting lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 400">
                  <circle cx="200" cy="200" r="120" stroke="#0e8ee7" strokeWidth="1" fill="none" strokeDasharray="4 4" />
                  <circle cx="200" cy="200" r="150" stroke="#14b8a6" strokeWidth="0.5" fill="none" strokeDasharray="2 6" />
                </svg>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-8 bg-gradient-to-b from-transparent via-lab-500 to-transparent" />
        <span className="text-[10px] font-mono text-black-600 uppercase tracking-widest">Scroll</span>
      </div>
    </section>
  )
}
