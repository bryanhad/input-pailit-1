import { consumeToken } from "@/app/auth/actions"
import { EmptyPasswordError, InvalidTokenError } from "@/app/auth/constructors"
import { redirect } from "next/navigation"

async function EmailConfirmationPage({
    params,
}: {
    params: { token?: string[] }
}) {
    const token = params.token ? params.token[0] : undefined
    if (!token) {
        return <div>NO ADA TOKEN!!!!</div>
    }

    try {
        const res = await consumeToken(token)
        return (
            <div>
                HOORAY! {res.email} is now valid! it is valid until{" "}
                {res.expires}
            </div>
        )
    } catch (err) {
        if (err instanceof EmptyPasswordError) {
            redirect(`/on-boarding/${err.userId}`)
        }
        if (err instanceof InvalidTokenError) {
            return <div>{err.message}</div>
        }
        return <div>Oh noose! Something went wrong!!!</div>
    }
}

export default EmailConfirmationPage
