import Link from 'next/link'
import { HeroSection } from '@/components/home/HeroSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { StatsSection } from '@/components/home/StatsSection'
import { ServicesPreview } from '@/components/home/ServicesPreview'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <CategoryGrid />
      <FeaturedProducts />
      <ServicesPreview />
    </>
  )
}
