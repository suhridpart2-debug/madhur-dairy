'use client';
// ═══════════════════════════════════════════════════════════════════════════════
// FILE: app/auth/signin/page.tsx  — Google Sign-In page
// ═══════════════════════════════════════════════════════════════════════════════
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function SignInPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) router.replace('/products');
  }, [session, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-3 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-hero-gradient flex items-center justify-center px-4 pt-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-premium p-10 border border-gray-100 text-center">
          {/* Brand mark */}
          <div className="w-16 h-16 bg-brand-green rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-md">
            <span className="font-display text-3xl font-bold text-white">M</span>
          </div>
          <h1 className="font-heading text-3xl text-gray-900 mb-2">Welcome to Madhur</h1>
          <p className="text-gray-500 text-sm mb-8">
            Sign in to order fresh dairy products delivered to your door.
          </p>

          {/* Google Sign In */}
          <button
            onClick={() => signIn('google', { callbackUrl: '/products' })}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-2xl px-6 py-4 font-semibold text-gray-700 hover:border-brand-green hover:bg-brand-green-pale transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <div className="mt-6 space-y-2">
            {['🔒 Secure Google authentication', '🚀 No password needed', '📦 Track your orders'].map((f) => (
              <p key={f} className="text-xs text-gray-500">{f}</p>
            ))}
          </div>
        </div>

        {/* Trust note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          By signing in, you agree to our{' '}
          <a href="/terms" className="underline hover:text-gray-600">Terms</a> and{' '}
          <a href="/privacy" className="underline hover:text-gray-600">Privacy Policy</a>.
        </p>
      </motion.div>
    </div>
  );
}
