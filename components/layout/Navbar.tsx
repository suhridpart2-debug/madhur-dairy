'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: components/layout/Navbar.tsx
// ═══════════════════════════════════════════════════════════════════════════════
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'Our Heritage' },
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
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-xl shadow-sm transition-all duration-300',
        scrolled
          ? 'bg-emerald-50/70 shadow-emerald-900/5'
          : 'bg-transparent shadow-transparent'
      )}
    >
      <nav className="flex justify-between items-center max-w-7xl mx-auto px-8 h-20">
        <Link href="/" className="text-2xl font-stitch-headline font-bold text-emerald-950 tracking-tighter">
          Madhur
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-10 font-stitch-headline text-lg tracking-tight leading-relaxed">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-emerald-800/80 hover:text-emerald-950 transition-colors font-medium border-b-2 border-transparent hover:border-emerald-900 pb-1"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <button
            onClick={openCart}
            className="relative p-2 hover:bg-emerald-100/50 rounded-lg transition-all scale-95 duration-200 ease-in-out"
          >
            <span className="material-symbols-outlined text-emerald-900">shopping_bag</span>
            {itemCount > 0 && (
              <span className="absolute -top-0 right-0 bg-primary text-on-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-surface">
                {itemCount > 9 ? '9+' : itemCount}
              </span>
            )}
          </button>

          {/* User Menu */}
          {session ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-xl p-2 hover:bg-emerald-100/50 transition-colors"
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
                  <span className="material-symbols-outlined text-emerald-900">account_circle</span>
                )}
                <span className="hidden md:block text-sm font-medium text-emerald-950 max-w-[100px] truncate">
                  {session.user.name?.split(' ')[0]}
                </span>
                <span className="material-symbols-outlined text-sm text-emerald-800">expand_more</span>
              </button>

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-2 w-52 bg-surface rounded-xl shadow-[0_10px_30px_rgba(0,51,41,0.1)] border border-outline-variant/30 py-2 z-20">
                    <div className="px-4 py-2 border-b border-outline-variant/30">
                      <p className="text-sm font-semibold text-primary truncate">{session.user.name}</p>
                      <p className="text-xs text-on-surface-variant truncate">{session.user.email}</p>
                    </div>
                    <Link
                      href="/orders"
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary hover:bg-surface-container-low transition-colors"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <span className="material-symbols-outlined text-lg">local_shipping</span> My Orders
                    </Link>
                    {session.user.role === 'admin' && (
                      <Link
                        href="/admin"
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-on-primary-container bg-primary-container/10 hover:bg-primary-container/20 transition-colors"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <span className="material-symbols-outlined text-lg">settings</span> Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={() => { signOut({ callbackUrl: '/' }); setUserMenuOpen(false); }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-error hover:bg-error-container/50 transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">logout</span> Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link href="/auth/signin" className="bg-primary text-on-primary px-4 py-2 rounded-lg font-semibold text-sm hover:bg-primary-container transition-all">
              Sign In
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-emerald-900"
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-emerald-50 backdrop-blur-xl shadow-lg border-t border-emerald-900/10 p-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-4 py-3 text-emerald-950 font-stitch-headline text-lg hover:bg-emerald-100/50 rounded-xl transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
