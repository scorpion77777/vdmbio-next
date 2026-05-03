import Link from 'next/link'
import { FlaskConical, Mail, Phone, MapPin, Clock } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 group mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-lab-500 to-teal-500 rounded-lg flex items-center justify-center">
                <FlaskConical size={20} className="text-white" />
              </div>
              <div className="leading-none">
                <span className="font-display text-xl font-bold text-white">VDM</span>
                <span className="block text-[10px] font-mono tracking-widest text-slate-500 uppercase">Biochemicals</span>
              </div>
            </Link>
            <p className="text-sm text-slate-500 leading-relaxed">
              Specializing in innovative biochemicals and specialty products for life science research since 2009.
            </p>
            <div className="mt-6 flex gap-3">
              {['L', 'T', 'F'].map(s => (
                <div key={s} className="w-8 h-8 bg-slate-800 hover:bg-lab-800 rounded-lg flex items-center justify-center cursor-pointer transition-colors text-xs font-bold text-slate-500 hover:text-lab-400">
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Products', href: '/products' },
                { label: 'Services', href: '/services' },
                { label: 'Literature', href: '/literature' },
                { label: 'R&D Program', href: '/rd-program' },
                { label: 'Request Quote', href: '/request-quote' },
              ].map(link => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-slate-500 hover:text-lab-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Categories</h4>
            <ul className="space-y-2.5">
              {[
                'Antivirals', 'Apoptosis', 'Cancer Research',
                'Enzyme Inhibitors', 'Antibiotics', 'Fine Chemicals'
              ].map(cat => (
                <li key={cat}>
                  <Link href={`/products?category=${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-slate-500 hover:text-lab-400 transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex gap-3 text-sm">
                <MapPin size={15} className="text-lab-500 shrink-0 mt-0.5" />
                <span className="text-slate-500">17 Spectrum Pointe Dr., Suite 501<br />Lake Forest, CA 92630, USA</span>
              </li>
              <li className="flex gap-3 text-sm">
                <Phone size={15} className="text-lab-500 shrink-0" />
                <a href="tel:14407150144" className="text-slate-500 hover:text-lab-400 transition-colors">1-440-715-0144</a>
              </li>
              <li className="flex gap-3 text-sm">
                <Mail size={15} className="text-lab-500 shrink-0" />
                <a href="mailto:sales@vdmbio.com" className="text-slate-500 hover:text-lab-400 transition-colors">sales@vdmbio.com</a>
              </li>
              <li className="flex gap-3 text-sm">
                <Clock size={15} className="text-lab-500 shrink-0" />
                <span className="text-slate-500">Mon–Fri: 9am–5pm PST</span>
              </li>
            </ul>
            {/* Newsletter */}
            <div className="mt-6">
              <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Newsletter</p>
              <div className="flex gap-2">
                <input type="email" placeholder="your@email.com"
                  className="flex-1 min-w-0 px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 placeholder-slate-600 outline-none focus:border-lab-500 transition-colors" />
                <button className="px-3 py-2 bg-lab-600 hover:bg-lab-700 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-600">© 2009–2026 VDM Biochemicals, Inc. All Rights Reserved.</p>
          <div className="flex gap-4 text-xs">
            <Link href="/privacy-policy" className="text-slate-600 hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="/help" className="text-slate-600 hover:text-slate-400 transition-colors">Help</Link>
            <Link href="/payments" className="text-slate-600 hover:text-slate-400 transition-colors">Payments</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
