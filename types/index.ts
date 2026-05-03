export interface Product {
  id: string
  name: string
  slug: string
  catalog_number: string
  cas_number: string | null
  formula: string | null
  molecular_weight: string | null
  purity: string | null
  appearance: string | null
  solubility: string | null
  storage: string | null
  synonyms: string | null
  description: string | null
  category_id: string
  category?: Category
  variants?: ProductVariant[]
  image_url: string | null
  price_min: number | null
  price_max: number | null
  created_at: string
}

export interface ProductVariant {
  id: string
  product_id: string
  sku: string
  size: string
  price: number
}

export interface Category {
  id: string
  name: string
  slug: string
  parent_id: string | null
  image_url: string | null
  description: string | null
  children?: Category[]
}

export interface CartItem {
  product_id: string
  variant_id: string
  name: string
  sku: string
  size: string
  price: number
  quantity: number
  image_url: string | null
  cas_number: string | null
}

export interface QuoteRequest {
  id?: string
  name: string
  email: string
  company: string
  phone?: string
  product_name: string
  catalog_number?: string
  quantity: string
  message?: string
  created_at?: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image_url: string | null
  published_at: string
}

export interface User {
  id: string
  email: string
  full_name: string | null
  company: string | null
}
