import { emailSchema } from '@/auth/validation'
import db from '@/lib/db'
import { CredentialsSignin } from '@auth/core/errors'
import { CredentialsConfig } from 'next-auth/providers/credentials'

export class CustomError extends CredentialsSignin {
    code = 'custom'
}

export const credentialsOptions: Partial<CredentialsConfig> = {
    credentials: {
        email: { label: 'email' },
    },
    authorize: async (credentials) => {
        // try {
        const parsedEmail = emailSchema.parse(credentials.email)
        const user = await db.user.findUnique({
            where: { email: parsedEmail },
            include: { sessions: { select: { expires: true } } },
        })

        if (!user) {
            console.log('error?')
            throw new CustomError()
            console.log('error?')
        }
        // TODO: IF CURRENT USER'S SESSION IS EXPIRED, SEND THE VERIFICATION EMAIL AGAIN TO RENEW IT!
        // if (user.sessions)

        return user
        // } catch (err) {
        //     console.log(err)
        //     return null
        // }
    },
}
