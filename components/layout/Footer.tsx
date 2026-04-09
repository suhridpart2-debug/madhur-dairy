'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/layout/Footer.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import Link from 'next/link';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-16 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-gray-800">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-green rounded-xl flex items-center justify-center">
                <span className="text-white font-display font-bold text-lg">M</span>
              </div>
              <span className="font-display text-2xl font-bold text-white">Madhur</span>
            </div>
            <p className="text-sm leading-relaxed text-gray-500 mb-5">
              Pure dairy, made fresh every morning. No preservatives, no compromises — just the goodness of milk.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={APP_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-brand-green transition-colors"
              >
                <Instagram size={16} />
              </a>
              <a
                href={APP_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-brand-green transition-colors"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: 'Madhur Taak', href: '/products?category=taak' },
                { label: 'Madhur Lassi', href: '/products?category=lassi' },
                { label: 'Flavoured Milk', href: '/products?category=flavoured-milk' },
                { label: 'All Products', href: '/products' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {[
                { label: 'Our Story', href: '/about' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'My Orders', href: '/orders' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-5 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <Phone size={15} className="mt-0.5 shrink-0 text-brand-green" />
                <span>{APP_CONFIG.contact.phone}</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <Mail size={15} className="mt-0.5 shrink-0 text-brand-green" />
                <span>{APP_CONFIG.contact.email}</span>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <MapPin size={15} className="mt-0.5 shrink-0 text-brand-green" />
                <span>Pune, Maharashtra, India</span>
              </li>
            </ul>
            <div className="mt-5 p-3 bg-gray-800 rounded-xl">
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Delivery Hours</p>
              <p className="text-xs text-gray-400">Mon–Sun · 7 AM – 8 PM</p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <p>© {new Date().getFullYear()} Madhur Dairy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
            <Link href="/delivery-policy" className="hover:text-gray-400 transition-colors">Delivery Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
