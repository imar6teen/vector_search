import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId:
        "452494448835-dif79k8o98ffccb9s62a53vkubn7uns6.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
} satisfies NextAuthOptions;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
