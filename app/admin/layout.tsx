'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/admin/layout.tsx  — Admin sidebar layout
// ═══════════════════════════════════════════════════════════════════════════════
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, ShoppingBag, Package, Users,
  BarChart2, FileText, Bell, Settings, ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const sidebarLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/customers', label: 'Customers', icon: Users },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart2 },
  { href: '/admin/invoices', label: 'Invoices', icon: FileText },
  { href: '/admin/notifications', label: 'Notifications', icon: Bell },
  { href: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-50 pt-16">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 fixed top-16 bottom-0 left-0 overflow-y-auto z-30 hidden lg:block">
        <div className="p-5">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 px-3">Admin Panel</p>
          <nav className="space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                    isActive
                      ? 'bg-brand-green text-white shadow-md'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  )}
                >
                  <Icon size={18} />
                  {link.label}
                  {isActive && <ChevronRight size={14} className="ml-auto" />}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-gray-100">
          <Link href="/" className="text-xs text-gray-400 hover:text-brand-green transition-colors">
            ← Back to Website
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 lg:ml-64 p-6 lg:p-8">{children}</main>
    </div>
  );
}
