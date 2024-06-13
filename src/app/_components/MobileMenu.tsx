import SignInButton from "@/auth/components/sign-in-button"
import SignOutButton from "@/auth/components/sign-out-button"
import { Separator } from "@/components/ui/separator"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { User } from "@prisma/client"
import { Settings } from "lucide-react"
import { SidebarLinks } from "./Sidebar"
import SidebarLink from "./SidebarLink"
import { UserInfo } from "./UserPopOver"

type MobileMenuProps = {
    user?: Pick<User, "name" | "image" | "role">
}

function MobileMenu({ user }: MobileMenuProps) {
    if (!user) {
        return <SignInButton className="self-center bg-green-300 lg:hidden" />
    }

    return (
        <Sheet>
            <SheetTrigger className="px-3 lg:hidden">
                <UserInfo user={user} mode="ICON" />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4 p-0">
                <UserInfo
                    user={user}
                    className="ml-4 mt-6 flex-row-reverse justify-end"
                    mode="WITH_ROLE"
                />
                <Separator className="w-[80%] self-center" />
                <SidebarLinks />
                <Separator className="w-[80%] self-center" />
                <SidebarLink href={"/seller/settings"} icon={<Settings />}>
                    User Settings
                </SidebarLink>
                <Separator className="w-[80%] self-center" />
                <SignOutButton className="justify-start self-start ml-4" />
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu
