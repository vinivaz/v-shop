import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserOrCreate, loginUserWithEmail } from "@/lib/api/auth";

type UserProps = {
    id: string;
    name: string;
    email: string;
    image?: string;
  }


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        
        try {
          const user = await loginUserWithEmail(credentials?.email, credentials?.password);
          return user;
        } catch (error) {
          if (error instanceof Error) {
            throw new Error(error.message);
          }
          throw new Error("Erro ao fazer login.");
        }
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up'
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
callbacks: {
  async signIn({user, account}) {
    if (account?.provider === 'google') {
      await findUserOrCreate(user as UserProps)
    }

    return true;
  },

  async jwt({ token, user }) {
    if (user) {
      token.id = user.id; 
    }
    return token;
  },
  async session({ session, token }) {
    session.user.id = token.id as string;
    return session;
  },
}
};