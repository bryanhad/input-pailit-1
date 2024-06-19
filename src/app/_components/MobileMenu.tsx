import SignInButton from '@/auth/components/sign-in-button'
import SignOutButton from '@/auth/components/sign-out-button'
import { Separator } from '@/components/ui/separator'
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet'
import { User } from '@prisma/client'
import { Home, LayoutDashboard, Settings } from 'lucide-react'
import { SidebarLinks } from './Sidebar'
import SidebarLink from './SidebarLink'
import { UserInfo } from './UserPopOver'

type MobileMenuProps = {
    user?: Pick<User, 'name' | 'image' | 'role'>
}

function MobileMenu({ user }: MobileMenuProps) {
    if (!user) {
        return <SignInButton className="self-center  lg:hidden" />
    }

    return (
        <Sheet>
            <SheetTrigger className="lg:hidden">
                <UserInfo user={user} mode="ICON" className='m-0' />
            </SheetTrigger>
            <SheetContent className="flex flex-col gap-4 p-0 overflow-hidden">
                <UserInfo
                    user={user}
                    className="ml-4 mt-6 flex-row-reverse justify-end"
                    mode="WITH_ROLE"
                />
                <Separator className="w-[80%] self-center" />
                <SheetTrigger asChild>
                    <SidebarLink icon={<LayoutDashboard />} href={'/dashboard'}>
                        Dashboard
                    </SidebarLink>
                </SheetTrigger>
                <Separator className="w-[80%] self-center" />
                <SheetTrigger asChild>
                    <SidebarLink href={'/users/me'} icon={<Settings />}>
                        User Settings
                    </SidebarLink>
                </SheetTrigger>
                <Separator className="w-[80%] self-center" />
                <SignOutButton className="justify-start self-start ml-4" />
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu
