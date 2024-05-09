import db from '@/lib/db'
import { notFound } from 'next/navigation'
import React from 'react'
import EditCreditorForm from '../../_components/EditCreditorForm'

type EditCreditorPageProps = { params: { slug: string } }

async function EditCreditorPage({params: {slug}}:EditCreditorPageProps) {
    const creditor = await db.creditor.findFirst({
        where: {slug},
        include: {attachments: true}
    })

    if (!creditor) {
        notFound()
    }

    const {attachments, ...creditorValues} = creditor

    const sanitizedAttachments = attachments.map(attachment => ({...attachment, deskripsi: attachment.deskripsi ?? undefined }))

    const sanitizedCreditor = {
        ...creditorValues,
        NIKAtauNomorAktaPendirian: creditorValues.NIKAtauNomorAktaPendirian ?? undefined,
        alamat: creditorValues.alamat ?? undefined,
        email: creditorValues.email ?? undefined,
        nomorTelepon: creditorValues.nomorTelepon ?? undefined,
        korespondensi: creditorValues.korespondensi ?? undefined,
        namaKuasaHukum: creditorValues.namaKuasaHukum ?? undefined,
        emailKuasaHukum: creditorValues.emailKuasaHukum ?? undefined,
        nomorTeleponKuasaHukum: creditorValues.nomorTeleponKuasaHukum ?? undefined,
        alamatKuasaHukum: creditorValues.alamatKuasaHukum ?? undefined,
        attachments: sanitizedAttachments
      };



  return (
    <div>
        <EditCreditorForm defaultValues={sanitizedCreditor}/>
    </div>
  )
}

export default EditCreditorPage