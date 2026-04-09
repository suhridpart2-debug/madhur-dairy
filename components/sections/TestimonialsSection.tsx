'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/sections/TestimonialsSection.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Baner, Pune',
    text: 'Madhur Taak is part of our morning routine now. It\'s fresh, perfectly spiced, and my kids love it. Best buttermilk in Pune!',
    emoji: '👩',
    product: 'Madhur Taak',
  },
  {
    name: 'Rohan Kulkarni',
    location: 'Hinjewadi, Pune',
    text: 'The Lassi is incredibly thick and creamy. Reminds me of what my grandmother used to make. Delivery is always on time.',
    emoji: '👨',
    product: 'Madhur Lassi',
  },
  {
    name: 'Sneha Joshi',
    location: 'Wakad, Pune',
    text: 'My son refuses to drink regular milk now. The Chocolate Flavoured Milk from Madhur is absolutely delicious and I feel good about the ingredients.',
    emoji: '🧕',
    product: 'Flavoured Milk',
  },
];

export function TestimonialsSection() {
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
          <p className="section-label mb-3">Testimonials</p>
          <h2 className="font-heading text-4xl text-gray-900">What Our Customers Say</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-card hover:shadow-hover transition-all"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} fill="#2D7A3A" className="text-brand-green" />
                ))}
              </div>
              <p className="text-gray-700 leading-relaxed mb-5 text-sm">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-green-pale flex items-center justify-center text-xl">
                  {t.emoji}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
                <span className="ml-auto text-xs font-medium text-brand-green bg-brand-green-pale px-2 py-1 rounded-full">
                  {t.product}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
