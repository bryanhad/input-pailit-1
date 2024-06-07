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
        // Credentials(credentialsOptions),
    ],
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)
