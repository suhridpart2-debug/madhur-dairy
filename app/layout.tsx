// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/layout.tsx  — Root layout: session provider, fonts, metadata
// ═══════════════════════════════════════════════════════════════════════════════
import type { Metadata } from 'next';
import './globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { SessionProvider } from '@/components/providers/SessionProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer'; // ✅ ADD THIS
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'Madhur Dairy — Pure. Fresh. Delivered.',
    template: '%s | Madhur Dairy',
  },
  description:
    'Order fresh Taak, Lassi, and Flavoured Milk online. Made fresh daily, no preservatives, delivered to your door.',
  keywords: ['dairy', 'madhur', 'taak', 'lassi', 'buttermilk', 'fresh milk', 'Maharashtra'],
  openGraph: {
    title: 'Madhur Dairy — Pure. Fresh. Delivered.',
    description: 'Premium dairy products delivered fresh to your door.',
    type: 'website',
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <head />
      <body className="font-body antialiased">
        <SessionProvider session={session}>
          
          {/* Navbar */}
          <Navbar />

          {/* ✅ Cart Drawer (IMPORTANT FIX) */}
          <CartDrawer />

          {/* Main Content */}
          <main className="min-h-screen">{children}</main>

          {/* Footer */}
          <Footer />

          {/* Toast */}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#111827',
                color: '#F9FAFB',
                borderRadius: '12px',
                fontFamily: 'var(--font-body)',
                fontSize: '14px',
              },
              success: {
                iconTheme: { primary: '#2D7A3A', secondary: '#fff' },
              },
            }}
          />

        </SessionProvider>
      </body>
    </html>
  );
}