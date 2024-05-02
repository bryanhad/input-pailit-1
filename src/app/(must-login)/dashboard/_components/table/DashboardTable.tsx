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
import { capitalizeFirstLetter, cn, formatCurrency, formatNumber } from "@/lib/utils"
import DeleteButton from "./DeleteButton"
import { ClaimType, CreditorType } from "@/types"
import React from "react"

type DashboardTableProps = {
    creditors: (Creditor & {
        _count: {
            attachments: number
        }
    })[]
}

function DashboardTable({ creditors }: DashboardTableProps) {
    return (
        <Table className="bg-white">
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Kreditor</TableHead>
                    <TableHead>Total Tagihan</TableHead>
                    <TableHead>Sifat Tagihan</TableHead>
                    <TableHead className="text-right">Input by</TableHead>
                    <TableHead className="text-right">Last Updated</TableHead>
                    <TableHead className="text-right">Action</TableHead>
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
                        <TableCell className="text-right">Bang Jarwo</TableCell>
                        <TableCell className="text-right">
                            09 Sep 2023
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex gap-2">
                                <Button asChild>
                                    <Link href={`/creditors/${creditor.slug}`}>
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
                    <SimpleToolTip className="rounded-full p-1" tip={capitalizeFirstLetter(creditor.jenis)}>
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
    className
}: {
    children: React.ReactNode
    tip: string
    className?:string
}) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className={cn("border py-[2px] px-2 rounded-md", className)}>
                    {children}
                </TooltipTrigger>
                <TooltipContent>
                    <p>{tip}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
