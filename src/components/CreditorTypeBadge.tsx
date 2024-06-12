import React from "react"
import SimplePopover from "./SimplePopover"
import { Building2, UserRound } from "lucide-react"
import { CreditorType } from "@/types"
import { capitalizeFirstLetter, cn } from "@/lib/utils"

type ClaimTypeBadgeProps = {
    jenisKreditor: string
    className?: string
    size?: number
}

function CreditorTypeBadge({
    jenisKreditor,
    className,
    size = 16,
}: ClaimTypeBadgeProps) {
    return (
        <SimplePopover
            className={cn("rounded-full p-1", className)}
            tip={capitalizeFirstLetter(jenisKreditor)}
        >
            {jenisKreditor === CreditorType.Instansi && (
                <Building2 size={size} className="shrink-0" />
            )}
            {jenisKreditor === CreditorType.Pribadi && (
                <UserRound size={size} className="shrink-0" />
            )}
        </SimplePopover>
    )
}

export default CreditorTypeBadge
