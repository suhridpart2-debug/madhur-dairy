// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/page.tsx  — Landing / Home page (Server Component)
// ═══════════════════════════════════════════════════════════════════════════════
import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrustBadgesSection } from '@/components/sections/TrustBadgesSection';
import { FeaturedProducts } from '@/components/sections/FeaturedProducts';
import { BrandStorySection } from '@/components/sections/BrandStorySection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { CTABanner } from '@/components/sections/CTABanner';

async function getFeaturedProducts() {
  try {
    await connectDB();
    const products = await Product.find({ status: 'active', featured: true })
      .limit(3)
      .lean();
    return JSON.parse(JSON.stringify(products));
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <div className="page-enter">
      <HeroSection />
      <TrustBadgesSection />
      <FeaturedProducts products={featuredProducts} />
      <BrandStorySection />
      <TestimonialsSection />
      <CTABanner />
    </div>
  );
}
