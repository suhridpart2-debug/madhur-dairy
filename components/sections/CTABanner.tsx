import Link from 'next/link';

// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/sections/CTABanner.tsx
// ═══════════════════════════════════════════════════════════════════════════════
export function CTABanner() {
  return (
    <section className="py-24 px-8">
      <div className="max-w-7xl mx-auto rounded-xl overflow-hidden relative">
        <div className="bg-gradient-to-br from-primary to-primary-container p-20 text-center relative z-10">
          <h2 className="font-stitch-headline text-5xl text-on-primary font-bold mb-6 max-w-2xl mx-auto leading-tight">
            Order Fresh Today. Experience Purity Tomorrow.
          </h2>
          <p className="text-primary-fixed-dim font-stitch-body text-lg mb-10 max-w-xl mx-auto">
            Join our community and get 20% off on your first weekly subscription. Pure dairy delivered to your doorstep.
          </p>
          <Link href="/products" className="inline-block bg-primary-fixed text-on-primary-fixed px-12 py-5 rounded-lg font-bold text-xl hover:scale-105 transition-transform shadow-2xl">
            Shop Now
          </Link>
        </div>
        
        {/* Abstract background shape */}
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-secondary rounded-full blur-[100px] opacity-20"></div>
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-primary-fixed-dim rounded-full blur-[100px] opacity-10"></div>
      </div>
    </section>
  );
}
