/**
 * PubChem API integration for high-resolution molecular structure images
 * Automatically generates crisp SVG/PNG images from CAS numbers
 */

export function getPubChemImageUrl(
  casNumber: string | null,
  size: 'small' | 'medium' | 'large' = 'large'
): string | null {
  if (!casNumber || casNumber === 'N/A') return null

  const sizeMap = { small: '200x200', medium: '400x400', large: '600x600' }
  const px = sizeMap[size]

  // PubChem REST API - free, no API key needed
  return `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(casNumber)}/PNG?image_size=${px}&record_type=2d`
}

export function getPubChemSVGUrl(casNumber: string | null): string | null {
  if (!casNumber || casNumber === 'N/A') return null
  return `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(casNumber)}/PNG?image_size=large`
}

export async function getPubChemCompoundData(casNumber: string) {
  try {
    const res = await fetch(
      `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${encodeURIComponent(casNumber)}/JSON`,
      { next: { revalidate: 86400 } } // cache 24h
    )
    if (!res.ok) return null
    const data = await res.json()
    return data?.PC_Compounds?.[0] ?? null
  } catch {
    return null
  }
}
