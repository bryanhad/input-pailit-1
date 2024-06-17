import CreditorInfo, {
    CreditorInfoProps,
} from '../../dashboard/_components/creditors-table/CreditorInfo'
import DeleteCreditorButton from '../../dashboard/_components/creditors-table/DeleteCreditorButton'
import DownloadCreditorPDFButton from '../../dashboard/_components/creditors-table/DownloadCreditorPDFButton'
import EditCreditorButton from '../../dashboard/_components/creditors-table/EditCreditorButton'
import InputorInfo from '../../dashboard/_components/creditors-table/InputorInfo'

type CreditorCardProps = {
    creditor: CreditorInfoProps['creditor'] & {
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
        <div className="flex flex-col rounded-md border overflow-hidden bg-white p-4 gap-4">
            <div className="flex justify-between items-center">
                <CreditorInfo creditor={creditor} className="w-max" />
                <DownloadCreditorPDFButton small id={creditor.id} />
            </div>
            <div className="flex justify-between flex-[1] items-end">
                {creditor.lastUpdatedBy && creditor.lastUpdatedByUserId ? (
                    <div className="space-y-2">
                        <p className="text-xs font-light">Last Updated By</p>
                        <InputorInfo
                            inputorId={creditor.lastUpdatedByUserId}
                            inputorName={creditor.lastUpdatedBy.name}
                            inputorRole={creditor.lastUpdatedBy.role}
                            date={creditor.createdAt}
                            tip="Last Updated At"
                        />
                    </div>
                ) : (
                    <p className="text-muted-foreground/80">No Updates</p>
                )}
                <div className="flex gap-2">
                    <EditCreditorButton
                        slug={creditor.slug}
                        variant={'outline'}
                        small
                />
                    <DeleteCreditorButton
                        creditorId={creditor.id}
                        creditorName={creditor.nama}
                        variant={'destructive-outline'}
                        small
                    />
                </div>
            </div>
        </div>
    )
}

export default CreditorCard
