// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/sections/BrandStorySection.tsx
// ═══════════════════════════════════════════════════════════════════════════════
export function BrandStorySection() {
  return (
    <section className="py-32 bg-surface-container overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="rounded-xl overflow-hidden shadow-lg h-64">
                <img 
                  alt="Lush Farm" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI61ALLVOzlDRqTn-PCa-D9f5CtuWAnX9PuDs_o1x95rnow5mVsxYC6hnmBO3D3PInWtVIJv5ZeZ1fp0zAuJ15lwdBIvTOT1u7-XQg765oOMNOdurySv8CNKjNedWkFUxn6dGTROYyQe9mHcr-JAJyTcD_TY2khCRLSQMc9AGoCxTAnCIbHpveGgqq7tGF8e_fGZ740RXmRKf0fmqkJpyJ8DySSPzDP5BNfQ4-4VQ5qdTFUaN7UoaugrAJN_aqhwYKUH6prN_d0EOd"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg h-80">
                <img 
                  alt="Grazing Cattle" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtNwvPCfmN6fK9akmvEb5WOt0VNjg7WhS8RORx1YG5Y1Tzvau957RvtIVtERAdi_zFVXF8rZx6uh-j30Jdo0HO73-Az8J58ldTTDfm-rvIiWHqPM-Ru9supoulJXLKy7XR6A_tqhR8nSlxjNjubKHbq465gsSJA5c1y-Ko6RtcPYbEBM3Mo78pdNzhhNkBodjZFhfz1sSLhfiRLxGeCPbNkj-AqFbWOkHAx0lgc478sLZziEzL5ybfDR7dBf3tTuiQFt3gmz1dhV_d"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-xl overflow-hidden shadow-lg h-80">
                <img 
                  alt="Modern Lab" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBnFQMtlAnWCJd2U8M4ROgiFrZ69EdWOJF6sbRznmHYE154iAf-S8-O_mO34EfPLMqcBZu_kgxpPTVLjDyYI_HQu8ZwZrFyi9djxU3YDtoiRc7ZfenKFTkefvDHFVHM9fdDFfHQ3zuO-K2zbIJma6ib6UO39cWFUOe375w-7kLb-56Q5uNGivqB5J-7nZOeAZXoQIuuqxWNBBHEFl_ikfMT17mV8gonve4vRl6uzddQd4Y3rlQV6YUcaoHqCpMHqARA4w_AXCwxV_me"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-lg h-64">
                <img 
                  alt="Milk Testing" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCitUqHxyzr3ZR3coTV_FVbw9pzLX13YjjJe-njGZTca1kpNTVMQ-lme-GlCf_0JcqDmEYK41lvI4g3iK6PrUy0HS_PyYL6K4OWjR5YsvyAMU9c6nC3pCU-LCWek6mgKgnYm4ArqKZkCazsIlyRd3Pm4UoHJtsfdzmfXcHYqY_0KysFypIEfR9bGyyNaItJ6-nsrhmbmgl4sEGwp7jQaje4yd0GqWV7Vb7wm0Wawn5tVa8rcfRfeIefVeWXtMH5Oqo-pRqT3mJmjcyk"
                />
              </div>
            </div>
          </div>
          <div className="lg:pl-10">
            <span className="font-stitch-label text-sm uppercase tracking-widest text-secondary mb-6 block">Our Legacy</span>
            <h2 className="font-stitch-headline text-5xl text-primary font-bold mb-8 leading-tight">The Madhur Heritage: <br/><span className="font-normal italic">Since 1974</span></h2>
            <p className="text-on-surface-variant font-stitch-body text-lg leading-relaxed mb-6">
              For nearly five decades, the Madhur family has dedicated itself to the art of pure dairy. What started as a small farm with three cows has evolved into a state-of-the-art heritage facility that blends ancestral wisdom with modern precision.
            </p>
            <p className="text-on-surface-variant font-stitch-body text-lg leading-relaxed mb-10">
              Our philosophy is simple: Treat the earth with respect, the cattle with love, and our customers as family. We believe that purity isn't just a standard—it's a promise.
            </p>
            <div className="grid grid-cols-2 gap-8 border-t border-outline-variant/30 pt-10">
              <div>
                <h4 className="text-3xl font-bold text-primary mb-2">50+</h4>
                <p className="text-sm font-stitch-label uppercase text-on-surface-variant">Years of Heritage</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-primary mb-2">12k+</h4>
                <p className="text-sm font-stitch-label uppercase text-on-surface-variant">Happy Families</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}