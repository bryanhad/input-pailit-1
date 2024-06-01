import { consumeToken } from "@/app/auth/actions"
import { EmptyPasswordError, InvalidTokenError } from "@/app/auth/constructors"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"

async function EmailConfirmationPage({
    params,
}: {
    params: { token?: string[] }
}) {
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
                    <Link href={`/on-boarding/${res.userId}`}>
                        COMPLETE ACCOUNT SET UP
                    </Link>
                </Button>
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
