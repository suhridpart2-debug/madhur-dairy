'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/sections/FeaturedProducts.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
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
  const displayProducts = products.length > 0 ? products : FALLBACK_PRODUCTS;

  return (
    <section className="py-20 bg-gray-50">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="section-label mb-3">Our Products</p>
          <h2 className="font-heading text-4xl md:text-5xl text-gray-900 mb-4">
            Fresh from Our Kitchen
          </h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Every product is prepared fresh in the morning and delivered straight to your door.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {displayProducts.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 btn-secondary"
          >
            View All Products <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
