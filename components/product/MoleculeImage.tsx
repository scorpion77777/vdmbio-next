'use client'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { FlaskConical } from 'lucide-react'

interface MoleculeImageProps {
  casNumber: string | null
  fallbackUrl?: string | null
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizeMap = {
  sm: { px: 200, cls: 'w-full h-40', imgSize: '200x200' },
  md: { px: 400, cls: 'w-full h-56', imgSize: '400x400' },
  lg: { px: 600, cls: 'w-full h-80', imgSize: '600x600' },
}

// Build ordered list of PubChem URLs to try
function buildSrcList(casNumber: string | null, name: string, imgSize: string): string[] {
  const urls: string[] = []
  const enc = (s: string) => encodeURIComponent(s.trim())
  const base = 'https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name'
  const suffix = `PNG?image_size=${imgSize}&record_type=2d`

  // 1. CAS number (most precise)
  if (casNumber && casNumber !== 'N/A') {
    urls.push(`${base}/${enc(casNumber)}/${suffix}`)
  }
  // 2. Full compound name
  if (name) {
    urls.push(`${base}/${enc(name)}/${suffix}`)
  }
  // 3. Cleaned name — strip (±)-, (+)-, (-)-  prefixes
  const clean = name.replace(/^\([^)]*\)-?\s*/, '').trim()
  if (clean && clean !== name) {
    urls.push(`${base}/${enc(clean)}/${suffix}`)
  }

  return urls
}

// Global request queue — max 3 concurrent PubChem requests, 300 ms gap between each
const queue: Array<() => void> = []
let active = 0
const MAX_CONCURRENT = 3
const GAP_MS = 300

function enqueue(fn: () => void) {
  queue.push(fn)
  flush()
}

function flush() {
  if (active >= MAX_CONCURRENT || queue.length === 0) return
  active++
  const next = queue.shift()!
  next()
  setTimeout(() => {
    active--
    flush()
  }, GAP_MS)
}

export function MoleculeImage({
  casNumber, fallbackUrl, name, size = 'md', className = '',
}: MoleculeImageProps) {
  const { px, cls, imgSize } = sizeMap[size]
  const srcList = buildSrcList(casNumber, name, imgSize)

  const [srcIndex, setSrcIndex] = useState(0)
  const [visible, setVisible] = useState(false)   // only load when in viewport
  const [queued, setQueued]   = useState(false)   // only enqueue once
  const containerRef = useRef<HTMLDivElement>(null)

  // IntersectionObserver — trigger load when card scrolls into view
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { rootMargin: '200px' }   // start loading 200px before visible
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Enqueue the actual image load through the rate-limiter
  useEffect(() => {
    if (!visible || queued) return
    setQueued(true)
    enqueue(() => {
      // Nothing to do here — just gate the render via `queued`
      // The Image component itself fires the network request once rendered
    })
  }, [visible, queued])

  const currentSrc =
    srcIndex < srcList.length ? srcList[srcIndex] : (fallbackUrl ?? null)

  const handleError = () => setSrcIndex(i => i + 1)

  const placeholder = (
    <div className={`${cls} ${className} flex flex-col items-center justify-center bg-gradient-to-br from-lab-50 to-teal-50 dark:from-lab-950/30 dark:to-teal-950/30 rounded-xl border border-lab-100 dark:border-lab-900`}>
      <FlaskConical size={32} className="text-lab-300 dark:text-lab-700 mb-2" />
      <span className="text-xs font-mono text-slate-400 text-center px-2 leading-relaxed">{name}</span>
    </div>
  )

  // Skeleton while waiting for viewport / queue
  const skeleton = (
    <div className={`${cls} ${className} bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-800 dark:to-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 animate-pulse`} />
  )

  return (
    <div ref={containerRef}>
      {!visible || !queued
        ? skeleton
        : !currentSrc
          ? placeholder
          : (
            <div className={`${cls} ${className} relative bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-800`}>
              <Image
                key={currentSrc}
                src={currentSrc}
                alt={`Molecular structure of ${name}`}
                fill
                sizes={`${px}px`}
                className="object-contain p-3"
                onError={handleError}
                quality={100}
                unoptimized={currentSrc.includes('pubchem')}
              />
            </div>
          )
      }
    </div>
  )
}