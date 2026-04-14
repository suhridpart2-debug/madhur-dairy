// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/sections/HeroSection.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-32">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="z-10">
          <span className="font-stitch-label text-sm uppercase tracking-[0.2em] text-on-secondary-container mb-6 block">Legacy of Pure Nutrition</span>
          <h1 className="font-stitch-headline text-primary text-6xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
            Freshness that <br/><span className="italic font-normal">Whispers Purity.</span>
          </h1>
          <p className="text-on-surface-variant font-stitch-body text-lg leading-relaxed max-w-lg mb-10">
            Straight from our lush green pastures to your breakfast table within hours. Experience the rich, creamy texture of nature's finest dairy.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/products" className="bg-primary text-on-primary px-10 py-5 rounded-lg font-semibold text-lg hover:bg-primary-container transition-all shadow-xl shadow-primary/10">
              Explore Freshness
            </Link>
            <Link href="/about" className="border border-outline-variant text-primary px-10 py-5 rounded-lg font-semibold text-lg hover:bg-surface-container-low transition-all">
              Our Story
            </Link>
          </div>
        </div>
        
        <div className="relative">
          <div className="relative rounded-xl overflow-hidden shadow-2xl">
            <img 
              alt="Premium Glass Bottle of Fresh Milk" 
              className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-700" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhy8AFz5Mf1bU_6XMmdMPJOQEIkJmQ4TLk4SWjIdpCvlBHnWDDnxs2ESuw6i8SHE0B7I0ugSoJANDfVWjOSKtSgHiTLSN5K2kXhpM6CiWVS2eP36PKBYKqeFVVwbfK46IVmPg68kvdOqpldlu-EKqPtqvcCMY7uHk7kOGLM5Ln0Qf2r_UjlQryL2ohdEe561uWpai7z0avSMUHfBMAZjBGdpI4tk2ZIQbiwoxONAFSopAg_MAty751Ki0nq0K0auJ7575HIaC_2BCZ"
            />
          </div>
          
          {/* Floating Badges */}
          <div className="absolute -top-6 -right-6 bg-surface-container-lowest p-6 rounded-xl shadow-xl flex items-center gap-4 animate-bounce hover:animate-none duration-[3000ms]">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
            <div>
              <p className="font-bold text-primary leading-none">100% Fresh</p>
              <p className="text-xs text-on-surface-variant mt-1">Non-Pasteurized</p>
            </div>
          </div>
          
          <div className="absolute bottom-10 -left-10 bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-xl flex items-center gap-4">
            <span className="material-symbols-outlined text-secondary text-3xl">local_shipping</span>
            <div>
              <p className="font-bold text-primary leading-none">Express Delivery</p>
              <p className="text-xs text-on-surface-variant mt-1">Within 4 Hours</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-secondary-container/20 to-transparent opacity-50 blur-3xl"></div>
    </section>
  );
}