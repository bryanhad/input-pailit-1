import {
    capitalizeFirstLetter,
    cn,
    formatCurrency,
    formatNumber,
} from "@/lib/utils"
import { ClaimType } from "@/types"
import { ClaimTypeInfo } from "./actions"
import ClaimTypeBadge from "@/components/ClaimTypeBadge"

type CardsProps = {
    claimTypeInfoArr: ClaimTypeInfo[]
    totalClaimAllCreditors: number
}

async function Cards({ claimTypeInfoArr, totalClaimAllCreditors }: CardsProps) {
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
                className={`shadow-sm bg-white`}
                claimType={`${capitalizeFirstLetter(ClaimType.Preferen)}`}
                totalClaimOfAType={preferenDetail?.totalClaimAmount || 0}
                totalClaimOfAllCreditors={totalClaimAllCreditors}
                creditorCount={preferenDetail?.creditorCount || 0}
                content={formatCurrency(
                    Number(preferenDetail?.totalClaimAmount),
                    "IDR"
                )}
            />
            <SummaryCard
                className={`shadow-sm bg-white`}
                claimType={`${capitalizeFirstLetter(ClaimType.Konkuren)}`}
                totalClaimOfAType={konkurenDetail?.totalClaimAmount || 0}
                totalClaimOfAllCreditors={totalClaimAllCreditors}
                creditorCount={konkurenDetail?.creditorCount || 0}
                content={formatCurrency(
                    Number(konkurenDetail?.totalClaimAmount),
                    "IDR"
                )}
            />
            <SummaryCard
                className={`shadow-sm bg-white sm:col-span-2 md:col-span-1`}
                claimType={`${capitalizeFirstLetter(ClaimType.Separatis)}`}
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

export default Cards

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
                "text-black flex flex-col gap-2 flex-1 p-4 rounded-md shadow-sm",
                className
            )}
        >
            <div className="flex items-end gap-2">
                <ClaimTypeBadge
                    className="text-base gap-2"
                    sifatTagihan={claimType.toUpperCase()}
                />
                {/* <div
                    className={cn('size-3 rounded-full self-center mt-1', {
                        'bg-separatis': claimType.toUpperCase() === ClaimType.Separatis,
                        'bg-konkuren': claimType.toUpperCase() === ClaimType.Konkuren,
                        'bg-preferen': claimType.toUpperCase() === ClaimType.Preferen,
                    })}
                />
                <p className="text-2xl font-semibold">{claimType}</p> */}
            </div>
            <div className="flex justify-between items-end gap-4">
                <p className="text-sm font-light">
                    count : {formatNumber(creditorCount)}
                </p>
                <p className="font-light text-xl">{`${percentage}%`}</p>
            </div>
            <p className="text-2xl font-semibold md:text-xl lg:text-2xl">
                {formatCurrency(totalClaimOfAType, "IDR")}
            </p>
        </div>
    )
}
