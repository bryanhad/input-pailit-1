import H2 from "@/components/ui/h2"
import React from "react"
import CreditorCard, { CreditorCardProps } from "./CreditorCard"
import TableDataNotFound, {
    TableDataNotFoundProps,
} from "@/components/TableDataNotFound"
import { cn } from "@/lib/utils"

export type CreditorsInputedListProps = {
    inputedCreditors: (Omit<
        CreditorCardProps["creditor"],
        "attachment_count"
    > & {
        _count: { attachments: number }
    })[]
    isUsingFilter: TableDataNotFoundProps["hasFilters"]
}

function CreditorsInputedList({
    inputedCreditors,
    isUsingFilter,
}: CreditorsInputedListProps) {
    const inputedCreditorsModified = inputedCreditors.map((cred) => {
        return {
            ...cred,
            attachment_count: cred._count.attachments,
        }
    })

    return (
        <div className={cn("grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4", {
            "flex justify-center" : inputedCreditorsModified.length < 1
        })}>
            {inputedCreditorsModified.length < 1 ? (
                <TableDataNotFound
                    colSpan={7}
                    hasFilters={isUsingFilter}
                    tableName="creditor"
                    notForTable
                    simpleMessage="This user hasn't inputted any creditors."
                />
            ) : (
                inputedCreditorsModified.map((creditor) => (
                    <CreditorCard key={creditor.id} creditor={creditor} />
                ))
            )}
        </div>
    )
}

export default CreditorsInputedList
