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
import DownloadButton from "./DownloadButton"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatCurrency, formatNumber } from "@/lib/utils"
import DeleteButton from "./DeleteButton"
import { CreditorType } from "@/types"

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
                            <div className="flex flex-col">
                                <div className="flex w-[200px] gap-2">
                                    <div className="text-sm p-1 text-muted-foreground">
                                        {creditor.jenis ===
                                            CreditorType.Instansi && (
                                            <Building2
                                                size={16}
                                                className="shrink-0"
                                            />
                                        )}
                                        {creditor.jenis ===
                                            CreditorType.Pribadi && (
                                            <UserRound
                                                size={16}
                                                className="shrink-0"
                                            />
                                        )}
                                    </div>
                                    <p className="max-w-full truncate flex-1">
                                        {creditor.nama}
                                    </p>
                                </div>
                                <div className="flex justify-between">
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
                                    <div className="flex items-center text-muted-foreground gap-1">
                                        <BookText
                                            size={16}
                                            className="shrink-0"
                                        />
                                        <span>:</span>
                                        <p>
                                            {formatNumber(
                                                creditor._count.attachments
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            {formatCurrency(
                                Number(creditor.totalTagihan),
                                "IDR"
                            )}
                        </TableCell>
                        <TableCell>{creditor.sifatTagihan}</TableCell>
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
                                <DownloadButton id={creditor.id}/>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default DashboardTable
