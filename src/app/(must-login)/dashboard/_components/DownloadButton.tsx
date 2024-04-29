'use client'

import { Button } from '@/components/ui/button'
import { Attachment, Creditor } from '@prisma/client'
import { downloadPDFData } from '../actions'

type DownloadPDFButtonProps = {
    creditor: Creditor
    attachments: Attachment[]
}

function DownloadPDFButton({ creditor, attachments }: DownloadPDFButtonProps) {
    async function handleClick() {
        await downloadPDFData({ ...creditor, attachments })
    }
    return (
        <Button variant={'outline'} onClick={() => handleClick()}>
            Download PDF
        </Button>
    )
}

export default DownloadPDFButton
