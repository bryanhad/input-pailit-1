import db from '@/lib/db'
import React from 'react'
import { Metadata } from 'next'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import DashboardTable from './_components/table/DashboardTable'

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
        include: {
            _count: {select: {attachments:true}}
        }
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
