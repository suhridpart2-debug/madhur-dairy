'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/sections/FeaturedProducts.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ProductCard } from '@/components/product/ProductCard';

interface FeaturedProductsProps {
  products: any[];
}

const FALLBACK_PRODUCTS = [
  {
    _id: '1',
    name: 'Madhur Taak',
    slug: 'madhur-taak-500ml',
    shortDescription: 'Fresh buttermilk with a light, tangy taste. No preservatives.',
    image: '',
    volume: '500ml',
    price: 35,
    category: 'taak',
    featured: true,
    status: 'active',
  },
  {
    _id: '2',
    name: 'Madhur Lassi',
    slug: 'madhur-lassi-sweet-500ml',
    shortDescription: 'Thick, creamy sweet lassi made from pure curd. Premium finish.',
    image: '',
    volume: '500ml',
    price: 55,
    category: 'lassi',
    featured: true,
    status: 'active',
  },
  {
    _id: '3',
    name: 'Madhur Choco Milk',
    slug: 'madhur-chocolate-milk-200ml',
    shortDescription: 'Rich chocolate flavoured milk made with fresh full-cream milk.',
    image: '',
    volume: '200ml',
    price: 30,
    category: 'flavoured-milk',
    featured: true,
    status: 'active',
  },
];

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  // If no DB products are fetched (e.g. initial setup), show fallback
  // Pad until there are 4 products using fallback duplication if needed
  const displayProducts = products.length > 0 ? products : FALLBACK_PRODUCTS;

  return (
    <section className="py-32 max-w-7xl mx-auto px-8 relative">
      <div className="flex justify-between items-end mb-16 border-b border-surface-variant pb-8">
        <div>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-stitch-label text-sm uppercase tracking-widest text-secondary mb-4 block"
          >
            Bestsellers
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="font-stitch-headline text-5xl text-primary font-bold"
          >
            Nature's Finest
          </motion.h2>
        </div>
        
        <Link 
          href="/products" 
          className="hidden md:flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors font-stitch-body"
        >
          View the collection <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayProducts.slice(0, 4).map((product, i) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="h-full"
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
      
      {/* Mobile view all link */}
      <div className="mt-12 text-center md:hidden">
        <Link 
          href="/products" 
          className="inline-flex items-center justify-center gap-2 text-primary font-bold hover:text-secondary font-stitch-body px-6 py-3 border border-outline-variant rounded-lg"
        >
          View all products <span className="material-symbols-outlined">arrow_forward</span>
        </Link>
      </div>
    </section>
  );
}
