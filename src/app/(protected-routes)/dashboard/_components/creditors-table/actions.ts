"use server"

import db from "@/lib/db"
import { Prisma } from "@prisma/client"
import { revalidatePath } from "next/cache"
import {
    FetchCreditorsSearchParams
} from "./validations"

export async function getCreditorInfo(id: string) {
    const creditorWithAttahcments = await db.creditor.findUnique({
        where: { id },
        include: { attachments: true },
    })

    return creditorWithAttahcments
}

export async function deleteCreditor(id: string) {
    await db.creditor.delete({
        where: { id },
    })
    revalidatePath("/dashboard")
}

export async function fetchCreditors({
    filterValues,
    createdByUserId,
    defaultFetchSize
}: {
    filterValues: FetchCreditorsSearchParams
    defaultFetchSize:number
    createdByUserId?: string
}) {
    const { q, claimType, createdBy, creditorType, page, size } = filterValues
    const isUsingFilter = !!q || !!claimType || !!creditorType
    const currentPage = Number(page) || 1
    const fetchSize = Number(size) || defaultFetchSize

    const searchString = q
        ?.split(" ")
        .filter((word) => word.length > 0)
        .join(" ")

    const createdBySearchString = createdBy
        ?.split(" ")
        .filter((word) => word.length > 0)
        .join(" ")

    const searchFilter: Prisma.CreditorWhereInput = searchString
        ? {
              // we use "OR" filter, so that the searh filter will work on any columns that we specify
              OR: [
                  {
                      nama: {
                          contains: searchString,
                          mode: "insensitive",
                      },
                  },
                  {
                      nomorTelepon: {
                          contains: searchString,
                          mode: "insensitive",
                      },
                  },
                  {
                      alamatKuasaHukum: {
                          contains: searchString,
                          mode: "insensitive",
                      },
                  },
                  {
                      NIKAtauNomorAktaPendirian: {
                          contains: searchString,
                          mode: "insensitive",
                      },
                  },
              ],
          }
        : {}

    const createdBySearchFilter: Prisma.CreditorWhereInput =
        createdBySearchString || createdByUserId
            ? {
                  user: {
                      OR: [
                          createdByUserId
                              ? {
                                    id: createdByUserId,
                                }
                              : undefined,
                          createdBySearchString
                              ? {
                                    name: {
                                        contains: createdBySearchString,
                                        mode: "insensitive",
                                    },
                                }
                              : undefined,
                          createdBySearchString
                              ? {
                                    email: {
                                        contains: createdBySearchString,
                                        mode: "insensitive",
                                    },
                                }
                              : undefined,
                      ].filter(Boolean) as Prisma.UserWhereInput[], // This filters out undefined values
                  },
              }
            : {}

    const whereFilter: Prisma.CreditorWhereInput = {
        AND: [
            searchFilter,
            createdBySearchFilter,
            creditorType ? { jenis: creditorType } : {},
            claimType ? { sifatTagihan: claimType } : {},
        ],
    }

    const offset = (currentPage - 1) * fetchSize

    const fetchedCreditors = await db.creditor.findMany({
        skip: offset,
        take: fetchSize,
        include: {
            _count: { select: { attachments: true } },
            user: { select: { name: true, image: true, role: true } },
            lastUpdatedBy: { select: { name: true, image: true, role: true } },
        },
        orderBy: { number: "desc" },
        where: whereFilter,
    })

    const transformedCreditors = fetchedCreditors.map((creditor) => {
        const tagihanPokok = Number(creditor.tagihanPokok || "0")
        const bungaTagihan = Number(creditor.bungaTagihan || "0")
        const dendaTagihan = Number(creditor.dendaTagihan || "0")

        const totalTagihan = tagihanPokok + bungaTagihan + dendaTagihan

        return {
            ...creditor,
            totalTagihan,
        }
    })

    const totalDataCount = await db.creditor.count({
        where: whereFilter,
    })
    const totalAvailablePages = Math.ceil(Number(totalDataCount) / fetchSize)

    return {
        creditors: transformedCreditors,
        totalDataCount,
        totalAvailablePages,
        isUsingFilter,
        fetchSize,
    }
}
