'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/sections/TrustBadgesSection.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import { motion } from 'framer-motion';

const badges = [
  { icon: '🥛', title: '100% Pure Milk', desc: 'No additives, no shortcuts' },
  { icon: '🚚', title: 'Free Delivery', desc: 'On every order, every day' },
  { icon: '✅', title: 'No Preservatives', desc: 'Made & delivered same day' },
  { icon: '⭐', title: 'Premium Quality', desc: 'Hygienically packed always' },
];

export function TrustBadgesSection() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="section-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-brand-green-pale transition-colors group"
            >
              <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{badge.icon}</div>
              <h3 className="font-semibold text-gray-900 text-sm mb-1">{badge.title}</h3>
              <p className="text-xs text-gray-500">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
