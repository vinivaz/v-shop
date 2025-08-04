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
        
   
          const user = await loginUserWithEmail(credentials?.email, credentials?.password);

          if (!user) {
            return null;
          }
          return user;
 
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
    newUser: '/sign-up'
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({user, account}) {

      try {
        if (account?.provider === 'google') {
          await findUserOrCreate(user as UserProps);
        }

        return true;
      } catch (error) {
        console.error("Erro no callback signIn:", error);
        return false;
      }

    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; 
      }
      return token;
    },
    async session({ session, token }) {
      session.user!.id = token.id as string;
      return session;
    },
  }
};