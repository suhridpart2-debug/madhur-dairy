'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/sections/BrandStorySection.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import { motion } from 'framer-motion';
import Link from 'next/link';

export function BrandStorySection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-brand-green-pale to-brand-cream flex items-center justify-center shadow-premium">
              <img
                src="/products/lassibottle.png"
                alt="Madhur Lassi"
                className="w-full h-full object-contain p-10"
              />
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-hover p-5 border border-gray-100 w-44">
              <p className="text-3xl font-bold text-brand-green">10+</p>
              <p className="text-sm text-gray-600 mt-1">Years of dairy excellence</p>
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <p className="section-label mb-4">Our Story</p>
            <h2 className="font-heading text-4xl md:text-5xl text-gray-900 mb-6 leading-tight">
              A Family Tradition of Purity
            </h2>

            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                Madhur was born from a simple belief: dairy should taste the way it always did —
                fresh, pure, and real. We started as a small family operation in Pune and have
                grown into the city&apos;s trusted dairy brand.
              </p>
              <p>
                Every morning, our team prepares fresh Taak, Lassi, and Flavoured Milk in
                hygienic, temperature-controlled kitchens. No preservatives, no artificial flavors —
                just milk, culture, and care.
              </p>
              <p>
                Our packaging is designed to preserve freshness from our kitchen to your table.
                Madhur means sweet — and that&apos;s exactly what we promise with every sip.
              </p>
            </div>

            <div className="flex flex-wrap gap-8 mt-8 mb-8">
              {[
                { value: '500+', label: 'Happy Customers' },
                { value: '4', label: 'Core Products' },
                { value: '0', label: 'Preservatives' },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-bold text-brand-green">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-primary inline-flex">
              Read Our Full Story
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}