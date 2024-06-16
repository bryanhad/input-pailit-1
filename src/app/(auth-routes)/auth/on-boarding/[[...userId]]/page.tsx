import { mustNotLogin } from '@/auth/actions'
import MainWrapper from '@/components/ui/main-wrapper'
import db from '@/lib/db'
import { redirect } from 'next/navigation'
import OnBoardingForm from './OnBoardingForm'
import { UserStatus } from '@/types'
import SimplePageContent from '@/components/SimplePageContent'
import { CircleX, Smile } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import H1 from '@/components/ui/h1'
import H2 from '@/components/ui/h2'

async function OnBoardingPage({ params }: { params: { userId?: string[] } }) {
    await mustNotLogin()

    // 1. secure the userId from url params
    const userId = params.userId ? params.userId[0] : undefined
    if (!userId) {
        redirect('/')
    }
    // 2. get user from userId and verify it
    const user = await db.user.findUnique({ where: { id: userId } })
    if (!user) {
        return (
            <SimplePageContent
                icon={
                    <CircleX className="shrink-0 text-black max-lg:absolute max-lg:top-0 max-lg:-translate-y-[86%] z-20 right-1/2 max-lg:translate-x-[50%] size-[150px] lg:size-[200px]" />
                }
                template={{
                    title: {
                        firstLine: 'Oh Noose!',
                        secondLine: `Invalid token.`,
                    },
                    desc: {
                        firstLine: 'The given token is unusable',
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
    // 3. kick the user if they've already filled in their name and password
    if (user.status === UserStatus.active) {
        redirect('/')
    }

    return (
        <div>
            <SimplePageContent
                icon={
                    <Smile className="shrink-0 text-black max-lg:absolute max-lg:top-0 max-lg:-translate-y-[86%] z-20 right-1/2 max-lg:translate-x-[50%] size-[150px] lg:size-[200px]" />
                }
                className='sm:max-lg:mt-[20vh] lg:mt-[10vh]'
            >
                <H1>Wellcome new comer!</H1>
                <H2 className='max-w-[85%] max-lg:mx-auto'>Complete your account set up to sign in</H2>
                <OnBoardingForm userId={userId} />
            </SimplePageContent>
        </div>
    )
}

export default OnBoardingPage
