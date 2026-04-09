// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/(customer)/products/page.tsx  — Product listing page
// ═══════════════════════════════════════════════════════════════════════════════
import { connectDB } from '@/lib/db';
import { Product } from '@/models/Product';
import { ProductCard } from '@/components/product/ProductCard';
import { PRODUCT_CATEGORIES } from '@/lib/constants';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop — All Products',
  description: 'Browse Madhur Taak, Lassi, and Flavoured Milk. Fresh dairy delivered to your door.',
};

async function getProducts(category?: string) {
  try {
    await connectDB();
    const query: Record<string, unknown> = { status: 'active' };
    if (category) query.category = category;
    const products = await Product.find(query).sort({ featured: -1, createdAt: -1 }).lean();
    return JSON.parse(JSON.stringify(products));
  } catch {
    return [];
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const products = await getProducts(searchParams.category);

  return (
    <div className="page-enter pt-24 pb-20">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">Fresh Every Day</p>
          <h1 className="font-heading text-4xl md:text-5xl text-gray-900 mb-4">Our Products</h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            All products are prepared fresh in the morning with no preservatives.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <a
            href="/products"
            className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
              !searchParams.category
                ? 'bg-brand-green text-white border-brand-green shadow-md'
                : 'bg-white text-gray-600 border-gray-200 hover:border-brand-green hover:text-brand-green'
            }`}
          >
            All Products
          </a>
          {PRODUCT_CATEGORIES.map((cat) => (
            <a
              key={cat.slug}
              href={`/products?category=${cat.slug}`}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all ${
                searchParams.category === cat.slug
                  ? 'bg-brand-green text-white border-brand-green shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-brand-green hover:text-brand-green'
              }`}
            >
              {cat.label}
            </a>
          ))}
        </div>

        {/* Product grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <span className="text-6xl mb-4 block">🥛</span>
            <h3 className="font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 text-sm">Try a different category or check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
