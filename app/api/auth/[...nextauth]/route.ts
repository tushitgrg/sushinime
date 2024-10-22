import prisma from "@/lib/prisma";
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { session } from "@/lib/getsessionuser";


const options:NextAuthOptions = {
  session: {strategy:'jwt'},
    providers: [
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      })
    ],
    callbacks:{
        async signIn({account, profile}) {
            if(!profile?.email) throw new Error('No profile')
console.log(JSON.stringify(profile))
              await prisma.user.upsert({
                where: {
                  email: profile.email,
                },
                create: {
                  email: profile.email,
                  name: profile.name,
                 
                },
                update: {
                  name: profile.name,
                
                },
              })
            return true
        }, session,     async jwt({ token, user, account, profile }) {
          if (profile) {
            const user = await prisma.user.findUnique({
              where: {
                email: profile.email,
              },
            })
            if (!user) {
              throw new Error('No user found')
            }
            token.id = user.id
          }
          return token
        },
      


    }
    
  }
  const handler = NextAuth(options)
export { handler as GET, handler as POST }