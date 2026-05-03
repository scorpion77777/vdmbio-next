'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const CATEGORIES = [
  { label: 'All Products', value: '' },
  { label: 'Antivirals', value: 'antivirals' },
  { label: 'Apoptosis', value: 'apoptosis' },
  { label: 'Cancer Research', value: 'cancer' },
  { label: 'Enzyme Inhibitors', value: 'enzyme-inhibitors' },
  { label: 'Antibiotics', value: 'antibiotics' },
  { label: 'DNA Damage/Repair', value: 'dna-damage' },
  { label: 'Fine Chemicals', value: 'fine-chemicals' },
  { label: 'Anticoagulants', value: 'anticoagulants' },
  { label: 'Cholinergics', value: 'cholinergics' },
]

export function ProductFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [open, setOpen] = useState(true)
  const active = searchParams.get('category') || ''

  const setCategory = (val: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (val) params.set('category', val)
    else params.delete('category')
    params.delete('page')
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 sticky top-24">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full mb-3">
        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">Category</span>
        <ChevronDown size={14} className={`text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="space-y-0.5">
          {CATEGORIES.map(cat => (
            <button key={cat.value} onClick={() => setCategory(cat.value)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                active === cat.value
                  ? 'bg-lab-50 dark:bg-lab-950/50 text-lab-600 dark:text-lab-400 font-medium'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}>
              {cat.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
