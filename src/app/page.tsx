import NewUserForm from '@/components/auth/AddNewUserForm'
import SignInButton from '@/components/auth/SignInButton'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
    return (
        <div>
            <Button asChild>
                <Link href="/dashboard">GO TO DASHBOARD</Link>
            </Button>
            <SignInButton/>
            <NewUserForm/>
        </div>
    )
}
