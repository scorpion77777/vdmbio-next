'use client'
import { useState } from 'react'
import { ShoppingCart, Heart, FileText } from 'lucide-react'
import { useCartStore, useWishlistStore } from '@/lib/store'
import Link from 'next/link'
import type { Product } from '@/types'

export function AddToCart({ product }: { product: Product & { variants?: any[] } }) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants?.[0])
  const addItem = useCartStore(s => s.addItem)
  const toggle = useWishlistStore(s => s.toggle)
  const inWishlist = useWishlistStore(s => s.has(product.id))

  const handleAdd = () => {
    if (!selectedVariant) return
    addItem({
      product_id: product.id,
      variant_id: selectedVariant.id,
      name: product.name,
      sku: selectedVariant.sku,
      size: selectedVariant.size,
      price: selectedVariant.price,
      quantity: 1,
      image_url: product.image_url,
      cas_number: product.cas_number,
    })
  }

  return (
    <div className="space-y-4">
      {product.variants && product.variants.length > 0 && (
        <div>
          <label className="text-xs text-slate-500 uppercase tracking-wider font-mono block mb-2">Size</label>
          <div className="flex gap-2 flex-wrap">
            {product.variants.map(v => (
              <button key={v.id} onClick={() => setSelectedVariant(v)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                  selectedVariant?.id === v.id
                    ? 'bg-lab-600 text-white border-lab-600'
                    : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-lab-300'
                }`}>
                {v.size} — ${v.price}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={handleAdd}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-lab-600 hover:bg-lab-700 text-white font-medium rounded-xl transition-all hover:shadow-lg hover:shadow-lab-500/25">
          <ShoppingCart size={18} />
          Add to Cart
        </button>
        <button onClick={() => toggle(product.id)}
          className={`p-3.5 rounded-xl border transition-all ${
            inWishlist
              ? 'bg-red-50 border-red-200 text-red-500'
              : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 hover:border-red-300 hover:text-red-400'
          }`}>
          <Heart size={18} className={inWishlist ? 'fill-current' : ''} />
        </button>
        <Link href="/request-quote"
          className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-400 hover:border-lab-300 hover:text-lab-500 transition-all">
          <FileText size={18} />
        </Link>
      </div>
    </div>
  )
}
