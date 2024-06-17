import ClaimTypeBadge from "@/components/ClaimTypeBadge"
import TableDataNotFound from "@/components/TableDataNotFound"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import db from "@/lib/db"
import { cn, formatCurrency } from "@/lib/utils"
import { Prisma } from "@prisma/client"
import Link from "next/link"
import CreditorInfo from "./CreditorInfo"
import DeleteButton from "./DeleteCreditorButton"
import DownloadCreditorPDFButton from "./DownloadCreditorPDFButton"
import InputorInfo from "./InputorInfo"
import Pagination from "./Pagination"
import { CreditorFilterValues } from "./validations"
import ViewCreditorButton from "./ViewCreditorButton"
import EditCreditorButton from "./EditCreditorButton"

type CreditorsTableProps = {
    filterValues: CreditorFilterValues
    currentPage: number
    tableSize: number
}

async function CreditorsTable({
    filterValues: { q, claimType, creditorType, createdBy },
    currentPage,
    tableSize,
}: CreditorsTableProps) {
    const searchString = q
        ?.split(" ")
        .filter((word) => word.length > 0)
        .join(" & ")

    const createdBySearchString = createdBy
        ?.split(" ")
        .filter((word) => word.length > 0)
        .join(" & ")

    const searchFilter: Prisma.CreditorWhereInput = searchString
        ? {
              // we use "OR" filter, so that the searh filter will work on any columns that we specify
              OR: [
                  { nama: { search: searchString } },
                  { nomorTelepon: { search: searchString } },
                  { alamatKuasaHukum: { search: searchString } },
                  { NIKAtauNomorAktaPendirian: { search: searchString } },
              ],
          }
        : {}

    const createdBySearchFilter: Prisma.CreditorWhereInput =
        createdBySearchString
            ? {
                  user: {
                      OR: [
                          {
                              name: {
                                  contains: createdBySearchString,
                                  mode: "insensitive",
                              },
                          },
                          {
                              email: {
                                  contains: createdBySearchString,
                                  mode: "insensitive",
                              },
                          },
                      ],
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

    const offset = (currentPage - 1) * tableSize

    const creditors = await db.creditor.findMany({
        skip: offset,
        take: tableSize,
        include: {
            _count: { select: { attachments: true } },
            user: { select: { name: true, image: true, role: true } },
            lastUpdatedBy: { select: { name: true, image: true, role: true } },
        },
        orderBy: { number: "desc" },
        where: whereFilter,
    })

    const totalDataCount = await db.creditor.count({
        where: whereFilter,
    })
    const totalPages = Math.ceil(Number(totalDataCount) / tableSize)

    return (
        <div className="min-h-[360px] flex flex-col gap-2 rounded-md overflow-hidden">
            <div className="flex-[1] bg-white">
                <Table
                    className={cn("flex-[1]", {
                        "border-b": totalDataCount > 0,
                    })}
                >
                    {/* <TableCaption>
                    Data Kreditor PT Pailit (dalam Pailit)
                </TableCaption> */}
                    <TableHeader>
                        <TableRow className="bg-primary hover:bg-primary/90">
                            <TableHead className="text-white w-[60px]">
                                No
                            </TableHead>
                            <TableHead className="text-white w-[200px]">
                                Kreditor
                            </TableHead>
                            <TableHead className="text-white">
                                Total Tagihan
                            </TableHead>
                            <TableHead className="text-white">
                                Sifat Tagihan
                            </TableHead>
                            <TableHead className="text-white">
                                Input by
                            </TableHead>
                            <TableHead className="text-white">
                                Last Updated By
                            </TableHead>
                            <TableHead className="text-right text-white">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {creditors.length < 1 ? (
                            <TableDataNotFound
                                colSpan={7}
                                hasFilters={
                                    !!q || !!claimType || !!creditorType
                                }
                                tableName="creditor"
                            />
                        ) : (
                            creditors.map((creditor) => (
                                <TableRow key={creditor.id}>
                                    <TableCell className="text-right">
                                        {creditor.number}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        <CreditorInfo
                                            creditor={{
                                                ...creditor,
                                                attachment_count:
                                                    creditor._count.attachments,
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell className="font-semibold">
                                        {formatCurrency(
                                            Number(creditor.totalTagihan),
                                            "IDR"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex justify-start">
                                            <ClaimTypeBadge
                                                sifatTagihan={
                                                    creditor.sifatTagihan
                                                }
                                            />
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <InputorInfo
                                            inputorId={creditor.userId}
                                            inputorName={creditor.user.name}
                                            inputorRole={creditor.user.role}
                                            date={creditor.createdAt}
                                            tip="Created At"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {creditor.lastUpdatedBy &&
                                        creditor.lastUpdatedByUserId ? (
                                            <InputorInfo
                                                inputorId={
                                                    creditor.lastUpdatedByUserId
                                                }
                                                inputorName={
                                                    creditor.lastUpdatedBy.name
                                                }
                                                inputorRole={
                                                    creditor.lastUpdatedBy.role
                                                }
                                                date={creditor.createdAt}
                                                tip="Last Updated At"
                                            />
                                        ) : (
                                            <p className="text-muted-foreground/80">
                                                No Updates
                                            </p>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2 justify-end">
                                            <ViewCreditorButton
                                                creditorSlug={creditor.slug}
                                            />
                                            <EditCreditorButton
                                                slug={creditor.slug}
                                                small
                                                variant={"outline-bold"}
                                            />
                                            <DeleteButton
                                                creditorId={creditor.id}
                                                creditorName={creditor.nama}
                                                small
                                            />
                                            <DownloadCreditorPDFButton
                                                id={creditor.id}
                                                isTableButton
                                            />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>
            <Pagination
                itemsPerPage={tableSize}
                totalRowCount={totalDataCount}
                totalRowShown={creditors.length}
                totalAvailablePages={totalPages}
            />
        </div>
    )
}

export default CreditorsTable
