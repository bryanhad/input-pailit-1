import Image from 'next/image'
import BankruptcyVerdict from './_components/BankruptcyVerdict'
import RootPageTitle from './_components/RootPageTitle'
import SignInButton from '@/auth/components/sign-in-button'
import { auth } from '@/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function Home() {
    const session = await auth()

    return (
        <div className=" pt-[2vh] lg:pt-[5vh] xl:pt-[8vh] lg:flex lg:justify-center fade-in duration-500">
            <div className="flex flex-col lg:flex-row max-lg:items-center gap-4">
                <div className="flex flex-col items-center gap-2 lg:items-end">
                    <Image
                        className="rounded-md "
                        alt="company logo"
                        src={'/company-logo.webp'}
                        width={300}
                        height={300}
                    />
                    <RootPageTitle />
                </div>
                <div className="w-full max-w-[95%] rounded-lg shadow-sm border p-6 bg-white lg:max-w-[400px] flex flex-col justify-between">
                    <BankruptcyVerdict verdictNumber="47 / Pdt.Sus / Pailit / 2015 / PN.NIAGA.JKT.PST" />
                    {session?.user && (
                        <Button asChild>
                            <Link href={'/dashboard'}>Go To Dashboard</Link>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}
