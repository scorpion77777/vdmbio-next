'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Heart, ShoppingCart, Eye } from 'lucide-react'
import { MoleculeImage } from './MoleculeImage'
import { useCartStore, useWishlistStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [mounted, setMounted] = useState(false)
  const toggleWishlist = useWishlistStore(s => s.toggle)
  const inWishlist = useWishlistStore(s => s.has(product.id))
  const addItem = useCartStore(s => s.addItem)

  useEffect(() => { setMounted(true) }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="product-card group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col w-full"
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        <MoleculeImage
          casNumber={product.cas_number}
          fallbackUrl={product.image_url}
          name={product.name}
          size="md"
          className="group-hover:scale-105 transition-transform duration-300"
        />
        {/* Overlay actions — always visible on touch devices */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <Link href={`/products/${product.slug}`}
            className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:bg-lab-50 transition-colors">
            <Eye size={16} className="text-lab-600" />
          </Link>
          <button
            onClick={() => toggleWishlist(product.id)}
            className="p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:bg-lab-50 transition-colors">
            <Heart size={16} className={mounted && inWishlist ? 'text-red-500 fill-current' : 'text-lab-600'} />
          </button>
        </div>
        {/* Catalog badge */}
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-md border border-slate-200 dark:border-slate-700 max-w-[60%]">
          <span className="text-[10px] font-mono text-slate-500 truncate block">{product.catalog_number}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        <Link href={`/products/${product.slug}`} className="group/title">
          <h3 className="font-display text-sm sm:text-base font-semibold text-slate-900 dark:text-white group-hover/title:text-lab-600 transition-colors line-clamp-2 mb-2 leading-snug">
            {product.name}
          </h3>
        </Link>

        {/* Description */}
        {product.description && (
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-3">
            {product.description}
          </p>
        )}

        {/* Specs — 2 col on all sizes, truncate long values */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-2 mb-3 flex-1">
          {product.cas_number && product.cas_number !== 'N/A' && (
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">CAS</span>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 truncate block">{product.cas_number}</span>
            </div>
          )}
          {product.formula && (
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Formula</span>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 truncate block">{product.formula}</span>
            </div>
          )}
          {product.purity && (
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Purity</span>
              <span className="text-xs font-mono text-slate-600 dark:text-slate-400 truncate block">{product.purity}</span>
            </div>
          )}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-800 mt-auto">
          <div className="min-w-0">
            {product.price_min ? (
              <div className="flex flex-wrap items-baseline gap-x-1">
                <span className="text-sm font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                  {formatPrice(product.price_min)}
                </span>
                {product.price_max && product.price_max !== product.price_min && (
                  <span className="text-xs text-slate-400 whitespace-nowrap">– {formatPrice(product.price_max)}</span>
                )}
              </div>
            ) : (
              <span className="text-xs text-slate-400 italic">Contact for price</span>
            )}
          </div>
          <Link
            href={`/products/${product.slug}`}
            className="shrink-0 flex items-center gap-1 px-2.5 sm:px-3 py-1.5 bg-lab-600 hover:bg-lab-700 text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
          >
            <ShoppingCart size={11} />
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  )
}