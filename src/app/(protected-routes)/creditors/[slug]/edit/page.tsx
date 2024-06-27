import SimplePopover from '@/components/SimplePopover'
import MainWrapper from '@/components/ui/main-wrapper'
import db from '@/lib/db'
import { PencilIcon } from 'lucide-react'
import { notFound } from 'next/navigation'
import EditCreditorForm from '../../_components/EditCreditorForm'
import { mustLogin } from '@/auth/actions'

type EditCreditorPageProps = { params: { slug: string } }

async function EditCreditorPage({ params: { slug } }: EditCreditorPageProps) {
    const user = await mustLogin()

    const creditor = await db.creditor.findFirst({
        where: { slug },
        include: { attachments: true },
    })

    if (!creditor) {
        notFound()
    }

    const { attachments, bungaTagihan, dendaTagihan, ...creditorValues } = creditor

    const sanitizedAttachments = attachments.map((attachment) => ({
        ...attachment,
        deskripsi: attachment.deskripsi ?? undefined,
    }))

    const sanitizedCreditor = {
        ...creditorValues,
        bungaTagihan: bungaTagihan ?? 0,
        dendaTagihan: dendaTagihan ?? 0,
        NIKAtauNomorAktaPendirian:
            creditorValues.NIKAtauNomorAktaPendirian ?? undefined,
        alamat: creditorValues.alamat ?? undefined,
        email: creditorValues.email ?? undefined,
        nomorTelepon: creditorValues.nomorTelepon ?? undefined,
        alamatKorespondensi: creditorValues.alamatKorespondensi ?? undefined,
        namaKuasaHukum: creditorValues.namaKuasaHukum ?? undefined,
        emailKuasaHukum: creditorValues.emailKuasaHukum ?? undefined,
        nomorTeleponKuasaHukum:
            creditorValues.nomorTeleponKuasaHukum ?? undefined,
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
                userId={user.id}
            />
        </MainWrapper>
    )
}

export default EditCreditorPage
