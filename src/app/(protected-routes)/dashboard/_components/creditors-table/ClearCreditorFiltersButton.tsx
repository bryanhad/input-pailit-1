"use client"

import { Button } from "@/components/ui/button"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React from "react"
import { CreditorFilterValues } from "./validations"
import { cn } from "@/lib/utils"

type Props = {
    filterValues: CreditorFilterValues
}

function ClearCreditorFiltersButton({ filterValues }: Props) {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const router = useRouter()

    const isFilterNotUsed =
        !filterValues.claimType && !filterValues.creditorType && !filterValues.q && !filterValues.createdBy

    function onClick() {
        const currentPageParams = new URLSearchParams(searchParams.toString())
        if (searchParams.get("q")) {
            currentPageParams.delete("q")
        }
        if (searchParams.get("creditorType")) {
            currentPageParams.delete("creditorType")
        }
        if (searchParams.get("claimType")) {
            currentPageParams.delete("claimType")
        }
        if (searchParams.get("createdBy")) {
            currentPageParams.delete("createdBy")
        }

        router.push(`${pathname}?${currentPageParams.toString()}`, {
            scroll: false,
        })
    }

    return (
        <Button
            variant={"outline"}
            className={cn({
                "cursor-not-allowed select-none": isFilterNotUsed,
            })}
            onClick={onClick}
            disabled={isFilterNotUsed}
        >
            Clear Filter
        </Button>
    )
}

export default ClearCreditorFiltersButton
