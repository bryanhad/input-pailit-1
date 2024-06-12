import db from "@/lib/db"
import { notFound } from "next/navigation"
import React from "react"
import EditCreditorForm from "../../_components/EditCreditorForm"
import MainWrapper from "@/components/ui/main-wrapper"
import CreditorTypeBadge from "@/components/CreditorTypeBadge"
import SimplePopover from "@/components/SimplePopover"
import { PencilIcon } from "lucide-react"
import H1 from "@/components/ui/h1"

type EditCreditorPageProps = { params: { slug: string } }

async function EditCreditorPage({ params: { slug } }: EditCreditorPageProps) {
    const creditor = await db.creditor.findFirst({
        where: { slug },
        include: { attachments: true },
    })

    if (!creditor) {
        notFound()
    }

    const { attachments, ...creditorValues } = creditor

    const sanitizedAttachments = attachments.map((attachment) => ({
        ...attachment,
        deskripsi: attachment.deskripsi ?? undefined,
    }))

    const sanitizedCreditor = {
        ...creditorValues,
        NIKAtauNomorAktaPendirian:
            creditorValues.NIKAtauNomorAktaPendirian ?? undefined,
        alamat: creditorValues.alamat ?? undefined,
        email: creditorValues.email ?? undefined,
        nomorTelepon: creditorValues.nomorTelepon ?? undefined,
        korespondensi: creditorValues.korespondensi ?? undefined,
        namaKuasaHukum: creditorValues.namaKuasaHukum ?? undefined,
        emailKuasaHukum: creditorValues.emailKuasaHukum ?? undefined,
        nomorTeleponKuasaHukum:
            creditorValues.nomorTeleponKuasaHukum ?? undefined,
        alamatKuasaHukum: creditorValues.alamatKuasaHukum ?? undefined,
        attachments: sanitizedAttachments,
    }

    return (
        <MainWrapper
 
            titleIcon={
                <SimplePopover
                tip="editing form"
                className="rounded-full p-3 bg-black text-white"
            >
                <PencilIcon size={22} className="shrink-0" />
            </SimplePopover>
            }
            title={`Edit '${creditor.nama}'`}
        >
            <EditCreditorForm
                defaultValues={sanitizedCreditor}
                creditorId={creditorValues.id}
            />
        </MainWrapper>
    )
}

export default EditCreditorPage
