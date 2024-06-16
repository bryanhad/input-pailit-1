"use client"

import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import React from "react"
import { cn } from "@/lib/utils"
import { UserFilterValues } from "./validations"

type Props = {
    filterValues: UserFilterValues
    className?:string
}

function ClearUserFilterButton({ filterValues, className }: Props) {
    const searchParams = useSearchParams()
    const router = useRouter()

    const isFilterNotUsed =
        !filterValues.uq && !filterValues.urole

    function onClick() {
        const currentPageParams = new URLSearchParams(searchParams.toString())
        if (searchParams.get("uq")) {
            currentPageParams.delete("uq")
        }
        if (searchParams.get("urole")) {
            currentPageParams.delete("urole")
        }

        router.push(`/dashboard?${currentPageParams.toString()}`, {
            scroll: false,
        })
    }

    return (
        <Button
            variant={"outline"}
            className={cn({
                "cursor-not-allowed select-none": isFilterNotUsed,
            }, className)}
            onClick={onClick}
            disabled={isFilterNotUsed}
        >
            Clear Filter
        </Button>
    )
}

export default ClearUserFilterButton
