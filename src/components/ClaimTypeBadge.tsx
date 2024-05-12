import { cn } from "@/lib/utils"
import { ClaimType } from "@/types"
import React from "react"

type ClaimTypeBadgeProps = {
    sifatTagihan: string
    className?: string
}

function ClaimTypeBadge({ className, sifatTagihan }: ClaimTypeBadgeProps) {
    return (
        <div
            className={cn(
                {
                    "bg-separatis text-white":
                        sifatTagihan === ClaimType.Separatis,
                    "bg-konkuren text-white":
                        sifatTagihan === ClaimType.Konkuren,
                    "bg-preferen text-white":
                        sifatTagihan === ClaimType.Preferen,
                },
                "py-[2px] px-3 text-sm rounded-md flex items-center",
                className
            )}
        >
            <p>
            {sifatTagihan}

            </p>
        </div>
    )
}

export default ClaimTypeBadge
