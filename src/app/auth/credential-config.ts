import { credentialsSchema } from "@/app/auth/validation"
import db from "@/lib/db"
import { CredentialsConfig } from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import {
    LoginError,
    ExpiredSessionError,
    EmptyPasswordError,
} from "./constructors"
import { sendVerificationEmail } from "./actions"

export const credentialsOptions: Partial<CredentialsConfig> = {
    credentials: {
        email: { label: "email" },
        password: { label: "Password" },
    },
    authorize: async (credentials) => {
        const { email, password } = credentialsSchema.parse(credentials)
        const user = await db.user.findUnique({
            where: { email },
            include: { sessions: { select: { expires: true } } },
        })

        if (!user || !user.password) {
            throw new LoginError("Bad Request", "Invalid email or password.")
        }
        if (new Date() > user.sessions[0].expires) {
            // if user's session already expired..
            await sendVerificationEmail(user.email)
            throw new ExpiredSessionError(
                "Session Expired",
                `Your session has expired. Check 
                your email inbox for a refresh link.`
            )
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            throw new LoginError("Bad Request", "Invalid email or password.")
        }
        return user
    },
}
