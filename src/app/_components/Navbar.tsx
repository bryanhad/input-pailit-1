import Link from 'next/link'

function Navbar() {
    return (
        <header className='shadow-md px-4 w-full bg-white'>
            <nav className='mx-auto w-full max-w-[1400px] py-4'>
                <Link href={'/dashboard'} className='text-2xl'>PT Pailit (dalam Pailit)</Link>
            </nav>
        </header>
    )
}

export default Navbar
