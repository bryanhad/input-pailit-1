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
    callbacks: {
        async signIn({ user, account, email, credentials, profile }) {
            return true
        },
    },
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)
