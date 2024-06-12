import SignInButton from "@/auth/components/sign-in-button"
import SignOutButton from "@/auth/components/sign-out-button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import MobileMenu from "./MobileMenu"
import UserPopover from "./UserPopOver"
import { auth } from "@/auth"

async function NewNavbar() {
    const session = await auth()

    return (
        <header className="h-16 border-b bg-white">
            <nav className="flex h-full justify-between px-4 sm:px-6 md:px-10">
                <Link href={"/dashboard"} className="flex items-center">
                    <h1 className="relative text-xl font-bold sm:text-2xl md:text-3xl">
                        PT. Bakso Jaya Mantab
                        <span className="absolute bottom-[2px] right-0 translate-x-[110%] text-sm font-light text-black sm:text-lg md:text-xl">
                            (dalam pailit)
                        </span>
                    </h1>
                </Link>
                {/* <p className="self-center">{JSON.stringify(session)}</p> */}
                <div className="hidden gap-5 lg:flex">
                    {/* <NotificationPopover /> */}
                    {session ? (
                        <UserPopover user={session.user} />
                    ) : (
                        <SignInButton className="self-center" />
                    )}
                    {/* TODO: REMOVE COMMENT */}
                    {/* <Separator
                        orientation="vertical"
                        className="h-[70%] self-center"
                    /> */}
                </div>
                <MobileMenu />
            </nav>
        </header>
    )
}

export default NewNavbar
