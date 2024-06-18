import db from "@/lib/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import bcrypt from "bcryptjs"
import NextAuth from "next-auth"
import credentials from "next-auth/providers/credentials"
import { sendVerificationEmail } from "./actions"
import {
    InvalidCredentialsError,
    LoginError,
    SessionExpiredError,
    SessionNotFoundError,
} from "./errors"
import { loginSchema } from "./validation"
import { DefaultSession } from "next-auth"
import { UserStatus } from "@/types"

declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: {
            /** The user's postal address. */
            name: string | null
            image: string | null
            role: string
            emailVerified: Date | null
            createdAt: Date
            email: string
            id: string
            status: string
            /**
             * By default, TypeScript merges new interface properties and overwrites existing ones.
             * In this case, the default session user properties will be overwritten,
             * with the new ones defined above. To keep the default session user properties,
             * you need to add them back into the newly declared interface.
             */
        } & DefaultSession["user"]
    }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    // session: { strategy: "database" },
    callbacks: {
        async jwt({ token, account, user, profile }) {
            // on this token, we will get the user's id on the sub field in the token object
            if (!token.sub) {
                return token
            }

            const existingUser = await db.user.findUnique({
                where: { id: token.sub },
            })
            if (!existingUser) return token

            token.name = existingUser.name
            token.email = existingUser.email
            token.role = existingUser.role
            token.emailVerified = existingUser.emailVerified
            token.createdAt = existingUser.createdAt
            token.id = existingUser.id
            token.status = existingUser.status

            return token
        },
        session({ session, token, user }) {
            // console.log({token,user,session})
            if (token.role) {
                session.user.role = token.role as string
            }
            if (token.emailVerified) {
                session.user.emailVerified = token.emailVerified as Date | null
            }
            if (token.createdAt) {
                session.user.createdAt = token.createdAt as Date
            }
            if (token.id) {
                session.user.id = token.id as string
            }
            if (token.status) {
                session.user.status = token.status as string
            }
            // `session.user.address` is now a valid property, and will be type-checked
            // in places like `useSession().data.user` or `auth().user`
            return session
        },
    },
    providers: [
        credentials({
            // TODO: if user's isActive is false, don't let them in!
            async authorize(credentials) {
                const parsedFields = loginSchema.safeParse(credentials)

                if (parsedFields.success) {
                    const { email, password } = parsedFields.data

                    const user = await db.user.findUnique({
                        where: { email },
                        include: { session: { select: { expires: true } } },
                    })
                    if (!user || !user.password) {
                        throw new InvalidCredentialsError(
                            "Invalid email or password."
                        )
                    }
                    if (user.status !== UserStatus.active) {
                        throw new LoginError(
                            "Your account has been deactivated by an admin",
                            "Inactive User"
                        )
                    }
                    if (!user.session) {
                        throw new SessionNotFoundError(
                            "A user must have a session to log in."
                        )
                    }
                    if (new Date() > user.session.expires) {
                        // if user's session already expired..
                        await sendVerificationEmail(user.email)
                        throw new SessionExpiredError(
                            `Your session has expired. Check your email inbox for a refresh link.`
                        )
                    }

                    const passwordsMatch = await bcrypt.compare(
                        password,
                        user.password
                    )

                    if (!passwordsMatch) {
                        throw new InvalidCredentialsError(
                            "Invalid email or password."
                        )
                    }
                    return user
                }
                return null
            },
        }),
    ],
})
