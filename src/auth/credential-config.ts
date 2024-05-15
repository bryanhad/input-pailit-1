import { emailSchema } from '@/auth/validation'
import db from '@/lib/db'
import { CredentialsSignin } from 'next-auth'
import { CredentialsConfig } from 'next-auth/providers/credentials'

class InvalidLoginError extends CredentialsSignin {
    code = 'Invalid identifier or password'
}

export const credentialsOptions: Partial<CredentialsConfig> = {
    credentials: {
        email: { label: 'email' },
    },
    authorize: async (credentials) => {
        try {
            const parsedEmail = emailSchema.parse(credentials.email)
            const user = await db.user.findUnique({
                where: { email: parsedEmail },
                include: { sessions: { select: { expires: true } } },
            })

            if (!user) {
                return null
            }
            // TODO: IF CURRENT USER'S SESSION IS EXPIRED, SEND THE VERIFICATION EMAIL AGAIN TO RENEW IT!
            // if (user.sessions)

            return user
        } catch (err) {
            console.log(err)
            return null
        }
    },
}
