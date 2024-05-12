import db from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth, { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Nodemailer from "next-auth/providers/nodemailer"
import { credentialsOptions } from "./credential-config"
import { nodeMailerOptions } from "./node-mailer-config"

const authOptions: NextAuthConfig = {
    adapter: PrismaAdapter(db),
    providers: [
        //  TO SEND EMAIL
        Nodemailer(nodeMailerOptions),
        // TO LOGIN VIA EMAIL, ONLY WORKS IF THE USER HAS ALREADY CLICKED THE MAGIC LINK
        Credentials(credentialsOptions),
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async signIn({ user, account, email, credentials, profile }) {
            // if provider = nodemailer, then just allow it. *ADMIN is creating a new user*
            // if provider =

            console.log({ user, account, email, credentials, profile })


            // console.log("INI SIGN IN VIA APA YA?")
            // if (account?.provider === "nodemailer") {
            //     console.log({ user, account, email, credentials, profile })
            //     return true
            // }
            // console.log(account?.provider)
            // console.log(account?.provider)
            // console.log({ user, account, email, credentials, profile })
            // if (!user.email) return false
            // const userExists = await db.user.findUnique({
            //     where: { email: user.email },
            // })
            // if (userExists) {
            //     return true //if the email exists in the User collection, email them a magic login link
            // } else {
            //     return false
            // }
        },
    },
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)
