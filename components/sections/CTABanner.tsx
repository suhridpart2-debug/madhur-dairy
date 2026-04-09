'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/sections/CTABanner.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function CTABanner() {
  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-brand-green p-12 md:p-16 text-center shadow-premium"
        >
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-10 -translate-y-1/2 translate-x-1/2"
            style={{ background: 'radial-gradient(circle, white, transparent)' }} />
          <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-10 translate-y-1/2 -translate-x-1/2"
            style={{ background: 'radial-gradient(circle, white, transparent)' }} />

          <p className="text-green-200 text-sm font-bold uppercase tracking-widest mb-4">
            Limited Delivery Slots Available
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-5">
            Order Fresh Today
          </h2>
          <p className="text-green-100 text-lg max-w-xl mx-auto mb-8">
            Place your order before 8 PM and receive fresh Madhur products at your doorstep tomorrow morning.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-white text-brand-green font-bold px-8 py-4 rounded-2xl hover:bg-green-50 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            Shop Now <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
