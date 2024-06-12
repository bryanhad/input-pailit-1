import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { LogOut, Settings } from "lucide-react"
// import { SaleNotifications } from "./NotificationPopover"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SidebarLink from "./SidebarLink"
import { SidebarLinks, SidebarSellerInfo } from "./Sidebar"

function MobileMenu() {
    return (
        <Sheet>
            <SheetTrigger className="px-3 lg:hidden">
                <Avatar className="size-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </SheetTrigger>
            <SheetContent  className="flex flex-col gap-4 p-0">
                <SidebarSellerInfo className="max-w-[85%] gap-3 p-6" />
                <Separator className="w-[80%] self-center" />
                <SidebarLinks />
                <Separator className="w-[80%] self-center" />
                {/* <SaleNotifications />
                <Separator className="w-[80%] self-center" /> */}
                <SidebarLink href={"/seller/settings"} icon={<Settings />}>
                    User Settings
                </SidebarLink>
                <Button
                    asChild
                    variant={"ghost"}
                    className="flex items-center justify-start"
                >
                    <p>
                        <LogOut className="mr-2 shrink-0" />
                        Logout
                    </p>
                </Button>
            </SheetContent>
        </Sheet>
    )
}

export default MobileMenu
