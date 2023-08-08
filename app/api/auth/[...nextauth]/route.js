import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { PrismaAdapter } from "@auth/prisma-adapter";

const prisma = new PrismaClient();

export const authOptions: AuthOptions = {
   adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
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
        async session({ session, user, token}) {
            session.user.id = token.sub;
            return session;
        },
        async jwt({ token, user, account, profile, isNewUser }) {
        console.log("jwt callback token", token);
        console.log("jwt callback user", user);
        console.log("jwt callback account", account);
        console.log("jwt callback profile", profile);
        console.log("jwt callback isNewUser", isNewUser);
            return token;
        },
        async signIn({ user, account, profile, email, credentials }) {

            console.log("signIn callback", { user, account, profile, email, credentials });
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