import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@server/db/prisma";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "undefined",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "undefined",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  callbacks: {
    jwt: ({ token, user, profile }) => {
      if (user && profile) {
        return {
          user,
          token,
          profile,
        };
      }
      return token;
    },
    session: ({ session, token }) => ({
      ...session,
      ...token,
    }),
  },
});
