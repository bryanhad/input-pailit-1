import { createTransport } from 'nodemailer'
import db from '@/lib/db'
import { formatDistanceToNow } from 'date-fns'
import { generateToken } from '@/lib/utils'
import { MagicLinkStillAliveError } from './errors'

export async function storeToken(email: string) {
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
            throw new MagicLinkStillAliveError(
                `You can send it again ${timeLeft}.`,
                'Previous magic link is still valid.'
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
    // BELOW THIS POINT, THE USER IS INDEED NEW!
    // cuz there is not verification_token that matches the user's email!

    const token = generateToken()
    const expires = new Date(Date.now() + 24 * 3600 * 1000) // Token expires in 1 day (24 hours)

    await db.$transaction(async (tx) => {
        await tx.verificationToken.create({
            data: {
                email,
                token,
                expires,
            },
        })
        await tx.user.create({
            data: {
                email,
            },
        })
    })

    return token
}

export async function sendEmailThroughNodeMailerTransport(
    email: string,
    token: string
) {
    const transporter = createTransport({
        host: process.env.SMTP_SERVER,
        port: Number(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    })

    const url = `${process.env.APP_URL}/auth/confirmation/${token}`
    const { host } = new URL(url)

    const result = await transporter.sendMail({
        to: email,
        from: process.env.EMAIL_FROM,
        subject: `Sign in to ${host}`,
        text: createEmailText({ url, host }),
        html: createEmailHTML({ url, host }),
    })
    const failed = result.rejected.concat(result.pending).filter(Boolean)
    // if failed has is empty, then it is success.
    return failed
}

export function createEmailHTML({ url, host }: { url: string; host: string }) {
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
export function createEmailText({ url, host }: { url: string; host: string }) {
    return `Sign in to ${host}\n${url}\n\n`
}
