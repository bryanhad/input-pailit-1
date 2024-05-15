import { emailSchema } from "@/auth/validation"
import db from "@/lib/db"
import { CredentialsSignin } from "next-auth"
import { CredentialsConfig } from "next-auth/providers/credentials"

class InvalidLoginError extends CredentialsSignin {
    code = "Invalid identifier or password"
  }

export const credentialsOptions: Partial<CredentialsConfig> = {
    credentials: {
        email: {label: 'email'},
    },
    authorize: async (credentials) => {
        try {
            const parsedEmail = emailSchema.parse(credentials.email)
            const user = await db.user.findUnique({
                where: { email: parsedEmail },
            })

            if (!user) {
                return null
            }

            return user
        } catch (err) {
            console.log(err)
            return null
        }
    },
}
