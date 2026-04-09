'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/sections/HeroSection.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay },
  }),
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-hero-gradient pt-20">
      <div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(45,122,58,0.15) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-20 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(192,57,43,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="section-container w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-6 items-center min-h-[calc(100vh-80px)] py-16">
          {/* Left: Text content */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial="hidden"
              animate="visible"
              custom={0}
              variants={fadeUp}
              className="inline-flex items-center gap-2 bg-brand-green-pale text-brand-green text-xs font-bold px-4 py-2 rounded-full mb-6 border border-green-200"
            >
              <Star size={12} fill="currentColor" />
              Fresh from Pune&apos;s finest dairy
            </motion.div>

            <motion.h1
              initial="hidden"
              animate="visible"
              custom={0.1}
              variants={fadeUp}
              className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight mb-6"
            >
              Pure. <span className="text-gradient-green">Fresh.</span>
              <br />
              Delivered.
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              custom={0.2}
              variants={fadeUp}
              className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8 max-w-lg"
            >
              Madhur&apos;s Taak, Lassi & Flavoured Milk — made fresh every morning with no preservatives. Order by 8 PM, delivered by next morning.
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.25}
              variants={fadeUp}
              className="flex items-center gap-4 mb-10"
            >
              <div className="flex -space-x-2">
                {['🧑', '👩', '👨', '🧕'].map((emoji, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-brand-green-pale border-2 border-white flex items-center justify-center text-sm"
                  >
                    {emoji}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">500+</span> happy customers in Pune
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.35}
              variants={fadeUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/products" className="btn-primary flex items-center justify-center gap-2 text-base">
                Shop Now
                <ArrowRight size={18} />
              </Link>
              <Link href="/about" className="btn-secondary flex items-center justify-center gap-2 text-base">
                Our Story
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={0.45}
              variants={fadeUp}
              className="flex flex-wrap gap-2 mt-8"
            >
              {['🥛 No Preservatives', '🚚 Free Delivery', '📱 Order Online', '⭐ 100% Fresh'].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full shadow-sm"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          {/* Right: Floating product visual */}
          <div className="order-1 lg:order-2 flex items-center justify-center relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
              className="relative w-full max-w-md"
            >
              <div className="relative bg-white rounded-3xl shadow-premium p-8 border border-gray-100 animate-float">
                {/* Real product image */}
                <div
                  className="w-full aspect-square rounded-2xl overflow-hidden mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #E8F5E9 0%, #FEFCF7 100%)',
                  }}
                >
                  <img
                    src="/products/taak-pouch.png"
                    alt="Madhur Taak"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-center">
                  <p className="section-label mb-1">Bestseller</p>
                  <h3 className="font-heading text-xl text-gray-900">Madhur Taak</h3>
                  <p className="text-sm text-gray-500 mt-1">Fresh Buttermilk · 500ml</p>
                  <p className="text-2xl font-bold text-brand-green mt-2">₹20</p>
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 bg-white rounded-2xl shadow-hover px-4 py-3 border border-gray-100"
              >
                <p className="text-xs font-bold text-gray-900">Made Fresh Daily</p>
                <p className="text-xs text-gray-500">Every morning 🌅</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-brand-green text-white rounded-2xl shadow-green-glow px-4 py-3"
              >
                <p className="text-xs font-bold">Free Delivery</p>
                <p className="text-xs opacity-80">All orders 🚚</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}