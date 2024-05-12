import ClaimTypeBadge from "@/components/ClaimTypeBadge"
import CreditorTypeBadge from "@/components/CreditorTypeBadge"
import SimplePopover from "@/components/SimplePopover"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import db from "@/lib/db"
import {
    formatCurrency,
    formatNumber
} from "@/lib/utils"
import { Creditor, Prisma } from "@prisma/client"
import {
    BookText,
    CircleCheck,
    CircleX
} from "lucide-react"
import Link from "next/link"
import DeleteButton from "./DeleteButton"
import DownloadButton from "./DownloadButton"
import Pagination from "./Pagination"
import { CreditorFilterValues } from "./validations"

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
        orderBy: { number: "desc" },
        where: whereFilter,
    })

    const totalDataCount = await db.creditor.count({
        where: whereFilter,
    })
    const totalPages = Math.ceil(Number(totalDataCount) / tableSize)

    return (
        <>
            <Table className="bg-white">
                <TableCaption>
                    Data Kreditor PT Pailit (dalam Pailit)
                </TableCaption>
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
                        <TableHead className="text-right text-white">
                            Input by
                        </TableHead>
                        <TableHead className="text-right text-white">
                            Last Updated
                        </TableHead>
                        <TableHead className="text-right text-white">
                            Action
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {creditors.map((creditor) => (
                        <TableRow key={creditor.id}>
                            <TableCell className="text-right">
                                {creditor.number}
                            </TableCell>
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
                                    <ClaimTypeBadge
                                        sifatTagihan={creditor.sifatTagihan}
                                    />
                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                Bang Jarwo
                            </TableCell>
                            <TableCell className="text-right">
                                {JSON.stringify(creditor.createdAt, null, 2)}
                            </TableCell>
                            <TableCell>
                                <div className="flex gap-2 justify-end">
                                    <Button asChild>
                                        <Link
                                            href={`/creditors/${creditor.slug}`}
                                        >
                                            View
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
                totalRowCount={totalDataCount}
                totalRowShown={creditors.length}
                totalAvailablePages={totalPages}
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
        <div className="flex items-center gap-4">
            <CreditorTypeBadge jenisKreditor={creditor.jenis} />
            <div className="flex items-start flex-col w-[200px] gap-1">
                <p className="max-w-full truncate text-sm flex-1 text-muted-foreground">
                    {creditor.nama}
                </p>
                <div className="flex justify-end gap-4">
                    <SimplePopover tip="Kuasa Hukum">
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
                    </SimplePopover>
                    <SimplePopover tip="Lampiran">
                        <div className="flex items-center text-muted-foreground gap-1">
                            <BookText size={16} className="shrink-0" />
                            <span>:</span>
                            <p>{formatNumber(creditor.attachment_count)}</p>
                        </div>
                    </SimplePopover>
                </div>
            </div>
        </div>
    )
}
