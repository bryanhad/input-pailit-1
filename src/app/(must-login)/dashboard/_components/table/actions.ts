'use server'

import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { creditorFilterSchema } from './validations'
import { redirect } from 'next/navigation'

export async function getCreditorInfo(id: number) {
    const creditorWithAttahcments = await db.creditor.findUnique({
        where: { id },
        include: { attachments: true },
    })

  return creditorWithAttahcments
}

export async function filterCreditors(formData: FormData) {
    // const offset = (currentPage - 1) * itemsPerPage
    const formValues = Object.fromEntries(formData.entries());

    const {q, claimType, creditorType} = creditorFilterSchema.parse(formValues)


    const searchParams = new URLSearchParams({
        // the code below is to ensure to pass the object conditionally..
        ...(q && { q: q.trim() }),
        ...(claimType && { claimType }),
        ...(creditorType && { creditorType }),
    });

        // Below is what searchParams.toString() result into...
    // "[fieldName]=[value]&[fieldName]=[value]&[fieldName]=[value]&...."
    redirect(`/dashboard?${searchParams.toString()}`);

    // const pageCount = await db.creditor.findMany({
    //     skip: offset,
    //     take: itemsPerPage,
    //     where: {
    //         nama: {
    //             contains: query,
    //             mode: 'insensitive'
    //         },
    //         NIKAtauNomorAktaPendirian: {
    //             contains: query,
    //             mode: 'insensitive'
    //         },
    //         namaKuasaHukum: {
    //             contains: query,
    //             mode: 'insensitive'
    //         }
    //     }
    // })
}
 
export async function deleteCreditor(id:number) {
    await db.creditor.delete({
        where: {id}
    })
    revalidatePath('/dashboard')
}