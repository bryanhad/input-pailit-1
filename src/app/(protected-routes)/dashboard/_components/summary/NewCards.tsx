import ClaimTypeBadge from "@/components/ClaimTypeBadge"
import {
    cn,
    formatCurrency
} from "@/lib/utils"
import { ClaimType } from "@/types"
import { ClaimTypeInfo } from "./actions"

type NewCardsProps = {
    claimTypeInfoArr: ClaimTypeInfo[]
    totalClaimAllCreditors: number
}

async function NewCards({
    claimTypeInfoArr,
    totalClaimAllCreditors,
}: NewCardsProps) {
    const preferenDetail = claimTypeInfoArr.find(
        (el) => el.claimType === ClaimType.Preferen
    )
    const konkurenDetail = claimTypeInfoArr.find(
        (el) => el.claimType === ClaimType.Konkuren
    )
    const separatisDetail = claimTypeInfoArr.find(
        (el) => el.claimType === ClaimType.Separatis
    )

    return (
        <>
            <SummaryCard
                className={`shadow-sm`}
                claimType={ClaimType.Preferen}
                totalClaimOfAType={preferenDetail?.totalClaimAmount || 0}
                totalClaimOfAllCreditors={totalClaimAllCreditors}
                creditorCount={preferenDetail?.creditorCount || 0}
                content={formatCurrency(
                    Number(preferenDetail?.totalClaimAmount),
                    "IDR"
                )}
            />
            <SummaryCard
                className={`shadow-sm`}
                claimType={ClaimType.Konkuren}
                totalClaimOfAType={konkurenDetail?.totalClaimAmount || 0}
                totalClaimOfAllCreditors={totalClaimAllCreditors}
                creditorCount={konkurenDetail?.creditorCount || 0}
                content={formatCurrency(
                    Number(konkurenDetail?.totalClaimAmount),
                    "IDR"
                )}
            />
            <SummaryCard
                className={`shadow-sm sm:col-span-2 md:col-span-1`}
                claimType={ClaimType.Separatis}
                totalClaimOfAType={separatisDetail?.totalClaimAmount || 0}
                totalClaimOfAllCreditors={totalClaimAllCreditors}
                creditorCount={separatisDetail?.creditorCount || 0}
                content={formatCurrency(
                    Number(separatisDetail?.totalClaimAmount),
                    "IDR"
                )}
            />
        </>
    )
}

export default NewCards

type SummaryCardProps = {
    claimType: string
    content: string
    totalClaimOfAType: number
    totalClaimOfAllCreditors: number
    creditorCount: number
    className?: string
}

function SummaryCard({
    claimType,
    creditorCount,
    className,
    totalClaimOfAType,
    totalClaimOfAllCreditors,
}: SummaryCardProps) {
    const percentage = (
        (totalClaimOfAType / totalClaimOfAllCreditors) *
        100
    ).toFixed(2)
    return (
        <div
            className={cn(
                "text-black flex gap-2 flex-1 p-4 rounded-md shadow-sm", 
                {
                    "bg-separatis" : claimType === ClaimType.Separatis
                },
                className
            )}
        >
            <div className="flex flex-col gap-2">
                <ClaimTypeBadge
                    className="text-base gap-2"
                    sifatTagihan={claimType}
                />
                <p className="text-2xl font-semibold md:text-xl lg:text-2xl">
                    {formatCurrency(totalClaimOfAType, "IDR")}
                </p>
            </div>
            <div className="flex justify-between items-end gap-4">
                <p className="font-light text-xl">{`${percentage}%`}</p>
            </div>
        </div>
    )
}
