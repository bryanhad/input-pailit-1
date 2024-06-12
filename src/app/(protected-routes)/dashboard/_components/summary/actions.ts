"use server"

import db from "@/lib/db"
import { ClaimType, CreditorType } from "@/types"

export async function getEachCreditorTypeCount() {
    const res: { jenis: CreditorType; count: string }[] = await db.$queryRaw`
        SELECT jenis, CAST(COUNT(*) AS TEXT) AS count
        -- SELECT jenis, COUNT(*)::text AS count
        FROM creditors
        WHERE jenis IN (${CreditorType.Pribadi}, ${CreditorType.Instansi})
        GROUP BY jenis;
    `
    return res
}

export type EachClaimTypeTotalClaims = {
    totalClaimAmount: number
    totalCreditors: number
    claimTypes: {
        totalClaim: number
        creditorCount: number
        claimType: "SEPARATIS" | "PREFEREN" | "KONKUREN" | "TOTAL"
    }[]
}

export async function getEachClaimTypeTotalClaims() {
    const res: {
        creditorCount: string
        claimType: "SEPARATIS" | "PREFEREN" | "KONKUREN" | "TOTAL"
        totalClaim: string
    }[] = await db.$queryRaw`
        SELECT 
            "sifatTagihan" AS "claimType",
            -- COUNT(*)::text AS "creditorCount",
            CAST(COUNT(*) AS TEXT) AS "creditorCount",
            SUM(CAST("totalTagihan" AS DECIMAL)) AS "totalClaim"
        FROM creditors 
        GROUP BY "sifatTagihan"
        UNION ALL 
            SELECT 
                'TOTAL' AS "claimType",
                CAST(COUNT(*) AS TEXT) AS "creditorCount",
                -- COUNT(*)::text AS "creditorCount",
                SUM(CAST("totalTagihan" AS DECIMAL)) AS "totalClaim"
            FROM creditors;
    `

    return {
        totalClaimAmount:
            Number(res.find((el) => el.claimType === "TOTAL")!.totalClaim) || 0,
        totalCreditors:
            Number(res.find((el) => el.claimType === "TOTAL")!.creditorCount) ||
            0,
        claimTypes: res
            .filter((el) => el.claimType !== "TOTAL")
            .map((el) => ({
                ...el,
                totalClaim: Number(el.totalClaim),
                creditorCount: Number(el.creditorCount),
            })),
    }
}
