import { Suspense } from 'react'
import { ProductFilters } from '@/components/product/ProductFilters'
import { ProductsGrid} from '@/components/product/ProductsGrid'

export const metadata = { title: 'Products | VDM Biochemicals' }

interface Props {
  searchParams: Promise<{ search?: string; category?: string; page?: string }>
}

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams
  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="mb-8">
          <p className="text-xs font-mono text-lab-500 uppercase tracking-widest mb-2">Catalog</p>
          <h1 className="font-display text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {params.search ? `Results for "${params.search}"` : 'All Products'}
          </h1>
          <p className="text-slate-500 text-sm">Research chemicals with PubChem-sourced molecular structures</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-64 shrink-0">
            <ProductFilters />
          </aside>
          <div className="flex-1">
            <Suspense fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 h-80 animate-pulse" />
                ))}
              </div>
            }>
              <ProductsGrid
                search={params.search}
                category={params.category}
                page={Number(params.page ?? 1)}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
