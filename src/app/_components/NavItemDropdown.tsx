import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import * as React from "react"

type NavItemDropdownProps = {
    children: React.ReactNode
    className?: string
    buttonTrigger: React.ReactNode
    buttonTriggerClassName?: string
}

const NavItemDropdown = React.forwardRef<HTMLElement, NavItemDropdownProps>(
    ({ className, children, buttonTrigger, buttonTriggerClassName }, ref) => (
        <figure
            ref={ref}
            className={cn(
                "group/navbarDropdownParent relative flex cursor-pointer items-center",
                buttonTriggerClassName,
            )}
        >
            {buttonTrigger}
            <div
                className={cn(
                    "absolute bottom-[1px] right-[50%] z-[120] max-h-0 w-72 translate-x-[50%] translate-y-full overflow-hidden rounded-b-md bg-white shadow-md duration-300 group-hover/navbarDropdownParent:max-h-[400px]",
                    className,
                )}
            >
                <Separator />
                <div className="p-4">{children}</div>
            </div>
        </figure>
    ),
)
NavItemDropdown.displayName = "NavItemDropdown"

export default NavItemDropdown
