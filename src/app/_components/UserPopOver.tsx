import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getNameInitial } from "@/lib/utils"
import { User } from "@prisma/client"
import { Bolt, CircleUserRound, LogOut, Settings } from "lucide-react"
import Link from "next/link"
import NavItemDropdown from "./NavItemDropdown"
import SignOutButton from "@/auth/components/sign-out-button"

type UserPopOverProps = {
    user: Pick<User, "name" | "image" | "role">
}

function UserPopover({ user }: UserPopOverProps) {
    return (
        <NavItemDropdown
            className="right-0 translate-x-0"
            buttonTrigger={
                <Button variant={"ghost"}>
                    <div className="flex max-w-40 items-center">
                        <Avatar className="mr-2 size-7">
                            <AvatarImage src={user.image || ""} />
                            <AvatarFallback className="capitalize">
                                {getNameInitial(user.name || "no name")}
                            </AvatarFallback>
                        </Avatar>
                        <p className="max-w-max truncate">{user.name}</p>
                    </div>
                </Button>
            }
        >
            <div className="flex flex-col gap-2 ">
                <UserInfo user={user} />
                {/* TODO: REMOVE COMMENT */}
                {/* <Separator />
                <Button asChild variant={"ghost"} className="justify-start">
                    <Link href={"/"} className="font-light">
                        Kembali ke Borongyuk
                    </Link>
                </Button> */}
                <Separator />
                <div className="flex flex-col gap-2">
                    <Button asChild variant={"ghost"} className="justify-start">
                        <Link
                            href={"/users/me"}
                            className="flex items-center font-light"
                        >
                            <Settings size={12} className="mr-2 shrink-0" />
                            User Settings
                        </Link>
                    </Button>
                    <SignOutButton className="justify-start"/>
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

function UserInfo({ user }: UserPopOverProps) {
    return (
        <div className="flex items-center justify-between gap-4 p-2">
            <div className="max-w-[70%] space-y-2">
                <p className="max-w-max truncate font-bold">{user.name}</p>
                <div className="flex items-center">
                    {user.role === "ADMIN" ? (
                        <Bolt
                            size={20}
                            className="mr-2 shrink-0 text-muted-foreground"
                        />
                    ) : (
                        <CircleUserRound
                            size={20}
                            className="mr-2 shrink-0 text-muted-foreground"
                        />
                    )}
                    <p className="max-w-max truncate text-sm tracking-tight">
                        {user.role}
                    </p>
                </div>
            </div>
            <Avatar>
                <AvatarImage src={user.image || ""} />
                <AvatarFallback className="capitalize">
                    {getNameInitial(user.name || "no name")}
                </AvatarFallback>
            </Avatar>
        </div>
    )
}
