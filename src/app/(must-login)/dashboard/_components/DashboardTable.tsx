import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { formatCurrency } from '@/lib/utils'
import { ClaimType } from '@/types'
import { Attachment, Creditor } from '@prisma/client'
import { CircleCheck, CircleX } from 'lucide-react'
import Link from 'next/link'
import DownloadPDFButton from './DownloadButton'

type DashboardTableProps = {
    creditors: (Creditor & { attachments: Attachment[] })[]
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
                                <p>{creditor.nama}</p>
                                <p className="text-sm font-thin">
                                    {creditor.jenis}
                                </p>
                                <div className="flex items-center gap-2">
                                    <p>Kuasa:</p>
                                    {creditor.namaKuasaHukum ? (
                                        <CircleCheck
                                            size={16}
                                            className="shrink-0"
                                        />
                                    ) : (
                                        <CircleX
                                            size={16}
                                            className="shrink-0"
                                        />
                                    )}
                                </div>
                            </div>
                        </TableCell>
                        <TableCell>
                            {formatCurrency(
                                Number(creditor.totalTagihan),
                                'IDR'
                            )}
                        </TableCell>
                        <TableCell>{creditor.sifatTagihan}</TableCell>
                        <TableCell className="text-right">Bang Jarwo</TableCell>
                        <TableCell className="text-right">
                            09 Sep 2023
                        </TableCell>
                        <TableCell className="text-right">
                            <div className="flex flex-col gap-2">
                                <Button asChild>
                                    <Link href={`/creditors/${creditor.slug}`}>
                                        Edit
                                    </Link>
                                </Button>
                                <DownloadPDFButton
                                    creditor={creditor}
                                    attachments={creditor.attachments}
                                />
                                <Button asChild variant={'destructive'}>
                                    <Link href={`/creditors/${creditor.slug}`}>
                                        Delete
                                    </Link>
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}

export default DashboardTable
