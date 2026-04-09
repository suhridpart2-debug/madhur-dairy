'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/layout/Navbar.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { ShoppingCart, Menu, X, ChevronDown, User, Package, LogOut, Settings } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
  { href: '/products', label: 'Shop' },
  { href: '/about', label: 'Our Story' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
];

export function Navbar() {
  const { data: session } = useSession();
  const itemCount = useCartStore((s) => s.itemCount());
  const openCart = useCartStore((s) => s.openCart);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass shadow-sm py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="section-container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 bg-brand-green rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
            <span className="text-white font-display font-bold text-lg leading-none">M</span>
          </div>
          <span className="font-display text-2xl font-bold text-gray-900 tracking-tight">
            Madhur
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-gray-600 hover:text-brand-green font-medium text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Cart */}
          <button
            onClick={openCart}
            className="relative p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
            aria-label="Open cart"
          >
            <ShoppingCart size={20} className="text-gray-700" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-brand-green text-white text-xs font-bold rounded-full flex items-center justify-center">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>

          {/* User Menu */}
          {session ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-xl px-3 py-2 hover:bg-gray-100 transition-colors"
              >
                {session.user.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || ''}
                    width={28}
                    height={28}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-7 h-7 bg-brand-green-pale rounded-full flex items-center justify-center">
                    <User size={14} className="text-brand-green" />
                  </div>
                )}
                <span className="hidden md:block text-sm font-medium text-gray-700 max-w-[100px] truncate">
                  {session.user.name?.split(' ')[0]}
                </span>
                <ChevronDown size={14} className="text-gray-500" />
              </button>

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-hover border border-gray-100 py-2 z-20">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900 truncate">{session.user.name}</p>
                      <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
                    </div>
                    <Link
                      href="/orders"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Package size={15} /> My Orders
                    </Link>
                    {session.user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-brand-green font-medium hover:bg-brand-green-pale transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Settings size={15} /> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => { signOut({ callbackUrl: '/' }); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut size={15} /> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link href="/auth/signin" className="btn-primary text-sm py-2.5 px-5">
              Sign In
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2.5 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden glass mt-2 mx-4 rounded-2xl shadow-hover border border-gray-100 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-gray-700 hover:text-brand-green hover:bg-brand-green-pale rounded-xl transition-colors font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
