import SignInButton from '@/components/auth/SignInButton'
import Link from 'next/link'

function Navbar() {
    return (
        <header className='shadow-md px-4 w-full bg-white'>
            <nav className='mx-auto w-full max-w-[1400px] py-4 flex justify-between'>
                <Link href={'/dashboard'} className='text-2xl'>PT Pailit (dalam Pailit)</Link>
                <SignInButton/>
            </nav>
        </header>
    )
}

export default Navbar
