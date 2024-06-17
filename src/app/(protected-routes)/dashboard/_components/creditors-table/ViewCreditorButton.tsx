import { Button, ButtonProps } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"
import React from "react"

type ViewCreditorsButtonProps = {
    creditorSlug: string
    small?: boolean
    variant?: ButtonProps['variant']
}

function ViewCreditorButton({
    creditorSlug,
    small = false,
    variant
}: ViewCreditorsButtonProps) {
    return (
        <Button asChild variant={variant}>
            <Link href={`/creditors/${creditorSlug}`}>
                {small ? <Eye className="shrink-0" size={16}/> : "View"}
            </Link> 
        </Button>
    )
}

export default ViewCreditorButton
