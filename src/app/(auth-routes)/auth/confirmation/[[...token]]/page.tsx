import { auth } from "@/auth"
import { consumeToken } from "@/auth/actions"
import { ErrorTypeExtended, LoginError } from "@/auth/errors"
import { DEFAULT_LOGIN_REDIRECT } from "@/auth/routes"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

async function EmailConfirmationPage({
    params,
}: {
    params: { token?: string[] }
}) {
    const session = await auth()
    // if the user is signed in, redirect them to '/dashboard'
    if (session) {
        redirect(DEFAULT_LOGIN_REDIRECT)
    }

    const token = params.token ? params.token[0] : undefined
    if (!token) {
        redirect("/")
    }

    try {
        const res = await consumeToken(token)
        return (
            <div>
                HOORAY! {res.email} is now valid! it is valid until{" "}
                {res.expires}
                <Button asChild>
                    <Link href={`/auth/on-boarding/${res.userId}`}>
                        COMPLETE ACCOUNT SET UP
                    </Link>
                </Button>
            </div>
        )
    } catch (err) {
        if (err instanceof LoginError) {
            switch (err.type as ErrorTypeExtended) {
                case "IncompleteAccountSetup":
                    return redirect(`/auth/on-boarding/${err.message}`)
            }
            return <div>{err.message}</div>
        }
        return <div>Oh noose! Something went wrong!!!</div>
    }
}

export default EmailConfirmationPage
