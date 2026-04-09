// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/(customer)/faq/page.tsx  — FAQ page
// ═══════════════════════════════════════════════════════════════════════════════
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'FAQ — Madhur Dairy' };

const faqs = [
  {
    category: 'Delivery',
    items: [
      { q: 'Which areas do you deliver to?', a: 'We currently deliver to Pimpri, Chinchwad, Wakad, Baner, Aundh, Hinjewadi, Kothrud, and Shivajinagar in Pune. We\'re expanding soon!' },
      { q: 'What are your delivery time slots?', a: 'We offer three time slots: Morning (7–10 AM), Afternoon (12–3 PM), and Evening (5–8 PM). You can choose your preferred slot at checkout.' },
      { q: 'Is there a delivery charge?', a: 'No! Delivery is completely free on all orders, regardless of the order size.' },
      { q: 'Can I change my delivery slot after placing an order?', a: 'Please contact us via WhatsApp within 2 hours of placing the order and we\'ll do our best to accommodate your request.' },
    ],
  },
  {
    category: 'Products & Freshness',
    items: [
      { q: 'Are your products really made fresh every day?', a: 'Absolutely. All our Taak, Lassi, and Flavoured Milk are prepared fresh every morning in our hygienic kitchen. We never use products from the previous day.' },
      { q: 'Do your products contain preservatives?', a: 'No preservatives, ever. Our products are 100% natural — made only from pure milk, curd, and natural ingredients. This is why we recommend consuming them within 24 hours.' },
      { q: 'How long can I store your products?', a: 'Please refrigerate immediately upon delivery and consume within 24 hours for the freshest experience. Our Taak and Lassi are best enjoyed chilled.' },
      { q: 'What flavours are available in Flavoured Milk?', a: 'We currently offer Chocolate, Strawberry, and Rose. Mango (seasonal) is available during the mango season.' },
    ],
  },
  {
    category: 'Orders & Payment',
    items: [
      { q: 'What payment methods do you accept?', a: 'We currently accept Cash on Delivery (COD). Online payment via UPI and cards is coming very soon!' },
      { q: 'How do I track my order?', a: 'Once you\'re signed in, go to "My Orders" to see the real-time status of all your orders.' },
      { q: 'Can I cancel my order?', a: 'You can cancel before the order is "Confirmed" status. After that, please WhatsApp us and we\'ll try to help.' },
      { q: 'Will I get an invoice?', a: 'Yes! A detailed invoice is automatically emailed to you as soon as your order is placed successfully.' },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="page-enter pt-24 pb-20">
      <div className="section-container max-w-3xl">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Support</p>
          <h1 className="font-heading text-4xl text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-500">Everything you need to know about Madhur Dairy.</p>
        </div>

        <div className="space-y-10">
          {faqs.map((section) => (
            <div key={section.category}>
              <h2 className="font-semibold text-brand-green text-sm uppercase tracking-widest mb-5">{section.category}</h2>
              <div className="space-y-4">
                {section.items.map((faq) => (
                  <div key={faq.q} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-card">
                    <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-brand-green-pale rounded-2xl p-8 text-center border border-green-200">
          <h3 className="font-semibold text-gray-900 mb-2">Still have questions?</h3>
          <p className="text-gray-600 text-sm mb-4">WhatsApp us and we'll get back to you within minutes.</p>
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2"
          >
            💬 WhatsApp Us
          </a>
        </div>
      </div>
    </div>
  );
}
