'use client'

import { useState } from "react"
import Cards from "./Cards"
import DoughnutChart from "./DoughnutChart"
import HorizontalBarChart from "./HorizontalBarChart"
import TotalCount from "./TotalCount"
import { ClaimTypeInfo, CreditorTypeInfo } from "./actions"
import NewDoughnutChart from "./NewDoughnutChart"
import { ClaimType } from "@/types"

type NewSummariesProps = {
    totalCountAllCreditor: number
    totalClaimAllCreditor: number
    claimTypeInfoArr: ClaimTypeInfo[]
    creditorTypeInfoArr: CreditorTypeInfo[]
}

export enum ExtendClaimType {
    All = "ALL"
}

export type SelectedSummaryClaimType = ClaimType | ExtendClaimType

function NewSummaries({
    claimTypeInfoArr,
    creditorTypeInfoArr,
    totalClaimAllCreditor,
    totalCountAllCreditor,
}: NewSummariesProps) {
    const [selectedClaimType, setSelectedClaimType] = useState<SelectedSummaryClaimType>(ExtendClaimType.All)

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex-[2] flex flex-col lg:flex-row gap-4">
                    <NewDoughnutChart
                        title="Detail Tagihan PT Pailit (dalam Pailit)"
                        data={{ totalClaimAllCreditor, claimTypeInfoArr }}
                        className="lg:flex-[1]"
                        newdoughnutChartClassName="lg:max-w-[320px] xl:max-w-[400px]"
                    />
                    <div className="flex flex-col  gap-4 flex-[1] lg:flex-[3]">
                        <div className="flex flex-col gap-4 sm:flex-row-reverse lg:flex-col-reverse xl:flex-row-reverse flex-1">
                            <HorizontalBarChart
                                title="Jumlah Kreditor (berdasarkan jenisnya)"
                                data={creditorTypeInfoArr}
                                className="flex-[1]"
                            />
                            <TotalCount
                                title="Total Kreditor"
                                totalCreditorsCount={totalCountAllCreditor}
                            />
                        </div>
                        <div className="hidden xl:flex gap-4">
                            <Cards
                                claimTypeInfoArr={claimTypeInfoArr}
                                totalClaimAllCreditors={totalClaimAllCreditor}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:hidden flex-1 gap-4">
                    <Cards
                        claimTypeInfoArr={claimTypeInfoArr}
                        totalClaimAllCreditors={totalClaimAllCreditor}
                    />
                </div>
            </div>
        </>
    )
}

export default NewSummaries
