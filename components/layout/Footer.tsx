// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/layout/Footer.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-emerald-950 w-full pt-20 pb-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-7xl mx-auto px-8">
        <div className="col-span-2 md:col-span-1">
          <div className="text-xl font-stitch-headline text-emerald-100 italic mb-6">Madhur</div>
          <p className="text-emerald-200/60 font-stitch-body text-sm tracking-wide leading-loose">
            Bringing the gold standard of dairy back to your table with love, tradition, and uncompromising purity.
          </p>
        </div>
        
        <div className="flex flex-col gap-4 font-stitch-body text-sm tracking-wide leading-loose">
          <h4 className="text-emerald-50 font-bold mb-2">Company</h4>
          <Link href="/about" className="text-emerald-200/60 hover:text-emerald-100 transition-all hover:translate-x-1">Sustainability</Link>
          <Link href="/wholesale" className="text-emerald-200/60 hover:text-emerald-100 transition-all hover:translate-x-1">Wholesale</Link>
          <Link href="/careers" className="text-emerald-200/60 hover:text-emerald-100 transition-all hover:translate-x-1">Careers</Link>
        </div>
        
        <div className="flex flex-col gap-4 font-stitch-body text-sm tracking-wide leading-loose">
          <h4 className="text-emerald-50 font-bold mb-2">Support</h4>
          <Link href="/privacy" className="text-emerald-200/60 hover:text-emerald-100 transition-all hover:translate-x-1">Privacy Policy</Link>
          <Link href="/contact" className="text-emerald-200/60 hover:text-emerald-100 transition-all hover:translate-x-1">Contact</Link>
          <Link href="/faq" className="text-emerald-200/60 hover:text-emerald-100 transition-all hover:translate-x-1">FAQs</Link>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="text-emerald-50 font-bold mb-2 font-stitch-body text-sm">Newsletter</h4>
          <div className="flex bg-emerald-900/50 rounded-lg p-1 border border-emerald-800/30">
            <input 
              className="bg-transparent border-none text-emerald-100 text-sm outline-none focus:ring-0 flex-grow placeholder:text-emerald-700 px-3" 
              placeholder="Email" 
              type="email" 
            />
            <button className="bg-emerald-50 text-emerald-950 p-2 rounded-lg flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px] leading-none">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-8 mt-20 pt-8 border-t border-emerald-900/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-emerald-200/60 font-stitch-body text-sm">© {new Date().getFullYear()} Madhur Dairy. Crafted for Purity.</p>
        <div className="flex gap-6">
          <a href="#" className="text-emerald-200/60 hover:text-emerald-100 transition-all opacity-80 hover:opacity-100">Instagram</a>
          <a href="#" className="text-emerald-200/60 hover:text-emerald-100 transition-all opacity-80 hover:opacity-100">Facebook</a>
          <a href="#" className="text-emerald-200/60 hover:text-emerald-100 transition-all opacity-80 hover:opacity-100">Twitter</a>
        </div>
      </div>
    </footer>
  );
}
