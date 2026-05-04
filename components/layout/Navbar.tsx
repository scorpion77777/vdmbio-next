'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Heart, User, Search, Menu, X, ChevronDown, FlaskConical } from 'lucide-react'
import { CartBadge } from './CartBadge'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  {
    label: 'Products', href: '/products',
    children: [
      { label: 'All Products', href: '/products' },
      { label: 'Antivirals', href: '/products?category=antivirals' },
      { label: 'Apoptosis', href: '/products?category=apoptosis' },
      { label: 'Cancer Research', href: '/products?category=cancer' },
      { label: 'Enzyme Inhibitors', href: '/products?category=enzyme-inhibitors' },
      { label: 'Antibiotics', href: '/products?category=antibiotics' },
      
    ]
  },
  {
    label: 'Services', href: '/services',
    children: [
      { label: 'Custom Synthesis', href: '/services#custom-synthesis' },
      { label: 'Drug Design & Screening', href: '/services#drug-design' },
    ]
  },
  { label: 'Literature', href: '/literature' },
  { label: 'R&D Program', href: '/rd-program' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 dark:bg-slate-950/95 backdrop-blur-md shadow-lg shadow-lab-500/5' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-gradient-to-br from-lab-500 to-teal-500 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <FlaskConical size={18} className="text-white" />
            </div>
            <div className="leading-none">
              <span className="font-display text-lg font-bold text-lab-700 dark:text-lab-300">VDM</span>
              <span className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase">Biochemicals</span>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map(link => (
              <div key={link.label} className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}>
                <Link href={link.href}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-lab-600 dark:hover:text-lab-400 rounded-md hover:bg-lab-50 dark:hover:bg-lab-950/50 transition-all">
                  {link.label}
                  {link.children && <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                </Link>
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl shadow-xl overflow-hidden">
                      {link.children.map(child => (
                        <Link key={child.label} href={child.href}
                          className="block px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-lab-50 dark:hover:bg-lab-950/50 hover:text-lab-600 transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <Search size={18} />
            </button>
            <Link href="/my-account" className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:flex">
              <Heart size={18} />
            </Link>
            <Link href="/my-account" className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:flex">
              <User size={18} />
            </Link>
            <Link href="/cart" className="relative p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <ShoppingCart size={18} />
              <CartBadge />
            </Link>
            <Link href="/request-quote" className="hidden sm:flex ml-2 px-4 py-2 bg-lab-600 hover:bg-lab-700 text-white text-sm font-medium rounded-lg transition-colors">
              Request Quote
            </Link>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ml-1">
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-slate-200 dark:border-slate-700">
              <div className="py-3 flex gap-2">
                <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search by name, CAS number, formula..."
                  className="flex-1 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm outline-none focus:ring-2 focus:ring-lab-500/50 font-mono" />
                <Link href={`/products?search=${encodeURIComponent(searchQuery)}`} onClick={() => setSearchOpen(false)}
                  className="px-4 py-2.5 bg-lab-600 text-white text-sm font-medium rounded-lg hover:bg-lab-700 transition-colors">
                  Search
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            className="lg:hidden overflow-hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800">
            <nav className="px-4 py-4 space-y-1">
              {NAV_LINKS.map(link => (
                <div key={link.label}>
                  <Link href={link.href} onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-lab-600 rounded-md hover:bg-lab-50">
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {link.children.map(child => (
                        <Link key={child.label} href={child.href} onClick={() => setMobileOpen(false)}
                          className="block px-3 py-1.5 text-xs text-slate-500 dark:text-slate-400 hover:text-lab-600 rounded-md hover:bg-lab-50">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-2">
                <Link href="/request-quote" onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-4 py-2.5 bg-lab-600 text-white text-sm font-medium rounded-lg">
                  Request Quote
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
