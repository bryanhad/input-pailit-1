import React from "react"
import { getEachClaimTypeDetail } from "./actions"
import { capitalizeFirstLetter, formatCurrency } from "@/lib/utils"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ClaimType } from "@/types"

async function Cards() {
    const claimDetails = await getEachClaimTypeDetail()

    const preferenDetail = claimDetails.find(el => el.sifatTagihan === ClaimType.Preferen)
    const konkurenDetail = claimDetails.find(el => el.sifatTagihan === ClaimType.Konkuren)
    const separatisDetail = claimDetails.find(el => el.sifatTagihan === ClaimType.Separatis)

    return (
        <>
                <SummaryCard
                    className={`bg-preferen/40`}
                    title={capitalizeFirstLetter(ClaimType.Preferen)}
                    content={formatCurrency(
                        Number(preferenDetail?.totalClaimAmount),
                        "IDR"
                    )}
                    footer={preferenDetail!.creditorCount}
                />
                <SummaryCard
                    className={`bg-konkuren/40`}
                    title={capitalizeFirstLetter(ClaimType.Konkuren)}
                    content={formatCurrency(
                        Number(konkurenDetail?.totalClaimAmount),
                        "IDR"
                    )}
                    footer={konkurenDetail!.creditorCount}
                />
                <SummaryCard
                    className={`bg-separatis/40`}
                    title={capitalizeFirstLetter(ClaimType.Separatis)}
                    content={formatCurrency(
                        Number(separatisDetail?.totalClaimAmount),
                        "IDR"
                    )}
                    footer={separatisDetail!.creditorCount}
                />
        </>
    )
}

export default Cards

type SummaryCardProps = {
    title: string
    content: string
    footer: string
    className?: string
}

function SummaryCard({ title, content, footer, className }: SummaryCardProps) {
    return (
        <Card className={className}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{content}</p>
            </CardContent>
            <CardFooter>
                <p className="text-muted-foreground">{footer}</p>
            </CardFooter>
        </Card>
    )
}
