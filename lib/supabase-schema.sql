-- ============================================================
-- VDMBio Supabase Schema
-- Run this in your Supabase SQL Editor
-- ============================================================

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES categories(id),
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  catalog_number TEXT UNIQUE NOT NULL,
  cas_number TEXT,
  formula TEXT,
  molecular_weight TEXT,
  purity TEXT,
  appearance TEXT,
  solubility TEXT,
  storage TEXT,
  synonyms TEXT,
  description TEXT,
  category_id UUID REFERENCES categories(id),
  image_url TEXT,  -- fallback if PubChem has no data
  price_min NUMERIC(10,2),
  price_max NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Full-text search index on products
CREATE INDEX products_fts_idx ON products
  USING gin(to_tsvector('english', name || ' ' || COALESCE(cas_number,'') || ' ' || COALESCE(formula,'') || ' ' || COALESCE(synonyms,'')));

-- Product Variants (sizes/quantities)
CREATE TABLE product_variants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  sku TEXT UNIQUE NOT NULL,
  size TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  stock_qty INTEGER DEFAULT 0
);

-- Users (extends Supabase auth.users)
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  company TEXT,
  phone TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Wishlists
CREATE TABLE wishlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  status TEXT DEFAULT 'pending',
  total NUMERIC(10,2),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  variant_id UUID REFERENCES product_variants(id),
  quantity INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

-- Quote Requests
CREATE TABLE quote_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  company TEXT NOT NULL,
  phone TEXT,
  product_name TEXT NOT NULL,
  catalog_number TEXT,
  quantity TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  image_url TEXT,
  published_at TIMESTAMPTZ DEFAULT now()
);

-- Newsletter
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS Policies
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public read products" ON products FOR SELECT USING (true);
CREATE POLICY "Public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public read variants" ON product_variants FOR SELECT USING (true);

-- Quote requests: anyone can insert
CREATE POLICY "Anyone can request quote" ON quote_requests FOR INSERT WITH CHECK (true);

-- Orders: only own orders
CREATE POLICY "Users own orders" ON orders USING (auth.uid() = user_id);

-- Wishlists: only own
CREATE POLICY "Users own wishlists" ON wishlists USING (auth.uid() = user_id);

-- Profiles: only own
CREATE POLICY "Users own profiles" ON user_profiles USING (auth.uid() = id);

-- Full-text search function
CREATE OR REPLACE FUNCTION search_products(query TEXT)
RETURNS SETOF products AS $$
  SELECT * FROM products
  WHERE to_tsvector('english', name || ' ' || COALESCE(cas_number,'') || ' ' || COALESCE(formula,'') || ' ' || COALESCE(synonyms,''))
    @@ plainto_tsquery('english', query)
  ORDER BY ts_rank(
    to_tsvector('english', name || ' ' || COALESCE(cas_number,'') || ' ' || COALESCE(synonyms,'')),
    plainto_tsquery('english', query)
  ) DESC;
$$ LANGUAGE sql STABLE;
