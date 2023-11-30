import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prismadb from "@/lib/prismadb";





export const authOptions:NextAuthOptions = {
   adapter: PrismaAdapter(prismadb),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
            authorization: {
                params: {
                  prompt: "consent",
                  access_type: "offline",
                  response_type: "code"
                }
            },
        }),
    ],
    callbacks: {
        async session({ session, user, token }:any) {
            session.user.id = token.sub;
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }:any) {
        // console.log("jwt callback token", token);
        // console.log("jwt callback user", user);
        // console.log("jwt callback account", account);
        // console.log("jwt callback profile", profile);
        // console.log("jwt callback isNewUser", isNewUser);
            return token;
        },
        async signIn({ user, account, profile, email, credentials }: any) {

            // console.log("signIn callback", { user, account, profile, email, credentials });
            return true;
        },
    }, 
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
    pages: {
        signIn: "/"
    }
        
};



const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }