import db from '@/lib/db'
import React from 'react'
import DashboardTable from './_components/DashboardTable'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Dashboard',
}

async function DashboardPage({
    searchParams,
}: {
    searchParams?: {
        q?: string
        page?: string
    }
}) {
    const query = searchParams?.q || ''
    const currentPage = Number(searchParams?.page) || 1

    // const totalPages = await fetchInvoicesPages(query);

    const creditorsWithAttachments = await db.creditor.findMany({
      include: {attachments: true}
    })

    return (
        <div>
            <Button asChild>
                <Link href={'/add-creditor'}>+ Kreditor</Link>
            </Button>
            <DashboardTable creditors={creditorsWithAttachments}  />
        </div>
    )
}

export default DashboardPage
