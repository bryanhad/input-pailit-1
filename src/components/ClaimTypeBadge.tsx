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
                    "bg-separatis/20 border border-separatis text-separatis":
                        sifatTagihan === ClaimType.Separatis,
                    "bg-konkuren/20 border border-konkuren text-konkuren":
                        sifatTagihan === ClaimType.Konkuren,
                    "bg-preferen/20 border border-preferen text-preferen":
                        sifatTagihan === ClaimType.Preferen,
                },
                "py-[2px] px-3 text-sm font-semibold rounded-full flex items-center",
                className
            )}
        >
            <p>{sifatTagihan}</p>
        </div>
    )
}

export default ClaimTypeBadge
