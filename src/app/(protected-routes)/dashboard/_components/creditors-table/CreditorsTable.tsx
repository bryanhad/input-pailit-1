import ClaimTypeBadge from "@/components/ClaimTypeBadge"
import TableDataNotFound from "@/components/TableDataNotFound"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { cn, formatCurrency } from "@/lib/utils"
import CreditorInfo from "./CreditorInfo"
import DeleteButton from "./DeleteCreditorButton"
import DownloadCreditorPDFButton from "./DownloadCreditorPDFButton"
import EditCreditorButton from "./EditCreditorButton"
import InputorInfo from "./InputorInfo"
import Pagination from "./Pagination"
import ViewCreditorButton from "./ViewCreditorButton"
import { fetchCreditors } from "./actions"
import { FetchCreditorsSearchParams } from "./validations"

type CreditorsTableProps = {
    fetchCreditorSearchParams: FetchCreditorsSearchParams
}

async function CreditorsTable({
    fetchCreditorSearchParams,
}: CreditorsTableProps) {
    const {
        totalDataCount,
        creditors,
        totalAvailablePages,
        isUsingFilter,
        fetchSize,
    } = await fetchCreditors({
        filterValues: fetchCreditorSearchParams,
        defaultFetchSize: 10,
    })

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
                        <TableRow className="bg-gray-400 hover:bg-gray-400/90">
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
                                hasFilters={isUsingFilter}
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
                itemsPerPage={fetchSize}
                totalRowCount={totalDataCount}
                totalRowShown={creditors.length}
                totalAvailablePages={totalAvailablePages}
            />
        </div>
    )
}

export default CreditorsTable
