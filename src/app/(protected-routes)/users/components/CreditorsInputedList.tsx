import H2 from "@/components/ui/h2"
import React from "react"
import CreditorCard, { CreditorCardProps } from "./CreditorCard"

export type CreditorsInputedListProps = {
    inputedCreditors: (Omit<
        CreditorCardProps["creditor"],
        "attachment_count"
    > & {
        _count: { attachments: number }
    })[]
}

function CreditorsInputedList({ inputedCreditors }: CreditorsInputedListProps) {
    const inputedCreditorsModified = inputedCreditors.map((cred) => {
        return {
            ...cred,
            attachment_count: cred._count.attachments,
        }
    })

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {inputedCreditorsModified.map((creditor) => (
                <CreditorCard key={creditor.id} creditor={creditor} />
            ))}
        </div>
    )
}

export default CreditorsInputedList
