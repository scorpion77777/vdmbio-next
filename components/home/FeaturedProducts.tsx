import Link from 'next/link'
import { ProductCard } from '@/components/product/ProductCard'
import { ALL_PRODUCTS } from '@/lib/products-data'

// Pick 6 featured products from across different categories
const FEATURED_IDS = ['39', '1', '9', '21', '29', '66']

export function FeaturedProducts() {
  const featured = FEATURED_IDS
    .map(id => ALL_PRODUCTS.find(p => p.id === id))
    .filter(Boolean) as typeof ALL_PRODUCTS

  return (
    <section className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-mono text-lab-500 uppercase tracking-widest mb-2">Featured</p>
            <h2 className="font-display text-4xl font-bold text-slate-900 dark:text-white">Popular Products</h2>
          </div>
          <Link href="/products" className="text-sm font-medium text-lab-600 hover:text-lab-700 dark:text-lab-400 dark:hover:text-lab-300 transition-colors hidden sm:block">
            View all {ALL_PRODUCTS.length}+ products →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
        <div className="text-center mt-10 sm:hidden">
          <Link href="/products" className="inline-flex items-center gap-2 px-6 py-3 border border-lab-300 dark:border-lab-700 text-lab-600 dark:text-lab-400 text-sm font-medium rounded-xl hover:bg-lab-50 dark:hover:bg-lab-950/50 transition-colors">
            View all products →
          </Link>
        </div>
      </div>
    </section>
  )
}
