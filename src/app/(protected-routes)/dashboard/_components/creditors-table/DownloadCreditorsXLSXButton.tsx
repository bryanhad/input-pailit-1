'use client'

import LoadingButton from '@/components/LoadingButton'
import { useToast } from '@/components/ui/use-toast'
import axios from 'axios'
import { format } from 'date-fns'
import { Download } from 'lucide-react'
import { useState } from 'react'

function DownloadCreditorsXLSXButton() {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    async function onClick() {
        setLoading(true)
        try {
            const res = await axios.get('/api/get-data', {
                responseType: 'blob',
            })
            if (res.status < 200 || res.status >= 300) {
                throw new Error('Failed to get PDF from server.')
            }
            // Create a Blob from the Buffer
            const blob = new Blob([res.data])
            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')

            link.href = url
            const formattedCurrentDate = format(new Date(), 'yyyy-MM-dd')
            link.download = `creditors-data-${formattedCurrentDate}.xlsx`
            link.click()
            link.remove()
            window.URL.revokeObjectURL(url)
            toast({
                title: 'Successfully downloaded XLSX',
                description: `Check your browser's download history`,
            })
        } catch (err: any) {
            console.error('Error downloading PDF:', err)
            toast({
                variant: 'destructive',
                title: 'Failed to download XLSX',
                description: err.message || 'Something went wrong',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <LoadingButton
            loading={loading}
            loadingMessage="Generating XLSX.."
            onClick={onClick}
            noLoadingMessage
            className='md:min-w-[160px]'
        >
            <Download size={16} className="shrink-0" />
            <span className="hidden md:block">Download XLSX</span>
        </LoadingButton>
    )
}

export default DownloadCreditorsXLSXButton
