import { notFound } from 'next/navigation'
import { ALL_PRODUCTS } from '@/lib/products-data'
import { MoleculeImage } from '@/components/product/MoleculeImage'
import { AddToCart } from '@/components/product/AddToCart'
import { ProductCard } from '@/components/product/ProductCard'
import { formatPrice } from '@/lib/utils'
import type { Metadata } from 'next'
import Link from 'next/link'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return ALL_PRODUCTS.map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = ALL_PRODUCTS.find(p => p.slug === slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: `${product.name} | VDM Biochemicals`,
    description: product.description || `${product.name} — CAS: ${product.cas_number}. Research chemical from VDM Biochemicals.`,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = ALL_PRODUCTS.find(p => p.slug === slug)

  if (!product) notFound()

  // Related products (same category, exclude self)
  const related = ALL_PRODUCTS
    .filter(p => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 3)

  const specs = [
    { label: 'Catalog Number', value: product.catalog_number },
    { label: 'CAS Number', value: product.cas_number },
    { label: 'Molecular Formula', value: product.formula },
    { label: 'Molecular Weight', value: product.molecular_weight ? `${product.molecular_weight} g/mol` : null },
    { label: 'Purity', value: product.purity },
    { label: 'Appearance', value: product.appearance },
    { label: 'Solubility', value: product.solubility },
    { label: 'Storage', value: product.storage },
    { label: 'Synonyms', value: product.synonyms },
  ].filter(s => s.value && s.value !== 'N/A')

  // Build size variants from price range
  const variants = product.price_min ? [
    { id: `${product.id}-s`, product_id: product.id, sku: `${product.catalog_number}-S`, size: '5mg', price: product.price_min },
    ...(product.price_max && product.price_max !== product.price_min
      ? [{ id: `${product.id}-l`, product_id: product.id, sku: `${product.catalog_number}-L`, size: '25mg', price: product.price_max }]
      : []
    ),
  ] : []

  return (
    <div className="pt-24 min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">

        {/* Breadcrumb */}
        <nav className="text-xs font-mono text-slate-400 mb-8 flex gap-2 items-center flex-wrap">
          <Link href="/" className="hover:text-lab-500 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-lab-500 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-slate-600 dark:text-slate-300">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left: Image */}
          <div>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 mb-3">
              <MoleculeImage
                casNumber={product.cas_number}
                fallbackUrl={product.image_url}
                name={product.name}
                size="lg"
              />
            </div>
            {product.cas_number && (
              <p className="text-xs text-center text-slate-400 flex items-center justify-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 bg-teal-400 rounded-full" />
                High-resolution structure via PubChem (CAS: <span className="font-mono">{product.cas_number}</span>)
              </p>
            )}
          </div>

          {/* Right: Info */}
          <div>
            {/* Catalog badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-lab-50 dark:bg-lab-950/50 border border-lab-200 dark:border-lab-800 rounded-md mb-4">
              <span className="text-xs font-mono text-lab-600 dark:text-lab-400">{product.catalog_number}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white mb-4 leading-tight">
              {product.name}
            </h1>

            {product.description && (
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 text-sm">
                {product.description}
              </p>
            )}

            {/* Price */}
            {product.price_min && (
              <div className="mb-6 p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-sm text-slate-400 block mb-1">Price from</span>
                <span className="text-2xl font-bold text-slate-900 dark:text-white">
                  {formatPrice(product.price_min)}
                  {product.price_max && product.price_max !== product.price_min && (
                    <span className="text-slate-400 text-lg"> – {formatPrice(product.price_max)}</span>
                  )}
                </span>
              </div>
            )}

            {/* Add to cart */}
            <AddToCart product={{ ...product, variants }} />

            {/* Quick specs */}
            <div className="mt-8 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="px-5 py-3 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Specifications</h2>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {specs.map(spec => (
                  <div key={spec.label} className="flex flex-col sm:flex-row px-4 sm:px-5 py-3 gap-1 sm:gap-4">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wide sm:w-36 sm:shrink-0 sm:pt-0.5">{spec.label}</span>
                    <span className="text-sm font-mono text-slate-700 dark:text-slate-300 break-all">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Variants — responsive cards on mobile, table on desktop */}
        {variants.length > 0 && (
          <div className="mb-16 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <div className="px-4 sm:px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Available Sizes & Pricing</h2>
            </div>

            {/* Mobile: card layout */}
            <div className="sm:hidden divide-y divide-slate-100 dark:divide-slate-800">
              {variants.map(v => (
                <div key={v.id} className="px-4 py-4 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900 dark:text-white text-sm">{v.size}</p>
                    <p className="font-mono text-[11px] text-slate-400 truncate">{v.sku}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{formatPrice(v.price)}</span>
                    <Link href="/request-quote"
                      className="px-3 py-1.5 bg-lab-600 hover:bg-lab-700 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap">
                      Request Quote
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop: table layout */}
            <table className="hidden sm:table w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100 dark:border-slate-800">
                  <th className="text-left px-6 py-3 text-xs font-mono text-slate-400 uppercase">SKU</th>
                  <th className="text-left px-6 py-3 text-xs font-mono text-slate-400 uppercase">Size</th>
                  <th className="text-left px-6 py-3 text-xs font-mono text-slate-400 uppercase">Price</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {variants.map(v => (
                  <tr key={v.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-slate-400">{v.sku}</td>
                    <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">{v.size}</td>
                    <td className="px-6 py-4 font-bold text-slate-900 dark:text-white">{formatPrice(v.price)}</td>
                    <td className="px-6 py-4 text-right">
                      <Link href="/request-quote"
                        className="px-4 py-1.5 bg-lab-600 hover:bg-lab-700 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap">
                        Request Quote
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}