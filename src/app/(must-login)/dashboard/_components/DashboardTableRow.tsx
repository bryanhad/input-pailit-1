'use client'
import { Attachment, Creditor } from '@prisma/client'
import React, { useRef, useState } from 'react'

type DashboardTableRowProps = {
    creditor: Creditor
    attachments: Attachment[]
}

function DashboardTableRow({ creditor, attachments }: DashboardTableRowProps) {
    const [] = useState()

    const ref = useRef<HTMLAnchorElement | null>(null)

    return <div>DashboardTableRow</div>
}

export default DashboardTableRow
