"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link, { LinkProps } from "next/link"
import { usePathname } from "next/navigation"
import React from "react"

type SidebarLinkProps = {
    children: React.ReactNode
    icon: React.ReactNode
} & LinkProps

function SidebarLink({ children, icon, href, ...props }: SidebarLinkProps) {
    const pathname = usePathname()
    return (
        <div className="relative flex flex-col">
            <Button
                asChild
                variant={"ghost"}
                className=" flex items-center justify-start gap-2 rounded-none"
            >
                <Link
                    href={href}
                    {...props}
                    className={cn({
                        "text-green-500 hover:text-green-500":
                            href === pathname,
                    })}
                >
                    {icon}
                    <div>{children}</div>
                </Link>
            </Button>
            {href === pathname && (
                <div className="absolute left-0 z-10 h-full w-2 translate-x-[-50%] rounded-full bg-emerald-500" />
            )}
        </div>
    )
}

export default SidebarLink
