// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/sections/TrustBadgesSection.tsx
// ═══════════════════════════════════════════════════════════════════════════════
export function TrustBadgesSection() {
  return (
    <section className="bg-surface-container py-12">
      <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div className="flex items-center gap-6 p-6 rounded-xl bg-surface-container-lowest hover:translate-y-[-4px] transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
            <span className="material-symbols-outlined text-2xl">water_drop</span>
          </div>
          <div>
            <h3 className="font-bold text-primary font-stitch-body">Pure Source</h3>
            <p className="text-sm text-on-surface-variant font-stitch-body mt-1">Ethically raised happy cattle</p>
          </div>
        </div>

        <div className="flex items-center gap-6 p-6 rounded-xl bg-surface-container-lowest hover:translate-y-[-4px] transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
            <span className="material-symbols-outlined text-2xl">ac_unit</span>
          </div>
          <div>
            <h3 className="font-bold text-primary font-stitch-body">Cold-Chain Delivery</h3>
            <p className="text-sm text-on-surface-variant font-stitch-body mt-1">Preserving nutrition & taste</p>
          </div>
        </div>

        <div className="flex items-center gap-6 p-6 rounded-xl bg-surface-container-lowest hover:translate-y-[-4px] transition-all duration-300">
          <div className="w-14 h-14 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container shrink-0">
            <span className="material-symbols-outlined text-2xl">verified_user</span>
          </div>
          <div>
            <h3 className="font-bold text-primary font-stitch-body">Zero Preservatives</h3>
            <p className="text-sm text-on-surface-variant font-stitch-body mt-1">Only nature in every drop</p>
          </div>
        </div>

      </div>
    </section>
  );
}
