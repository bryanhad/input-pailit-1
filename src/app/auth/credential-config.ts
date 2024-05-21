import { credentialsSchema } from "@/app/auth/validation"
import db from "@/lib/db"
import { CredentialsConfig } from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { LoginError, ExpiredSessionErrror, EmptyPasswordError } from "./constructors"

export const credentialsOptions: Partial<CredentialsConfig> = {
    credentials: {
        email: { label: "email" },
        password: { label: "Password" },
    },
    authorize: async (credentials) => {
        const { email, password } = credentialsSchema.parse(credentials)
        console.log(email, password)
        const user = await db.user.findUnique({
            where: { email },
            include: { sessions: { select: { expires: true } } },
        })

        if (!user) {
            throw new LoginError("Bad Request", "Invalid email or password.")
        }

        if (!user.password) {
            throw new EmptyPasswordError(
                "Empty Password",
                "User must set a password.",
                user.id
            )
        }

        console.log('sampe sini?1')
        const isPasswordValid = await bcrypt.compare(password, user.password)
        console.log({dbPassword: user.password, inputPassword: password})
        if (!isPasswordValid) {
            console.log(isPasswordValid)
            throw new LoginError("Bad Request", "Invalid email or password.")
        }
        console.log('sampe sini?2')

        if (new Date() > user.sessions[0].expires) {
            throw new ExpiredSessionErrror(
                "Session Expired",
                "We've sent a verification email. Please check your inbox."
            )
        }
        console.log('sampe sini?3')

        return user
    },
}
