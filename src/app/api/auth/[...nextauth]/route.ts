import { insertUser, isUserExist } from "@/lib/dbMethod";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user: { email, image, name } }) {
      if (await isUserExist(email as string)) return true;
      const isInserted = await insertUser({
        email: email as string,
        image: image as string,
        name: name as string,
      });
      if (isInserted) return true;
      return false;
    },
  },
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
