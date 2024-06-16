import { consumeToken, mustNotLogin } from '@/auth/actions'
import { ErrorTypeExtended, InvalidTokenError, LoginError } from '@/auth/errors'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { PartyPopper, Frown, ServerCrash } from 'lucide-react'
import SimplePageContent from '@/components/SimplePageContent'

async function EmailConfirmationPage({
    params,
}: {
    params: { token?: string[] }
}) {
    await mustNotLogin()

    const token = params.token ? params.token[0] : undefined
    if (!token) {
        redirect('/')
    }

    try {
        const res = await consumeToken(token)
        // const res = {
        //     email: 'bananabang@gmail.com',
        //     expires: 'fucking 4 weeks max',
        //     userId: '1123454657687',
        // }
        return (
            <SimplePageContent
                icon={
                    <PartyPopper className="shrink-0 text-black max-lg:absolute max-lg:top-0 max-lg:-translate-y-[86%] z-20 right-1/2 max-lg:translate-x-[70%] size-[150px] lg:size-[200px]" />
                }
                template={{
                    title: {
                        firstLine: 'Hooray!',
                        secondLine: 'Your Email has been verified',
                    },
                    desc: {
                        firstLine: `You're almost there!`,
                        secondLine: 'There is one thing left to do:',
                    },
                    navigateButton: (
                        <Button asChild className="select-none">
                            <Link href={`/auth/on-boarding/${res.userId}`}>
                                COMPLETE ACCOUNT SET UP
                            </Link>
                        </Button>
                    ),
                }}
            />
        )
    } catch (err) {
        if (err instanceof LoginError) {
            switch (err.type as ErrorTypeExtended) {
                case 'IncompleteAccountSetup':
                    return redirect(`/auth/on-boarding/${err.message}`)
            }
            return (
                <SimplePageContent
                    icon={
                        <Frown className="shrink-0 text-black max-lg:absolute max-lg:top-0 max-lg:-translate-y-[86%] z-20 right-1/2 max-lg:translate-x-[50%] size-[150px] lg:size-[200px]" />
                    }
                    template={{
                        title: {
                            firstLine: 'Oh Noose!',
                            secondLine: `You have ${
                                err.title
                                    ? err.title.toLowerCase()
                                    : 'an unexpected error'
                            }`,
                        },
                        desc: {
                            firstLine: err.message,
                        },
                        navigateButton: (
                            <Button asChild className="select-none">
                                <Link href={`/`}>GO BACK TO WELCOME PAGE</Link>
                            </Button>
                        ),
                    }}
                />
            )
        }
        return (
            <SimplePageContent
                icon={
                    <ServerCrash className="shrink-0 text-black max-lg:absolute max-lg:top-0 max-lg:-translate-y-[86%] z-20 right-1/2 max-lg:translate-x-[50%] size-[150px] lg:size-[200px]" />
                }
                template={{
                    title: {
                        firstLine: 'Oh Noose!',
                        secondLine: `Something went wrong`,
                    },
                    desc: {
                        firstLine: 'You have encountered unexpected error.',
                    },
                    navigateButton: (
                        <Button asChild className="select-none">
                            <Link href={`/`}>GO BACK TO WELCOME PAGE</Link>
                        </Button>
                    ),
                }}
            />
        )
    }
}

export default EmailConfirmationPage
