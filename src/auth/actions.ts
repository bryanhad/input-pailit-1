"use server"

import { auth, signIn, signOut } from "@/auth"
import {
    EmailAlreadyInUseError,
    ErrorTypeExtended,
    IncompleteAccountSetupError,
    InvalidTokenError,
    LoginError,
    SendEmailError,
} from "@/auth/errors"
import { DEFAULT_LOGIN_REDIRECT } from "@/auth/routes"
import db from "@/lib/db"
import bcrypt from "bcryptjs"
import { formatDistanceToNow } from "date-fns"
import { redirect } from "next/navigation"
import { sendEmailThroughNodeMailerTransport, storeToken } from "./lib"
import { LoginFormValues, loginSchema } from "./validation"



/**
 * Checks whether the user has signed in or not.
 * If the user is NOT SIGNED IN => redirect to '/'
 */
export async function mustLogin() {
    const session = await auth()
    // if user is not logged in
    if (!session) {
        redirect("/auth/sign-in")
    }

    return session.user
}

/**
 * Checks whether the user has signed in or not.
 * If the user is SIGNED IN => redirect to '/dashboard'
 */
export async function mustNotLogin() {
    const session = await auth()
    // if user is not logged in
    if (session) {
        redirect(DEFAULT_LOGIN_REDIRECT)
    }
}

export async function sendVerificationEmail(email: string) {
    const token = await storeToken(email)
    const res = await sendEmailThroughNodeMailerTransport(email, token)
    if (res.length) {
        throw new SendEmailError(
            `Email(s) (${res.join(", ")}) could not be sent`,
            "Failed to send email"
        )
    }
}

export async function sendVerificationEmailToNewUser(email: string) {
    try {
        const existingUser = await db.user.findUnique({
            where: { email },
        })
        if (existingUser) {
            throw new EmailAlreadyInUseError(
                "User with this email already exists.",
                "Cannot use this email"
            )
        }
        await sendVerificationEmail(email)

        return { success: "Verification email successfully sent." }
    } catch (err) {
        if (err instanceof LoginError) {
            return { error: err.message, title: err.title }
        }
        return { error: "Something went wrong!" }
    }
}

export async function login(values: LoginFormValues) {
    const parsedValues = loginSchema.safeParse(values)
    if (parsedValues.error) {
        return { error: "Invalid fields!" }
    }

    const { email, password } = parsedValues.data

    try {
        const [user] = await Promise.all([
            db.user.findUnique({where: {email}, select:{name:true}}),
            signIn("credentials", {
                email,
                password,
                redirectTo: DEFAULT_LOGIN_REDIRECT,
            })
        ])
        if (!user) {
            throw new LoginError('Cannot find user')
        }
        return {success: `Wellcome back ${user?.name}`}
    } catch (err) {
        if (err instanceof LoginError) {
            switch (err.type as ErrorTypeExtended) {
                case "InvalidCredentials":
                    return { error: err.message }
                default:
                    return { error: err.message || "Something went wrong!" }
            }
        }
        // IMPORTANT: if you are using signIn inside a server action, inside the catch clause, below the if clause, you also need to throw the err. if not, after a successful login, it will not redirect the user.
        throw err
    }
}

export async function logout() {
    try {
        await signOut({ redirectTo: "/" })
    } catch (err) {
        if (err instanceof LoginError) {
            return { error: err.message || "Something went wrong!" }
        }
        // IMPORTANT: if you are using signIn inside a server action, inside the catch clause, below the if clause, you also need to throw the err. if not, after a successful login, it will not redirect the user.
        throw err
    }
}

export async function consumeToken(token: string) {
    // 1. check if token is still valid or not
    const verificationToken = await db.verificationToken.findFirst({
        where: {
            token,
            expires: { gt: new Date() },
        },
    })
    if (!verificationToken) {
        const sessionWithUser = await db.session.findUnique({
            where: { sessionToken: token },
            include: { user: { select: { password: true } } },
        })

        if (sessionWithUser && !sessionWithUser.user.password) {
            // if the session exist and user's password is empty
            // on the front end, if it catches IncompleteAccountSetupError, it will redirect the user to the on-boarding page.
            throw new IncompleteAccountSetupError(sessionWithUser.userId)
        }
        throw new InvalidTokenError(
            "The token has either been used, expired, or is invalid.",
            "Invalid Token"
        )
    }

    // AT THIS POINT, USER
    return await db.$transaction(async (tx) => {
        // FIND OR CREATE USER
        const user = await tx.user.upsert({
            where: { email: verificationToken.email },
            update: {},
            create: {
                email: verificationToken.email,
                emailVerified: new Date(),
            },
        })

        const session1 = await tx.session.upsert({
            where: { sessionToken: token },
            update: {
                expires: new Date(Date.now() + 30 * 24 * 3600 * 1000), // Reset session expiration to 30 days
            },
            create: {
                userId: user.id,
                sessionToken: token,
                expires: new Date(Date.now() + 30 * 24 * 3600 * 1000), // Session expires in 30 days
            },
        })

        await tx.verificationToken.delete({
            where: { email: verificationToken.email },
        })

        return {
            email: user.email,
            userId: user.id,
            expires: formatDistanceToNow(session1.expires, {
                addSuffix: true,
            }),
        }
    })
}

export async function updateUserNameAndPasswordThenSignIn(
    userId: string,
    name: string,
    password: string
) {
    try {
        // 1. get the user and verify it
        const user = await db.user.findUnique({ where: { id: userId } })
        if (!user) {
            throw new LoginError(
                `user with id '${userId}' is not found`,
                "User Not Found"
            )
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await db.user.update({
            where: { id: userId },
            data: { password: hashedPassword, name },
        })
        await signIn("credentials", {
            email: user.email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT,
        })
    } catch (err) {
        if (err instanceof LoginError) {
            return {
                title: err.title,
                error: err.message || "Something went wrong!",
            }
        }
        // IMPORTANT: if you are using signIn inside a server action, inside the catch clause, below the if clause, you also need to throw the err. if not, after a successful login, it will not redirect the user.
        throw err
    }
}
