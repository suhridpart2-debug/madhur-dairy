// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/(customer)/about/page.tsx  — Brand Story
// ═══════════════════════════════════════════════════════════════════════════════
import { Metadata } from 'next';
export const metadata: Metadata = { title: 'Our Story — Madhur Dairy' };

export default function AboutPage() {
  return (
    <div className="page-enter pt-24 pb-20">
      <div className="section-container max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-16">
          <p className="section-label mb-4">Est. 2014 · Pune, Maharashtra</p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            A Story of <span className="text-gradient-green">Pure Milk</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
            From a small family kitchen in Pune to your doorstep — Madhur's journey is built on one simple promise: never compromise on freshness.
          </p>
        </div>

        {/* Story sections */}
        <div className="prose max-w-none">
          {[
            {
              title: 'Where It Began',
              emoji: '🌅',
              content: `Madhur started in 2014 when our founder — a third-generation dairy farmer from rural Maharashtra — moved to Pune. He noticed that city dwellers had no access to the kind of fresh, unadulterated dairy they had grown up with in villages. So he started making Taak from his grandmother's recipe and delivering it to neighbors.

Word spread quickly. Within months, what started as 20 bottles a day became 200. That's when Madhur Dairy was born.`,
            },
            {
              title: 'Our Philosophy',
              emoji: '💚',
              content: `We believe dairy should be simple. Fresh milk. Natural cultures. No shortcuts.

Every morning at 4 AM, our production team begins. By 6 AM, Taak is churned. By 7 AM, Lassi is prepared. By 8 AM, Flavoured Milks are ready. And by your chosen delivery slot, everything is at your door — still cold, still fresh.

We never store products overnight. What doesn't sell that day doesn't go out the next day. That's our non-negotiable rule.`,
            },
            {
              title: 'Our Products',
              emoji: '🥛',
              content: `Madhur Taak is our flagship. Lightly salted with cumin and mint — it's the most refreshing thing you'll drink today.

Madhur Lassi is our premium offering — thick, creamy, and made with full-fat curd. The Sweet Lassi and Mango Lassi are community favorites.

Madhur Flavoured Milk makes dairy exciting for children and adults alike. Chocolate, Strawberry, and Rose — all made with real milk and real flavors.`,
            },
            {
              title: 'Hygiene & Quality',
              emoji: '✅',
              content: `Our kitchen operates under strict hygiene standards. All surfaces are sanitized twice daily. Every batch is temperature-checked. Our packaging is food-grade and sealed for safety.

We invite you to visit our production facility anytime — we have nothing to hide. Transparency is part of who we are.`,
            },
          ].map((section) => (
            <div key={section.title} className="mb-12 bg-white rounded-3xl p-8 border border-gray-100 shadow-card">
              <div className="flex items-center gap-4 mb-5">
                <span className="text-4xl">{section.emoji}</span>
                <h2 className="font-heading text-2xl text-gray-900">{section.title}</h2>
              </div>
              <div className="space-y-4">
                {section.content.split('\n\n').map((p, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">{p.trim()}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="bg-brand-green rounded-3xl p-10 text-white text-center mt-12">
          <h2 className="font-display text-3xl font-bold mb-8">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: '🌿', title: 'Natural', desc: 'No preservatives, no artificial ingredients, no exceptions.' },
              { icon: '⚡', title: 'Fresh', desc: 'Made this morning. Delivered today. Always.' },
              { icon: '🤝', title: 'Honest', desc: 'What you see is what you get. Always transparent.' },
            ].map((v) => (
              <div key={v.title} className="bg-white/10 rounded-2xl p-6">
                <span className="text-4xl block mb-3">{v.icon}</span>
                <h3 className="font-bold text-lg mb-2">{v.title}</h3>
                <p className="text-green-100 text-sm">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
