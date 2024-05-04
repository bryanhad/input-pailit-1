import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Creditor } from "@prisma/client"
import {
    CircleCheck,
    CircleX,
    Building2,
    UserRound,
    BookText,
} from "lucide-react"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import DownloadButton from "./DownloadButton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    capitalizeFirstLetter,
    cn,
    formatCurrency,
    formatNumber,
} from "@/lib/utils"
import DeleteButton from "./DeleteButton"
import { ClaimType, CreditorType } from "@/types"
import React from "react"
import { CreditorFilterValues } from "./validations"
import { Prisma } from "@prisma/client"
import db from "@/lib/db"
import Pagination from "./Pagination"

type DashboardTableProps = {
    filterValues: CreditorFilterValues
    currentPage: number
    tableSize: number
}

async function DashboardTable({
    filterValues: { q, claimType, creditorType },
    currentPage,
    tableSize,
}: DashboardTableProps) {
    const searchString = q
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

    const whereFilter: Prisma.CreditorWhereInput = {
        AND: [
            searchFilter,
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
        },
        orderBy: { createdAt: "desc" },
        where: whereFilter,
    })

    const totalDataCount = await db.creditor.count()
    const totalPages = Math.ceil(Number(totalDataCount) / tableSize)

    return (
        <>
            <Table className="bg-white">
                <TableCaption>Data Kreditor PT Pailit (dalam Pailit)</TableCaption>
                <TableHeader>
                    <TableRow className="bg-primary hover:bg-primary/90">
                        <TableHead className="text-white w-[200px]">Kreditor</TableHead>
                        <TableHead className="text-white">Total Tagihan</TableHead>
                        <TableHead className="text-white">Sifat Tagihan</TableHead>
                        <TableHead className="text-right text-white">Input by</TableHead>
                        <TableHead className="text-right text-white">
                            Last Updated
                        </TableHead>
                        <TableHead className="text-right text-white">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {creditors.map((creditor) => (
                        <TableRow key={creditor.id}>
                            <TableCell className="font-medium">
                                <KreditorInfo
                                    creditor={{
                                        ...creditor,
                                        attachment_count:
                                            creditor._count.attachments,
                                    }}
                                />
                            </TableCell>
                            <TableCell>
                                {formatCurrency(
                                    Number(creditor.totalTagihan),
                                    "IDR"
                                )}
                            </TableCell>
                            <TableCell>
                                <div className="flex justify-start">
                                    <div
                                        className={cn(
                                            {
                                                "border border-purple-500/60 text-purple-500/60":
                                                    creditor.sifatTagihan ===
                                                    ClaimType.Separatis,
                                                "border border-sky-500/60 text-sky-500/60":
                                                    creditor.sifatTagihan ===
                                                    ClaimType.Konkuren,
                                                "border border-green-500/60 text-green-500/60":
                                                    creditor.sifatTagihan ===
                                                    ClaimType.Preferen,
                                            },
                                            "py-[2px] px-3 text-sm rounded-md"
                                        )}
                                    >
                                        {creditor.sifatTagihan}
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                Bang Jarwo
                            </TableCell>
                            <TableCell className="text-right">
                                09 Sep 2023
                            </TableCell>
                            <TableCell >
                                <div className="flex gap-2 justify-end">
                                    <Button asChild>
                                        <Link
                                            href={`/creditors/${creditor.slug}`}
                                        >
                                            Edit
                                        </Link>
                                    </Button>
                                    <DeleteButton
                                        creditorId={creditor.id}
                                        creditorName={creditor.nama}
                                    />
                                    <DownloadButton id={creditor.id} />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Pagination
                itemsPerPage={tableSize}
                totalData={totalDataCount}
                totalPages={totalPages}
            />
        </>
    )
}

export default DashboardTable

function KreditorInfo({
    creditor,
}: {
    creditor: Creditor & { attachment_count: number }
}) {
    return (
        <div className="flex flex-col">
            <div className="flex w-[200px] gap-2 items-center">
                <div className="text-sm p-1 text-muted-foreground">
                    <SimpleToolTip
                        className="rounded-full p-1"
                        tip={capitalizeFirstLetter(creditor.jenis)}
                    >
                        {creditor.jenis === CreditorType.Instansi && (
                            <Building2 size={16} className="shrink-0" />
                        )}
                        {creditor.jenis === CreditorType.Pribadi && (
                            <UserRound size={16} className="shrink-0" />
                        )}
                    </SimpleToolTip>
                </div>
                <p className="max-w-full truncate flex-1">{creditor.nama}</p>
            </div>
            <div className="flex justify-end gap-4">
                <SimpleToolTip tip="Kuasa Hukum">
                    <div className="flex items-center gap-2">
                        <p>Kuasa:</p>
                        {creditor.namaKuasaHukum ? (
                            <CircleCheck
                                size={16}
                                className="shrink-0 text-green-400"
                            />
                        ) : (
                            <CircleX
                                size={16}
                                className="shrink-0 text-red-400"
                            />
                        )}
                    </div>
                </SimpleToolTip>
                <SimpleToolTip tip="Lampiran">
                    <div className="flex items-center text-muted-foreground gap-1">
                        <BookText size={16} className="shrink-0" />
                        <span>:</span>
                        <p>{formatNumber(creditor.attachment_count)}</p>
                    </div>
                </SimpleToolTip>
            </div>
        </div>
    )
}

function SimpleToolTip({
    children,
    tip,
    className,
}: {
    children: React.ReactNode
    tip: string
    className?: string
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger
                    className={cn("border py-[2px] px-2 rounded-md", className)}
                >
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
