import { auth } from "@/auth"
import SignInButton from "@/auth/components/sign-in-button"
import Link from "next/link"

async function Navbar() {
    const session = await auth()
    return (
        <header className="shadow-md px-4 w-full bg-white">
            <nav className="mx-auto w-full max-w-[1400px] py-4 flex justify-between">
                <Link href={"/dashboard"} className="text-2xl">
                    PT Pailit (dalam Pailit)
                </Link>
                {JSON.stringify(session)}
                {!session?.user ? (
                    <>
                    {/* <SignOutButton>
                        <SignOutForm />
                    </SignOutButton> */}
                    {/* <UserPopover/> */}
                    </>
                ) : (
                    <SignInButton />
                )}
            </nav>
        </header>
    )
}

export default Navbar
