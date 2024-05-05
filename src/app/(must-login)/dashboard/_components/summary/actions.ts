"use server"

import db from "@/lib/db"
import { CreditorType } from "@/types"

export async function getEachClaimTypeDetail() {
    const res: {
        sifatTagihan: string
        creditorCount: string
        totalClaimAmount: string
    }[] = await db.$queryRaw`
    SELECT
        "sifatTagihan",
        COUNT(*)::text AS "creditorCount",
        SUM(CAST("totalTagihan" AS DECIMAL))::text AS "totalClaimAmount"
    FROM creditors
    GROUP BY "sifatTagihan";
    `
    return res
}

export async function getEachCreditorTypeCount() {
    const res: { jenis: CreditorType; count: string }[] = await db.$queryRaw`
        SELECT jenis, COUNT(*)::text AS count
        FROM creditors
        WHERE jenis IN (${CreditorType.Pribadi}, ${CreditorType.Instansi})
        GROUP BY jenis;
    `
    return res
}

export type DoughnutChartData = {
    claimType: "SEPARATIS" | "PREFEREN" | "KONKUREN" | "TOTAL"
    totalClaim: string
}[]

export async function getDoughnutChartData() {
    const res: DoughnutChartData = await db.$queryRaw`
        SELECT 
            "sifatTagihan" AS "claimType",
            SUM(CAST("totalTagihan" AS DECIMAL)) AS "totalClaim"
        FROM creditors 
        GROUP BY "sifatTagihan"
        UNION ALL 
        SELECT 
            'TOTAL' AS "sifatTagihan",
            SUM(CAST("totalTagihan" AS DECIMAL)) AS "totalClaim"
        FROM creditors;
    `

    return {
        totalCreditorsClaim: res.find((el) => el.claimType === "TOTAL")!
            .totalClaim,
        groupedData: res
            .filter((el) => el.claimType !== "TOTAL")
            .map((el) => Number(el.totalClaim)),
        labels: res
            .filter((el) => el.claimType !== "TOTAL")
            .map((el) => el.claimType),
    }
}
