import CreditorTypeBadge from '@/components/CreditorTypeBadge'
import SimplePopover from '@/components/SimplePopover'
import { cn, formatNumber } from '@/lib/utils'
import { Creditor } from '@prisma/client'
import { BookText, CircleCheck, CircleX } from 'lucide-react'

export type CreditorInfoProps = {
    creditor: Creditor & { attachment_count: number }
    className?: string
    badgeSize?:number
}

function CreditorInfo({ creditor, className, badgeSize }: CreditorInfoProps) {
    return (
        <div className="flex items-center gap-4">
            <CreditorTypeBadge jenisKreditor={creditor.jenis} size={badgeSize} />
            <div
                className={cn(
                    'flex items-start flex-col w-[160px] gap-1',
                    className
                )}
            >
                <div className="w-full max-w-[150px]">
                    <p className="max-w-max truncate text-sm flex-1 text-muted-foreground">
                        {creditor.nama}
                    </p>
                </div>
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

export default CreditorInfo
