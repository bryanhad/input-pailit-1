import { emailSchema } from "@/components/auth/validation"
import db from "@/lib/db"
import { CredentialsConfig } from "next-auth/providers/credentials"

export const credentialsOptions: Partial<CredentialsConfig> = {
    credentials: {
        email: {},
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
