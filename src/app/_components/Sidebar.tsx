import { cn } from "@/lib/utils"
import { ClipboardList, Home } from "lucide-react"
import SidebarLink from "./SidebarLink"

export function SidebarLinks({ className }: { className?: string }) {
    return (
        <div className={cn("overflow-hidden", className)}>
            <SidebarLink icon={<Home />} href={"/dashboard"}>
                Home
            </SidebarLink>
            <SidebarLink icon={<ClipboardList />} href={"/seller/orders"}>
                Users
            </SidebarLink>
        </div>
    )
}