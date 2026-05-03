import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, qty: number) => void
  clearCart: () => void
  total: () => number
  itemCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => {
        const existing = get().items.find(i => i.variant_id === item.variant_id)
        if (existing) {
          set(s => ({
            items: s.items.map(i =>
              i.variant_id === item.variant_id
                ? { ...i, quantity: i.quantity + 1 }
                : i
            )
          }))
        } else {
          set(s => ({ items: [...s.items, item] }))
        }
      },
      removeItem: (variantId) =>
        set(s => ({ items: s.items.filter(i => i.variant_id !== variantId) })),
      updateQuantity: (variantId, qty) =>
        set(s => ({
          items: qty <= 0
            ? s.items.filter(i => i.variant_id !== variantId)
            : s.items.map(i => i.variant_id === variantId ? { ...i, quantity: qty } : i)
        })),
      clearCart: () => set({ items: [] }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: 'vdmbio-cart' }
  )
)

interface WishlistStore {
  ids: string[]
  toggle: (productId: string) => void
  has: (productId: string) => boolean
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) => set(s => ({
        ids: s.ids.includes(id) ? s.ids.filter(i => i !== id) : [...s.ids, id]
      })),
      has: (id) => get().ids.includes(id),
    }),
    { name: 'vdmbio-wishlist' }
  )
)
