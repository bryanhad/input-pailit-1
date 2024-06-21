import CreditorTypeBadge from '@/components/CreditorTypeBadge'
import { cn, formatCurrency } from '@/lib/utils'
import { CreditorType } from '@/types'
import React from 'react'
import { CreditorTypesInfo } from './actions'

type CreditorTypeCardsProps = {
    data: {
        creditorTypesInfo: CreditorTypesInfo
        totalCountAllCreditor: number
        totalClaimAllCreditor: number
    }
    className?: string
}

function CreditorTypeCards({ data, className }: CreditorTypeCardsProps) {
    return (
        <>
            <CreditorTypeSummary
                creditorType={CreditorType.Instansi}
                data={data}
                className="flex-[1]"
            />
            <CreditorTypeSummary
                creditorType={CreditorType.Pribadi}
                data={data}
                className="flex-[1]"
            />
        </>
    )
}

export default CreditorTypeCards

type CreditorTypeSummaryProps = {
    creditorType: CreditorType
    data: CreditorTypeCardsProps['data']
    className?: string
}

function CreditorTypeSummary({
    creditorType,
    data,
    className,
}: CreditorTypeSummaryProps) {
    const claimPercentage = (
        (data.creditorTypesInfo[creditorType].totalClaimAmount /
            data.totalClaimAllCreditor) *
        100
    ).toFixed(2)

    return (
        <div
            className={cn(
                'flex flex-col items-start gap-2 p-2 border border-input/40 rounded-md bg-white',
                className
            )}
        >
            <div className="flex justify-between w-full pr-2 items-end">
                <div className="flex gap-2 items-center">
                    {creditorType === CreditorType.Instansi ? (
                        <CreditorTypeBadge
                            jenisKreditor={CreditorType.Instansi}
                            className=" text-purple-400"
                        />
                    ) : (
                        <CreditorTypeBadge
                            jenisKreditor={CreditorType.Pribadi}
                            className=" text-orange-400"
                        />
                    )}
                    <p>
                        {creditorType === CreditorType.Instansi
                            ? 'Instansi / Perusahaan'
                            : 'Pribadi'}
                    </p>
                </div>

                <p className="text-sm font-light">{`${data.creditorTypesInfo[creditorType].creditorsCount} Creditors`}</p>
            </div>
            <div className="flex gap-4 items-end w-full">
                <p className="text-2xl md:text-xl lg:text-2xl">
                    {formatCurrency(
                        data.creditorTypesInfo[creditorType].totalClaimAmount,
                        'IDR'
                    )}
                </p>
                <p className="text-xl text-green-400 font-semibold">{`${claimPercentage}%`}</p>
            </div>
        </div>
    )
}
