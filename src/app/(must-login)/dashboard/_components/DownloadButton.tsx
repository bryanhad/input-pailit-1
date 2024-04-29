'use client'

import { Button } from '@/components/ui/button'
import { Attachment, Creditor } from '@prisma/client'
import { downloadPDFData } from '../actions'
import { useState } from 'react'
import { Loader } from 'lucide-react'

type DownloadPDFButtonProps = {
    creditor: Creditor
    attachments: Attachment[]
}

function DownloadPDFButton({ creditor, attachments }: DownloadPDFButtonProps) {
    const [loading, setLoading] = useState(false)
    async function handleClick() {
        setLoading(true)
        await downloadPDFData({ ...creditor, attachments })
        setLoading(false)
    }
    return (
        <Button
            variant={'outline'}
            onClick={() => handleClick()}
            className="flex items-center gap-2"
        >
            {loading ? (
                <>
                    <Loader className="shrink-0 animate-spin" size={16} />
                    <p>Generating PDF..</p>
                </>
            ) : (
                'Download PDF'
            )}
        </Button>
    )
}

export default DownloadPDFButton
