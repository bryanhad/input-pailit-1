"use server"

import db from "@/lib/db"
import { ClaimType, CreditorType } from "@/types"

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
    total_claim_amount_and_count_by_creditor_type: CreditorTypesInfo
    total_claim_amount_and_count_by_claim_type: {
        claimType: ClaimType
        totalClaimAmount: number
        creditorsCount: number
    }[]
}[]

// TODO, ask client: "should totalTagihan be able to handle decimal?"
export async function getSummariesData(): Promise<SummariesData> {
    const res: RawSummariesData = await db.$queryRaw`
       WITH total_claims AS (
            SELECT
                SUM (
                    COALESCE(c."tagihanPokok"::NUMERIC, 0) + 
                    COALESCE(c."bungaTagihan"::NUMERIC, 0) + 
                    COALESCE(c."dendaTagihan"::NUMERIC, 0)
                ) AS total_claim_of_all_creditors
            FROM creditors c 
        ),
        total_count AS (
            SELECT COUNT(*) AS total_count_of_all_creditors
            FROM creditors
        ),
        claims_by_creditor_type AS (
            SELECT 
                "jenis" AS creditor_type,
                SUM (
                    COALESCE("tagihanPokok"::NUMERIC, 0) + 
                    COALESCE("bungaTagihan"::NUMERIC, 0) + 
                    COALESCE("dendaTagihan"::NUMERIC, 0)
                ) AS total_claim_amount,
                COUNT(*) AS creditor_count
            FROM creditors
            GROUP BY "jenis"
        ),
        claims_by_claim_type AS (
            SELECT 
                "sifatTagihan" AS claim_type,
                SUM (
                    COALESCE("tagihanPokok"::NUMERIC, 0) + 
                    COALESCE("bungaTagihan"::NUMERIC, 0) + 
                    COALESCE("dendaTagihan"::NUMERIC, 0)
                ) AS total_claim_amount,
                COUNT(*) AS creditor_count
            FROM creditors
            GROUP BY "sifatTagihan"
        )
        SELECT 
        -- GET TOTAL CLAIM OF ALL CREDITORS
            (
                SELECT total_claim_of_all_creditors::TEXT
                FROM total_claims
            ),
        -- GET TOTAL COUNT OF ALL CREDITORS
            (
                SELECT total_count_of_all_creditors::TEXT
                FROM total_count
            ),
        -- GET TOTAL CLAIM AMOUNT AND COUNT (GROUPED BY CREDITOR TYPE)
            (
                SELECT json_object_agg(
                    creditor_type, 
                    json_build_object(
                        'totalClaimAmount', total_claim_amount,
                        'creditorsCount', creditor_count
                    )
                ) FROM claims_by_creditor_type
            ) AS "total_claim_amount_and_count_by_creditor_type",
        -- GET TOTAL CLAIM AMOUNT AND COUNT (GROUPED BY CLAIM TYPE)
            (
                SELECT json_agg(
                    json_build_object(
                        'claimType', claim_type,
                        'totalClaimAmount', total_claim_amount,
                        'creditorsCount', creditor_count
                    )
                ) FROM claims_by_claim_type
            ) AS "total_claim_amount_and_count_by_claim_type";
    `
    const {
        total_count_of_all_creditors,
        total_claim_of_all_creditors,
        total_claim_amount_and_count_by_claim_type,
        total_claim_amount_and_count_by_creditor_type,
    } = res[0]

    return {
        totalCountAllCreditor: Number(total_count_of_all_creditors) || 0,
        totalClaimAllCreditor: Number(total_claim_of_all_creditors) || 0,
        claimTypeInfoArr: total_claim_amount_and_count_by_claim_type.map(
            (el) => {
                return {
                    claimType: el.claimType,
                    creditorsCount: Number(el.creditorsCount) || 0,
                    totalClaimAmount: Number(el.totalClaimAmount) || 0,
                }
            }
        ),
        creditorTypesInfo: total_claim_amount_and_count_by_creditor_type,
    }
}
