import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUserWithEmail } from "@/lib/api/auth";

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
        
        if (user) {
          return user;
        }
        return null;
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
  async jwt({ token, user }) {
    if (user) {
      token.id = user.id; // <-- salva no token
    }
    return token;
  },
  async session({ session, token }) {
    session.user.id = token.id as string; // <-- usa sempre o mesmo campo
    return session;
  },
}
};