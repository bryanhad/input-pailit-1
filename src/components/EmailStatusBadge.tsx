import React from 'react'
import SimplePopover from './SimplePopover'
import { formatDateToLocale } from '@/lib/utils'
import { MailCheck, MailWarning } from 'lucide-react'

type EmailStatusBadgeProps = {
    verifiedDate?: Date | null
}

function EmailStatusBadge({ verifiedDate }: EmailStatusBadgeProps) {
    return (
        <SimplePopover
            tip={
                verifiedDate ? (
                    <div className='text-center'>
                        <p>Verified on</p>
                        <p>{formatDateToLocale(verifiedDate, 'en-US')}</p>
                    </div>
                ) : (
                    `Email has not been verified`
                )
            }
            className="border-none"
        >
            {verifiedDate ? (
                <MailCheck className="shrink-0 text-green-400" size={22} />
            ) : (
                <MailWarning className="shrink-0 text-red-400" size={22} />
            )}
        </SimplePopover>
    )
}

export default EmailStatusBadge
