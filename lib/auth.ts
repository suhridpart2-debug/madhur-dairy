// ═══════════════════════════════════════════════════════════════════════════════
// FILE: lib/auth.ts  — NextAuth configuration
// ═══════════════════════════════════════════════════════════════════════════════
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { connectDB } from './db';
import { User } from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    // Called when a user signs in — create/update user in DB
    async signIn({ user, account }) {
      if (account?.provider !== 'google') return false;
      try {
        await connectDB();
        const existing = await User.findOne({ email: user.email });
        if (!existing) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.email === process.env.ADMIN_EMAIL ? 'admin' : 'user',
          });
        }
        return true;
      } catch {
        return false;
      }
    },

    // Called when JWT is created/updated — inject user ID and role
    async jwt({ token }) {
      if (!token.email) return token;
      try {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email }).select('_id role');
        if (dbUser) {
          token.id = dbUser._id.toString();
          token.role = dbUser.role;
        }
      } catch {
        // silently continue with existing token
      }
      return token;
    },

    // Called when session is checked — expose id and role to client
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Extend NextAuth types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string;
    role?: string;
  }
}
