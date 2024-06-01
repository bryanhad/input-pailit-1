"use server"
import db from "@/lib/db"
import crypto from "crypto"
import { createTransport } from "nodemailer"
import { formatDistanceToNow } from "date-fns"
import { signIn } from "@/app/auth"
import {
    EmptyPasswordError,
    InvalidTokenError,
    LoginError,
} from "./constructors"
import bcrypt from "bcrypt"

function generateToken() {
    return crypto.randomBytes(32).toString("hex")
}

async function storeToken(email: string) {
    // TODO: remove comment
    // const existingToken = await db.verificationToken.findFirst({
    //     where: {
    //         email,
    //         expires: { gt: new Date() },
    //     },
    // })

    // query verification token by users email
    const usersToken = await db.verificationToken.findFirst({
        where: { email },
    })
    if (usersToken) {
        if (usersToken.expires >= new Date()) {
            //if the token is still valid (NOT EXPIRED)
            const timeLeft = formatDistanceToNow(usersToken.expires, {
                addSuffix: true,
            })
            throw new LoginError(
                "Magic link already sent",
                `You can send it again ${timeLeft}.`
            )
        } else {
            //if the token has EXPIRED
            //UPDATE the usersToken. generate a new token and refresh the expiry date.
            const newToken = generateToken()
            const expires = new Date(Date.now() + 24 * 3600 * 1000) // Token expires in 1 day (24 hours)

            await db.verificationToken.update({
                where: { email },
                data: { token: newToken, expires },
            })

            return newToken
        }
    }
    // TODO: remove comment
    // if (existingToken) {
    //     const timeLeft = formatDistanceToNow(existingToken.expires, {
    //         addSuffix: true,
    //     })
    //     throw new Error(
    //         `Magic link already sent. You can send it again ${timeLeft}.`
    //     )
    // }

    const token = generateToken()
    const expires = new Date(Date.now() + 24 * 3600 * 1000) // Token expires in 1 day (24 hours)

    await db.verificationToken.create({
        data: {
            email,
            token,
            expires,
        },
    })
    return token
}

export async function sendVerificationEmailToNewUser(email: string) {
    try {
        const existingUser = await db.user.findUnique({
            where: { email },
        })
        if (existingUser) {
            throw new LoginError(
                "Cannot use this email",
                "User with this email already exists."
            )
        }
        await sendVerificationEmail(email)

        return { success: "Verification email successfully sent." }
    } catch (err: LoginError | Error | unknown) {
        if (err instanceof LoginError) {
            return { error: { title: err.title, message: err.message } }
        }
        return {
            error: { title: "Server Error", message: "Something went wrong" },
        }
    }
}

export async function sendVerificationEmail(email: string) {
    const token = await storeToken(email)

    const transporter = createTransport({
        host: process.env.SMTP_SERVER,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    })

    const url = `${process.env.APP_URL}/confirmation/${token}`
    const { host } = new URL(url)

    const result = await transporter.sendMail({
        to: email,
        from: process.env.EMAIL_FROM,
        subject: `Sign in to ${host}`,
        text: text({ url, host }),
        html: html({ url, host }),
    })
    const failed = result.rejected.concat(result.pending).filter(Boolean)
    if (failed.length) {
        throw new LoginError(
            "Failed to send email",
            `Email(s) (${failed.join(", ")}) could not be sent`
        )
    }
}

function html({ url, host }: { url: string; host: string }) {
    const escapedHost = host.replace(/\./g, "&#8203;.")

    // const brandColor = theme.brandColor || "#346df1"
    const color = {
        background: "#f9f9f9",
        text: "#444",
        mainBackground: "#fff",
        buttonBackground: "#346df1",
        buttonBorder: "#346df1",
        buttonText: "#fff",
    }

    return `
  <body style="background: ${color.background};">
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Sign in to <strong>${escapedHost}</strong>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                  in</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: { url: string; host: string }) {
    return `Sign in to ${host}\n${url}\n\n`
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
            // on the front end, if it catches EmptyPasswordError, it will redirect the user to the on-boarding page.
            throw new EmptyPasswordError("", "", sessionWithUser.userId)
        }
        throw new InvalidTokenError(
            "Invalid Token",
            "The token has either been used, expired, or is invalid."
        )
    }

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
                "User Not Found",
                `user with id '${userId}' is not found`
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
            redirect: false,
        })
    } catch (err: LoginError | Error | unknown) {
        if (err instanceof LoginError) {
            return { error: { title: err.title, message: err.message } }
        }
        return {
            error: { title: "Server Error", message: "Something went wrong" },
        }
    }
}

export async function loginWithCredentials(email: string, password: string) {
    try {
        await signIn("credentials", {
            email,
            password,
            callbackUrl: "/dashboard",
            redirect: false,
        })
    } catch (err: LoginError | Error | unknown) {
        if (err instanceof LoginError) {
            return { error: { title: err.title, message: err.message } }
        }
        return {
            error: { title: "Server Error", message: "Something went wrong" },
        }
    }
}
