'use server'
import db from '@/lib/db'
import crypto from 'crypto'
import { createTransport } from 'nodemailer'
import { formatDistanceToNow } from 'date-fns'
import { VerificationToken } from '@prisma/client'

function generateToken() {
    return crypto.randomBytes(32).toString('hex')
}

async function storeToken(email: string) {
    const existingToken = await db.verificationToken.findFirst({
        where: {
            email,
            expires: { gt: new Date() },
        },
    })
    if (existingToken) {
        const timeLeft = formatDistanceToNow(existingToken.expires, {
            addSuffix: true,
        })
        throw new Error(
            `Magic link already sent. You can send it again ${timeLeft}.`
        )
    }

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

export async function sendVerificationEmail(email: string) {
    const existingUser = await db.user.findUnique({
        where: { email, AND: { sessions: {} } },
    })
    if (existingUser) {
        throw new Error('User with this email already exists.')
    }
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
        throw new Error(`Email(s) (${failed.join(', ')}) could not be sent`)
    }
    return 'Verification email successfully sent.'
}

function html({ url, host }: { url: string; host: string }) {
    const escapedHost = host.replace(/\./g, '&#8203;.')

    // const brandColor = theme.brandColor || "#346df1"
    const color = {
        background: '#f9f9f9',
        text: '#444',
        mainBackground: '#fff',
        buttonBackground: '#346df1',
        buttonBorder: '#346df1',
        buttonText: '#fff',
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
        throw new Error('Token is invalid or has expired')
    }

    return db.$transaction(async (tx) => {
        // Upsert user
        const user = await tx.user.upsert({
            where: { email: verificationToken.email },
            update: {},
            create: {
                email: verificationToken.email,
                emailVerified: new Date(),
            },
        })

        let session = await tx.session.findFirst({
            where: { userId: user.id },
        })

        if (session) {
            // Update session expiration time
            session = await tx.session.update({
                where: { sessionToken: token },
                data: {
                    expires: new Date(Date.now() + 30 * 24 * 3600 * 1000), // Reset session expiration to 30 days
                },
            })
        } else {
            // Create session if it doesn't exist
            session = await tx.session.create({
                data: {
                    userId: user.id,
                    sessionToken: generateToken(),
                    expires: new Date(Date.now() + 30 * 24 * 3600 * 1000), // Session expires in 30 days
                },
            })
        }
        await tx.verificationToken.delete({
            where: {
                email_token: {
                    email: verificationToken.email,
                    token: verificationToken.token,
                },
            },
        })

        return {
            email: user.email,
            expires: formatDistanceToNow(session.expires, {
                addSuffix: true,
            }),
        }
    })
}
