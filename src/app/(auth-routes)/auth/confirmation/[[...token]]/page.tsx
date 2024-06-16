import { consumeToken, mustNotLogin } from "@/auth/actions"
import { ErrorTypeExtended, InvalidTokenError, LoginError } from "@/auth/errors"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { redirect } from "next/navigation"
import { PartyPopper, Frown } from "lucide-react"

async function EmailConfirmationPage({
    params,
}: {
    params: { token?: string[] }
}) {
    await mustNotLogin()

    const token = params.token ? params.token[0] : undefined
    if (!token) {
        redirect("/")
    }

    try {
        const res = await consumeToken(token)
  
        return (
            <div className="flex justify-center mt-[7vh]">
                <div className="flex lg:flex-row flex-col gap-6 lg:gap-10 items-center">
                    <PartyPopper className="shrink-0" size={200} />
                    <div className="flex flex-col gap-6 justify-center text-center lg:text-start">
                        <h1 className="text-4xl font-bold">
                            Hooray!
                            <br />
                            Your Email has been verified.
                        </h1>
                        <p className="w-full max-w-[450px]">
                            {res.email}&apos;s account is now valid until{" "}
                            {res.expires}. But, There is one thing left to do..
                        </p>
                        <Button asChild>
                            <Link href={`/auth/on-boarding/${res.userId}`}>
                                COMPLETE ACCOUNT SET UP
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        )
    } catch (err) {
        if (err instanceof LoginError) {
            switch (err.type as ErrorTypeExtended) {
                case "IncompleteAccountSetup":
                    return redirect(`/auth/on-boarding/${err.message}`)
            }
            return (
                <div className="flex justify-center mt-[7vh]">
                    <div className="flex lg:flex-row flex-col gap-6 lg:gap-10 items-center">
                        <Frown className="shrink-0" size={200} />
                        <div className="flex flex-col gap-6 justify-center text-center lg:text-start">
                            <h1 className="text-4xl font-bold">
                                Oh Noose!
                                <br />
                                You have{" "}
                                {err.title
                                    ? err.title.toLowerCase()
                                    : "an unexpected error"}
                                .
                            </h1>
                            <p className="w-full max-w-[450px]">
                                {err.message}
                            </p>
                            <Button asChild>
                                <Link href={`/`}>GO BACK TO WELCOME PAGE</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            )
        }
        return <div>Oh noose! Something went wrong!!!</div>
    }
}

export default EmailConfirmationPage
