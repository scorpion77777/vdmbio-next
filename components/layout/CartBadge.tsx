'use client'
import { useEffect, useState } from 'react'
import { useCartStore } from '@/lib/store'

export function CartBadge() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    // Read initial persisted value after hydration
    setCount(useCartStore.getState().itemCount())

    // Subscribe to future changes
    const unsub = useCartStore.subscribe(state => {
      setCount(state.itemCount())
    })
    return unsub
  }, [])

  if (count === 0) return null

  return (
    <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-lab-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
      {count}
    </span>
  )
}
