import { prisma } from "@prisma/PrismaClient";
import { compare, hashSync } from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions: AuthOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID || "",
         clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      }),
      TwitterProvider({
         clientId: process.env.TWITTER_CLIENT_ID || "",
         clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
      }),
      CredentialsProvider({
         name: "Credentials",
         credentials: {
            email: { label: "Email", type: "text" },
            password: { label: "Password", type: "password" },
         },
         async authorize(credentials) {
            if (!credentials) {
               return null;
            }

            const values = {
               email: credentials.email,
            };

            const findUser = await prisma.user.findFirst({
               where: values,
            });

            if (!findUser) {
               throw new Error("Invalid email or password");
            }

            const isPasswordValid = await compare(
               credentials.password,
               findUser.password,
            );

            if (!isPasswordValid) {
               return null;
            }

            return {
               id: String(findUser.id),
               email: findUser.email,
               name: findUser.userName,
               role: findUser.role,
            };
         },
      }),
   ],
   secret: process.env.NEXTAUTH_SECRET,
   session: {
      strategy: "jwt",
   },
   callbacks: {
      async signIn({ user, account }) {
         try {
            if (account?.provider === "credentials") {
               return true;
            }

            if (!user.email) {
               return false;
            }

            const findUser = await prisma.user.findFirst({
               where: {
                  OR: [
                     {
                        provider: account?.provider,
                        providerId: account?.providerAccountId || "",
                     },
                     { email: user.email },
                  ],
               },
            });

            if (findUser) {
               await prisma.user.update({
                  where: {
                     id: findUser.id,
                  },
                  data: {
                     provider: account?.provider,
                     providerId: account?.providerAccountId || "",
                  },
               });

               return true;
            }

            await prisma.user.create({
               data: {
                  email: user.email,
                  userName: user.name || "User #" + user.id,
                  password: hashSync(user.id.toString(), 10),
                  verified: new Date(),
                  provider: account?.provider,
                  providerId: account?.providerAccountId,
                  imageUrl: user.image || "",
               },
            });

            return true;
         } catch (e) {
            console.error(e);
            return false;
         }
      },
      async jwt({ token }) {
         if (!token.email) {
            return token;
         }

         const user = await prisma.user.findFirst({
            where: {
               email: token.email,
            },
         });

         if (user) {
            token.id = String(user.id);
            token.email = user.email;
            token.fullName = user.userName;
            token.role = user.role;
         }
         return token;
      },
      async session({ session, token }) {
         if (session?.user) {
            (session.user as any).id = token.id;
            (session.user as any).role = token.role;
         }
         return session;
      },
   },
};
