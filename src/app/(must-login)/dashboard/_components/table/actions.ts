'use server'

import db from '@/lib/db'
import axios from 'axios'

export async function getCreditorPDF(id: string) {
    const creditorWithAttahcments = await db.creditor.findUnique({
        where: { id },
        include: { attachments: true },
    })

  return creditorWithAttahcments
}
