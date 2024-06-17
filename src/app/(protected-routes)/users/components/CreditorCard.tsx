import CreditorInfo, {
    CreditorInfoProps,
} from "../../dashboard/_components/creditors-table/CreditorInfo"
import DeleteCreditorButton from "../../dashboard/_components/creditors-table/DeleteCreditorButton"
import DownloadCreditorPDFButton from "../../dashboard/_components/creditors-table/DownloadCreditorPDFButton"
import EditCreditorButton from "../../dashboard/_components/creditors-table/EditCreditorButton"
import InputorInfo from "../../dashboard/_components/creditors-table/InputorInfo"

export type CreditorCardProps = {
    creditor: CreditorInfoProps["creditor"] & {
        lastUpdatedByUserId: string | null
        lastUpdatedBy: {
            name: string | null
            role: string
            image: string | null
        } | null
    }
}

function CreditorCard({ creditor }: CreditorCardProps) {
    return (
        <div className="flex flex-col rounded-md border border-gray-300 overflow-hidden bg-white">
            <div className="flex justify-between items-center bg-slate-50 p-4">
                <CreditorInfo
                    creditor={creditor}
                    className="w-max"
                    badgeSize={26}
                    creditorNameClassName="text-base text-black"
                    creditorBadgeClassName="bg-white p-2"
                />
            </div>
            <div className="flex flex-col justify-between lg:flex-row-reverse p-4 flex-[1] gap-4">
                <div className="grid grid-cols-4 lg:grid-cols-2 lg:flex-[1] gap-2">
                    <EditCreditorButton
                        slug={creditor.slug}
                        variant={"outline"}
                        small
                    />
                    <EditCreditorButton
                        slug={creditor.slug}
                        variant={"outline"}
                        small
                    />
                    <DeleteCreditorButton
                        creditorId={creditor.id}
                        creditorName={creditor.nama}
                        variant={"destructive-outline"}
                        small
                    />
                    <DownloadCreditorPDFButton small id={creditor.id} />
                </div>
                {creditor.lastUpdatedBy && creditor.lastUpdatedByUserId ? (
                    <div className="flex flex-col items-center gap-2 lg:flex-[1]">
                        <p className="text-xs font-light">Last Updated By</p>
                        <InputorInfo
                            inputorId={creditor.lastUpdatedByUserId}
                            inputorName={creditor.lastUpdatedBy.name}
                            inputorRole={creditor.lastUpdatedBy.role}
                            date={creditor.createdAt}
                            tip="Last Updated At"
                            className=""
                        />
                    </div>
                ) : (
                    <div className="flex-[1] flex items-center justify-center">
                        <p className="text-muted-foreground/80 text-center">
                            No Updates
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CreditorCard
