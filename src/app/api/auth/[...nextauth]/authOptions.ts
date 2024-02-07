import { getUserId, insertUser, isUserExist } from "@/lib/dbMethod";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
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
    async jwt({ user, token, account }) {
      if (account) token.id = await getUserId(user.email as string);

      return token;
    },
    session({ session, token }) {
      if (session === undefined || session.user === undefined) return session;
      // @ts-ignore
      session.user.id = token.id;
      return session;
    },
  },
} satisfies NextAuthOptions;

export default authOptions;
