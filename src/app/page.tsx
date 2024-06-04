import NewUserForm from '@/components/auth/AddNewUserForm'
import SignInButton from '@/components/auth/SignInButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import BankruptcyVerdict from './_components/BankruptcyVerdict'
import RootPageTitle from './_components/RootPageTitle'
import Image from 'next/image'

export default function Home() {
    return (
        <div className="flex flex-col items-center">
            {/* <Button asChild>
                <Link href="/dashboard">GO TO DASHBOARD</Link>
            </Button>
            <SignInButton/> */}
            <Image
                alt="company logo"
                src={'/company-logo.webp'}
                width={100}
                height={100}
            />
            <RootPageTitle />
            <div className="">
                <BankruptcyVerdict verdictNumber="47/Pdt.Sus/Pailit/2015/PN.NIAGA.JKT.PST" />
            </div>
            {/* <NewUserForm/> */}
        </div>
    )
}
