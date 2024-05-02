"use client"

import LoadingButton from "@/components/LoadingButton"
import { useToast } from "@/components/ui/use-toast"
import axios from "axios"
import { useState } from "react"
import { getCreditorInfo } from "./actions"
import { cn } from "@/lib/utils"

function DownloadButton({ id }: { id: string }) {
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    const handleDownloadPDF = async () => {
        setLoading(true)
        console.log("clicked!")
        try {
            const creditorWithAttahcments = await getCreditorInfo(id)
            if (!creditorWithAttahcments) {
                throw new Error(`Creditor with id '${id}' not found.`)
            }

            const res = await axios.post(
                "http://localhost:5000/generate-pdf",
                { data: creditorWithAttahcments },
                { responseType: "arraybuffer" }
            )
            if (res.status < 200 && res.status >= 300) {
                throw new Error('Failed to get PDF from server.')
            }
            // Create a Blob from the Buffer
            const blob = new Blob([res.data], { type: "application/pdf" })
            // Create a temporary URL for the Blob
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = url
            link.download = `${creditorWithAttahcments.slug}.pdf`
            link.click()
            window.URL.revokeObjectURL(url)

            toast({
                title: "Successfully downloaded PDF.",
                description: `Check your browser's download history`
            })

        } catch (err: any) {
            console.error("Error downloading PDF:", err)
            toast({
                variant: 'destructive',
                title: "Failed to download PDF.",
                description: err.message || 'Something went wrong.',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <LoadingButton
            className={cn({'animate-pulse cursor-not-allowed': loading})}
            onClick={() => handleDownloadPDF()}
            variant={"outline"}
            loading={loading}
            loadingMessage="Generating PDF.."
        >
            Downlaod
        </LoadingButton>
    )
}

export default DownloadButton
