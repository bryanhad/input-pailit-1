import db from '@/lib/db'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth, { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import Nodemailer from 'next-auth/providers/nodemailer'
import { credentialsOptions } from './credential-config'
import { nodeMailerOptions } from './node-mailer-config'

const authOptions: NextAuthConfig = {
    adapter: PrismaAdapter(db),
    providers: [
        //  TO SEND EMAIL
        Nodemailer(nodeMailerOptions),
        // TO LOGIN VIA EMAIL, ONLY WORKS IF THE USER HAS ALREADY CLICKED THE MAGIC LINK
        Credentials(credentialsOptions),
    ],
    // secret: process.env.AUTH_SECRET,
    callbacks: {
        async signIn({ user, account, email, credentials, profile }) {
            // if (user.)
            // const verificationToken = await db.verificationToken.
            // if provider = nodemailer, then just allow it. *ADMIN is creating a new user*
            // if provider =
            console.log({ user, account, email, credentials, profile })
            console.log(
                '++++++++++++++++++++++++++++++++++++++ LOGIN VIA:',
                account?.provider
            )

            // if (account?.provider === "nodemailer") {
            //     console.log({ user, account, email, credentials, profile })
            //     return true
            // }

            return true
        },
    },
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)
