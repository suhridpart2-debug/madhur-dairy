// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/sections/TestimonialsSection.tsx
// ═══════════════════════════════════════════════════════════════════════════════
export function TestimonialsSection() {
  return (
    <section className="py-32 bg-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-20">
          <span className="font-stitch-label text-sm uppercase tracking-widest text-secondary mb-4 block">Testimonials</span>
          <h2 className="font-stitch-headline text-5xl text-primary font-bold">What Our Community Says</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Testimonial 1 */}
          <div className="p-10 rounded-xl bg-surface-container-low relative">
            <div className="flex gap-1 text-secondary mb-6">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="text-on-surface font-stitch-body italic leading-loose mb-8">
              "The quality of the Taak reminds me of my childhood summers in the village. It's incredibly authentic and refreshing. Madhur is now our permanent dairy partner."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary-container">
                <img 
                  alt="User Portrait" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPnzSjSj9CA1iJvU1sDqzJyfRWxNCQFycfotfHxgGj2D3LWTVgMAZD2eyOO35PF9gw3G2Ek8y5jQ4vtKHPK9b01ESPTQEOVwampZaGc5jLXmfzXt8uJt1wYLQafLPmki37C2ojxsqUh0lc8IERpgsJVaMKW8Ad-q0zE809EdIXbolVeNkDnHma6xetxV-ynkcmkm-XEthdMYLmbBRIk3oAH0y6mD-cTTPfYUms-eSbRuTuPJCRZeidQzDS6ut4Cl4adZHqZ8SUeAH8"
                />
              </div>
              <div>
                <p className="font-bold text-primary font-stitch-body">Anand Deshmukh</p>
                <p className="text-xs text-on-surface-variant font-stitch-body">Home Chef</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="p-10 rounded-xl bg-surface-container-low relative translate-y-0 md:translate-y-8">
            <div className="flex gap-1 text-secondary mb-6">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            </div>
            <p className="text-on-surface font-stitch-body italic leading-loose mb-8">
              "As a fitness enthusiast, I'm very picky about nutrition. Madhur's raw milk is clean, rich in proteins, and always arrives cold. Simply the best in town."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary-container">
                <img 
                  alt="User Portrait" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5D-K9Y9lBQpx72CreWIohqZjxIs-9ZHsv5BssRhL2WhzWeCkHaLOMwOpWJInty4T4tAumPH32wPauC27ppR1ceoT4MLUyNXNSJAcLOprRFt5qEB0Nc_6AHpo82TFZc61ekLL7w1Duj9Uk5SErifUAU1YrBtcLqXqCT8qm1xwyMRTTuomKQWwO4YHIFKcJuU28drHV_d8o0Z7wFfgWpxfiCdOibzkmRAI7dsvVdtJ582N8FAQ6Gb-p1isvqqZVwjV_Oxku1PeO4mU3"
                />
              </div>
              <div>
                <p className="font-bold text-primary font-stitch-body">Priya Sharma</p>
                <p className="text-xs text-on-surface-variant font-stitch-body">Yoga Instructor</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="p-10 rounded-xl bg-surface-container-low relative">
            <div className="flex gap-1 text-secondary mb-6">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 0" }}>star</span>
            </div>
            <p className="text-on-surface font-stitch-body italic leading-loose mb-8">
              "The Lassi is so thick you could eat it with a spoon! My kids love the badam thandai, and I love that it has no added preservatives or colors."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-secondary-container">
                <img 
                  alt="User Portrait" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCi8eKVxe4gSe-Y-UfOapftjfnFyWhAUzC0_oHhG190mIS0GMGm7E89qcAZjDoeluw35YGkhmFxB8mpW8BnOO-5omYEaQVzRsSarFdlWvjiWCdbOhl0JjlJkD6T7XBwJ2OibPgT1a9s6m3KRQTlZLjohzJnWP1r0voGQEME2GaAVRhmTVT2Eni7SrkDmGXxL7hGFBGmuZel6gQuhV44OYngYtRfGMuhy_9cUd7RtjGqI0sWyMG_Ky4yS40pW6DlO80Y1MYI05rMBRDq"
                />
              </div>
              <div>
                <p className="font-bold text-primary font-stitch-body">Dr. Vikram Raj</p>
                <p className="text-xs text-on-surface-variant font-stitch-body">Pediatrician</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
