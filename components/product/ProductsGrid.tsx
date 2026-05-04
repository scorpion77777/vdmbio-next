'use client'
import { useMemo } from 'react'
import { ProductCard } from './ProductCard'
import { ALL_PRODUCTS } from '@/lib/products-data'

const PER_PAGE = 12

interface ProductsGridProps {
  search?: string
  category?: string
  page?: number
}

export function ProductsGrid({ search, category, page = 1 }: ProductsGridProps) {
  const filtered = useMemo(() => {
    let list = ALL_PRODUCTS
    if (category) {
      list = list.filter(p => {
        const cat = category.toLowerCase()
        // Match by category slug map
        const catMap: Record<string,string[]> = {
          'antivirals':          ['1'],
          'apoptosis':           ['2'],
          'cancer':              ['3'],
          'enzyme-inhibitors':   ['4'],
          'antibiotics':         ['5'],
          'dna-damage':          ['6'],
          'dna-damage-repair':   ['6'],
          'cholinergics':        ['7'],
          'anticoagulants':      ['8'],
          'intermediates-fine-chemicals': ['9'],
          'fine-chemicals':      ['9'],
          'histaminergics':      ['10'],
          'inorganics':          ['11'],
        }
        const ids = catMap[cat] || []
        return ids.includes(p.category_id)
      })
    }
    if (search) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        (p.cas_number?.toLowerCase().includes(q)) ||
        (p.catalog_number?.toLowerCase().includes(q)) ||
        (p.formula?.toLowerCase().includes(q)) ||
        (p.synonyms?.toLowerCase().includes(q))
      )
    }
    return list
  }, [search, category])

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-500">
          Showing{' '}
          <span className="font-semibold text-slate-900 dark:text-white">
            {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)}
          </span>{' '}
          of{' '}
          <span className="font-semibold text-slate-900 dark:text-white">{filtered.length}</span> products
        </p>
        <select className="text-sm border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-lab-500/30">
          <option>Default sorting</option>
          <option>Name A–Z</option>
          <option>Price: Low to High</option>
          <option>Latest</option>
        </select>
      </div>

      {paginated.length === 0 ? (
        <div className="text-center py-20 text-slate-400">
          <p className="text-lg font-semibold mb-2">No products found</p>
          <p className="text-sm">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-6">
          {paginated.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <a
              key={p}
              href={`?${new URLSearchParams({ ...(search ? { search } : {}), ...(category ? { category } : {}), page: String(p) }).toString()}`}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                p === page
                  ? 'bg-lab-600 text-white pointer-events-none'
                  : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-lab-400'
              }`}
            >
              {p}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}