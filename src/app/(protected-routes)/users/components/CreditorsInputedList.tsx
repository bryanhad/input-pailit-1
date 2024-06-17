import H2 from '@/components/ui/h2'
import React from 'react'
import CreditorCard, { CreditorCardProps } from './CreditorCard'

export type CreditorsInputedListProps = {
    inputedCreditors: (Omit<CreditorCardProps['creditor'], 'attachment_count'> & {
        _count: {attachments:number}
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
        <div className="flex flex-col gap-4 mt-2">
            <div className="space-y-2 max-md:text-center">
                <H2>Creditors Inputed</H2>
                <p className="font-light">Count: {inputedCreditors.length}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {inputedCreditorsModified.map((creditor) => (
                    <CreditorCard key={creditor.id} creditor={creditor} />
                ))}
            </div>
        </div>
    )
}

export default CreditorsInputedList
