import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn, getNameInitial } from '@/lib/utils'
import { User } from '@prisma/client'
import { Bolt, CircleUserRound, LogOut, Settings } from 'lucide-react'
import Link from 'next/link'
import NavItemDropdown from './NavItemDropdown'
import SignOutButton from '@/auth/components/sign-out-button'
import UserRoleBadge from '@/components/UserRoleBadge'

type UserPopOverProps = {
    user: Pick<User, 'name' | 'image' | 'role'>
}

function UserPopover({ user }: UserPopOverProps) {
    return (
        <NavItemDropdown
            className="right-0 translate-x-0"
            buttonTrigger={
                <Button variant={'ghost'}>
                    <UserInfo user={user} />
                </Button>
            }
        >
            <div className="flex flex-col gap-2 ">
                <UserInfo user={user} mode="WITH_ROLE" />
                {/* TODO: REMOVE COMMENT */}
                {/* <Separator />
                <Button asChild variant={"ghost"} className="justify-start">
                    <Link href={"/"} className="font-light">
                        Kembali ke Borongyuk
                    </Link>
                </Button> */}
                <Separator />
                <div className="flex flex-col gap-2">
                    <Button asChild variant={'ghost'} className="justify-start">
                        <Link
                            href={'/users/me'}
                            className="flex items-center font-light"
                        >
                            <Settings size={12} className="mr-2 shrink-0" />
                            User Settings
                        </Link>
                    </Button>
                    <SignOutButton className="justify-start" />
                    {/* TODO: REMOVE COMMENT */}
                    {/* <Button asChild variant={"ghost"} className="justify-start">
                        <Link
                            href={"/"}
                            className="flex items-center font-light"
                        >
                            <LogOut size={12} className="mr-2 shrink-0" />
                            Logout
                        </Link>
                    </Button> */}
                </div>
            </div>
        </NavItemDropdown>
    )
}

export default UserPopover

export function UserInfo({
    user,
    mode = 'WITHOUT_ROLE',
    className,
    userImageClassName,
}: UserPopOverProps & {
    mode?: 'WITH_ROLE' | 'WITHOUT_ROLE' | 'ICON'
    className?: string
    userImageClassName?: string
}) {
    if (mode === 'ICON') {
        return (
            <UserImageIcon
                user={user}
                className={cn('mr-2 size-8', className, userImageClassName)}
            />
        )
    }

    if (mode === 'WITHOUT_ROLE') {
        return (
            <div className={cn('flex max-w-40 items-center', className)}>
                <UserImageIcon
                    user={user}
                    className={cn('mr-2 size-7', userImageClassName)}
                />
                <p className="max-w-max truncate">{user.name}</p>
            </div>
        )
    }

    return (
        <div
            className={cn(
                'flex items-center justify-between gap-4 p-2',
                className
            )}
        >
            <div className="max-w-[60%] space-y-2">
                <p className="max-w-max truncate font-bold">{user.name}</p>
                <div className="flex items-center">
                    <UserRoleBadge role={user.role} noClick />
                </div>
            </div>
            <UserImageIcon user={user} className={userImageClassName} />
        </div>
    )
}

export function UserImageIcon({
    user,
    className,
}: UserPopOverProps & { className?: string }) {
    return (
        <Avatar className={className}>
            <AvatarImage src={user.image || ''} />
            <AvatarFallback className="capitalize bg-slate-300/80 text-white">
                {getNameInitial(user.name || 'no name')}
            </AvatarFallback>
        </Avatar>
    )
}
