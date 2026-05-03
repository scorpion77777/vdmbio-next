'use client'
import { useCartStore } from '@/lib/store'
import { formatPrice } from '@/lib/utils'
import { X, ShoppingCart, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { MoleculeImage } from '@/components/product/MoleculeImage'

export function CartDrawer() {
  // Cart drawer — rendered as slide-in via CSS class toggling
  // In a real app, wire this to a global open state
  return null // Placeholder — integrate with zustand open state
}
