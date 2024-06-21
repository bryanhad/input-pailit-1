'use server'

import db from '@/lib/db'
import { ClaimType, CreditorType } from '@/types'

export type CreditorTypeSummary = {
    totalClaimAmount: number
    creditorsCount: number
}

export type CreditorTypesInfo = {
    [key in CreditorType]: CreditorTypeSummary
}

export type ClaimTypeInfo = {
    claimType: string
    totalClaimAmount: number
    creditorsCount: number
}

export type SummariesData = {
    totalClaimAllCreditor: number
    totalCountAllCreditor: number
    creditorTypesInfo: CreditorTypesInfo
    claimTypeInfoArr: ClaimTypeInfo[]
}

type RawSummariesData = {
    total_claim_of_all_creditors: string
    total_count_of_all_creditors: string
    total_claim_amount_and_count_by_creditorType: CreditorTypesInfo
    total_claim_amount_and_count_by_claimType: {
        totalClaimAmount: string
        creditorsCount: string
        claimType: ClaimType
    }[]
}[]

// TODO, ask client: "should totalTagihan be able to handle decimal?"
export async function getSummariesData(): Promise<SummariesData> {
    const res: RawSummariesData = await db.$queryRaw`
        WITH total_claims AS (
            SELECT SUM(CAST("totalTagihan" AS DECIMAL)) AS total_claim_of_all_creditors
            FROM creditors
        ),
        total_count AS (
            SELECT COUNT(*) AS total_count_of_all_creditors
            FROM creditors
        ),
        claims_by_creditor_type AS (
            SELECT jenis AS creditorType,
                SUM(CAST("totalTagihan" AS DECIMAL)) AS totalClaimAmount,
                COUNT(*) AS creditorsCount
            FROM creditors
            GROUP BY jenis
        ),
        claims_by_claim_type AS (
            SELECT "sifatTagihan" AS claimType,
                SUM(CAST("totalTagihan" AS DECIMAL))::text AS totalClaimAmount,
                COUNT(*)::text AS creditorsCount
            FROM creditors
            GROUP BY "sifatTagihan"
        )
        SELECT 
            (SELECT total_claim_of_all_creditors::text FROM total_claims),
            (SELECT total_count_of_all_creditors::text FROM total_count),
            (SELECT json_object_agg(
            creditorType, 
            json_build_object(
                'totalClaimAmount', totalClaimAmount,
                'creditorsCount', creditorsCount
            )
        ) FROM claims_by_creditor_type) AS "total_claim_amount_and_count_by_creditorType",
            (SELECT json_agg(json_build_object(
                'claimType', claimType,
                'totalClaimAmount', totalClaimAmount,
                'creditorsCount', creditorsCount
            )) FROM claims_by_claim_type) AS "total_claim_amount_and_count_by_claimType";
    `
    const {
        total_count_of_all_creditors,
        total_claim_of_all_creditors,
        total_claim_amount_and_count_by_claimType,
        total_claim_amount_and_count_by_creditorType,
    } = res[0]

    return {
        totalCountAllCreditor: Number(total_count_of_all_creditors) || 0,
        totalClaimAllCreditor: Number(total_claim_of_all_creditors) || 0,
        claimTypeInfoArr: total_claim_amount_and_count_by_claimType.map(
            (el) => {
                return {
                    claimType: el.claimType,
                    creditorsCount: Number(el.creditorsCount) || 0,
                    totalClaimAmount: Number(el.totalClaimAmount) || 0,
                }
            }
        ),
        creditorTypesInfo: total_claim_amount_and_count_by_creditorType,
    }
}
