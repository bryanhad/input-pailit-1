import { auth } from "@/auth"
import SignInButton from "@/auth/components/sign-in-button"
import Link from "next/link"
import MobileMenu from "./MobileMenu"
import UserPopover from "./UserPopOver"

async function NewNavbar() {
    const session = await auth()

    return (
        <header className="h-16 shadow-sm border-b bg-white fixed w-full z-[100]">
            <nav className="flex w-full max-w-[1400px] mx-auto h-full justify-between px-4 sm:px-6 md:px-10">
                <Link
                    href={session ? "/dashboard" : "/"}
                    className="flex items-center"
                >
                    <h1 className="relative font-bold sm:text-lg md:text-xl">
                        PT. Bakso Jaya Mantab
                        <span className="absolute bottom-[2px] right-0 translate-x-[110%] text-sm font-light text-black sm:text-sm md:text-base">
                            (dalam pailit)
                        </span>
                    </h1>
                </Link>
                <div className="hidden gap-5 lg:flex">
                    {session ? (
                        <UserPopover user={session.user} />
                    ) : (
                        <SignInButton className="self-center" />
                    )}
                </div>
                <MobileMenu user={session?.user} />
            </nav>
        </header>
    )
}

export default NewNavbar
