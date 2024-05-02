'use server'

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function getCreditorInfo(id: string) {
    const creditorWithAttahcments = await db.creditor.findUnique({
        where: { id },
        include: { attachments: true },
    })

  return creditorWithAttahcments
}

export async function deleteCreditor(id:string) {
    await db.creditor.delete({
        where: {id}
    })
    revalidatePath('/dashboard')
}