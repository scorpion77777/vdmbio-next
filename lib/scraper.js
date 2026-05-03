/**
 * VDMBio Product Scraper — Run this locally from your machine
 * 
 * Usage:
 *   node lib/scraper.js
 * 
 * This will scrape all products from vdmbio.com and generate:
 *   lib/products-data.ts  ← import this into your app
 * 
 * Requirements: npm install axios cheerio (run once)
 */

const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

const BASE_URL = 'https://vdmbio.com'
const DELAY_MS = 800 // polite delay between requests

const sleep = ms => new Promise(r => setTimeout(r, ms))

async function fetchPage(url) {
  const { data } = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Accept-Language': 'en-US,en;q=0.9',
    },
    timeout: 15000,
  })
  return cheerio.load(data)
}

async function getAllProductUrls() {
  const urls = new Set()
  let page = 1

  while (true) {
    console.log(`Fetching catalog page ${page}...`)
    const $ = await fetchPage(`${BASE_URL}/shop/page/${page}/`)

    // WooCommerce product links
    const links = []
    $('a[href*="/product/"]').each((_, el) => {
      const href = $(el).attr('href')
      if (href && href.includes('/product/') && !href.includes('?') && !href.includes('#')) {
        links.push(href)
      }
    })

    if (links.length === 0) break
    links.forEach(l => urls.add(l))
    console.log(`  Found ${links.length} products (total: ${urls.size})`)

    // Check if there's a next page
    const hasNext = $('a.next.page-numbers').length > 0
    if (!hasNext) break

    page++
    await sleep(DELAY_MS)
  }

  return [...urls]
}

async function scrapeProduct(url) {
  const $ = await fetchPage(url)

  const name = $('h1.product_title').text().trim()
  const slug = url.split('/product/')[1].replace(/\/$/, '')

  // Extract table data (VDMBio uses a spec table)
  const specs = {}
  $('table tr, .woocommerce-product-attributes tr').each((_, row) => {
    const label = $(row).find('th, td:first-child').text().trim().toLowerCase()
    const value = $(row).find('td:last-child, td:nth-child(2)').text().trim()
    if (label && value) specs[label] = value
  })

  // Also try definition lists
  $('dl dt').each((_, dt) => {
    const label = $(dt).text().trim().toLowerCase()
    const value = $(dt).next('dd').text().trim()
    if (label && value) specs[label] = value
  })

  // SKU / catalog number
  const sku = $('[class*="sku"]').text().trim() || specs['catalog number'] || specs['cat. no.'] || ''

  // Price
  const priceText = $('[class*="price"]').first().text().trim()
  const prices = (priceText.match(/\d+\.?\d*/g) || []).map(Number).filter(Boolean)

  // Category
  const category = $('[class*="posted_in"] a, .product_meta a[href*="product-category"]').first().text().trim()

  // Description
  const description = $('.woocommerce-product-details__short-description, .entry-summary p').first().text().trim()
    || $('.product-description, [class*="description"] p').first().text().trim()

  // Image (original, not thumbnail)
  const imageUrl = $('img.wp-post-image').attr('data-large_image')
    || $('img.wp-post-image').attr('src')
    || null

  return {
    name,
    slug,
    catalog_number: sku,
    cas_number: specs['cas number'] || specs['cas no.'] || specs['cas'] || null,
    formula: specs['molecular formula'] || specs['formula'] || null,
    molecular_weight: specs['molecular weight'] || specs['mw'] || specs['m.w.'] || null,
    purity: specs['purity'] || null,
    appearance: specs['appearance'] || null,
    solubility: specs['solubility'] || null,
    storage: specs['storage'] || specs['storage conditions'] || null,
    synonyms: specs['synonyms'] || specs['alternative names'] || null,
    description: description || null,
    category,
    image_url: imageUrl,
    price_min: prices.length > 0 ? Math.min(...prices) : null,
    price_max: prices.length > 0 ? Math.max(...prices) : null,
    source_url: url,
  }
}

async function main() {
  console.log('🔬 VDMBio Product Scraper Starting...\n')

  // 1. Collect all product URLs
  const productUrls = await getAllProductUrls()
  console.log(`\n✅ Found ${productUrls.length} total products\n`)

  if (productUrls.length === 0) {
    console.error('No products found. The site may be blocking requests. Try running from a browser.')
    process.exit(1)
  }

  // 2. Scrape each product
  const products = []
  const failed = []

  for (let i = 0; i < productUrls.length; i++) {
    const url = productUrls[i]
    process.stdout.write(`[${i + 1}/${productUrls.length}] Scraping: ${url.split('/').slice(-2, -1)[0]}...`)
    try {
      const product = await scrapeProduct(url)
      products.push(product)
      process.stdout.write(` ✓ ${product.name}\n`)
    } catch (err) {
      failed.push(url)
      process.stdout.write(` ✗ ERROR: ${err.message}\n`)
    }
    await sleep(DELAY_MS)
  }

  // 3. Assign IDs and category IDs
  const categories = {}
  products.forEach(p => {
    if (p.category && !categories[p.category]) {
      categories[p.category] = Object.keys(categories).length + 1
    }
    p.id = String(products.indexOf(p) + 1)
    p.category_id = String(categories[p.category] || 1)
    p.created_at = new Date().toISOString()
  })

  // 4. Write TypeScript output
  const ts = `// AUTO-GENERATED by lib/scraper.js — ${new Date().toISOString()}
// ${products.length} products scraped from vdmbio.com
import type { Product } from '@/types'

export const ALL_PRODUCTS: Product[] = ${JSON.stringify(products, null, 2)}
`

  const outPath = path.join(__dirname, 'products-data.ts')
  fs.writeFileSync(outPath, ts)

  // 5. Summary
  console.log(`\n✅ Done!`)
  console.log(`   Products scraped: ${products.length}`)
  console.log(`   Failed: ${failed.length}`)
  console.log(`   Output: lib/products-data.ts`)
  if (failed.length) {
    console.log(`\n⚠️  Failed URLs:\n${failed.map(u => '  ' + u).join('\n')}`)
  }
}

main().catch(console.error)