'use client'

import LoadingButton from '@/components/LoadingButton'
import { Button } from '@/components/ui/button'
import { Attachment, Creditor } from '@prisma/client'
import React, { useState } from 'react'
import { getCreditorPDF } from './actions'
import axios from 'axios'

function DownloadButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false)

    const handleDownloadPDF = async () => {
        setLoading(true)
        console.log('clicked!')
        try {
            const creditorWithAttahcments = await getCreditorPDF(id)

            const response = await axios.post(
                'httpL//localhost:5000/pdf-generator',
                {data: creditorWithAttahcments
                },
                {
                    responseType: 'arraybuffer', // Treat response as binary ArrayBuffer
                }
            )
            console.log(response.data)
            // Create a Blob from the Buffer
            const blob = new Blob([response.data], { type: 'application/pdf' })

            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(blob)

            // Create a temporary <a> element
            const link = document.createElement('a')
            link.href = url
            link.download = 'file.pdf'

            // Programmatically trigger the download
            link.click()

            // Clean up
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Error downloading PDF:', error)
            // Handle error
        } finally {
            setLoading(false)
        }
    }

    return (
        <LoadingButton
            onClick={() => handleDownloadPDF()}
            variant={'outline'}
            loading={loading}
        >
            Downlaod
        </LoadingButton>
    )
}

export default DownloadButton
