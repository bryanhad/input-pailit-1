import { Button } from "@/components/ui/button"

import db from "@/lib/db"
import { capitalizeFirstLetter, cn, formatCurrency } from "@/lib/utils"
import { CreditorType } from "@/types"
import Link from "next/link"
import { notFound } from "next/navigation"
import DownloadCreditorPDFButton from "../../dashboard/_components/creditors-table/DownloadCreditorPDFButton"
import { Pencil, PlusCircle } from "lucide-react"
import H1 from "@/components/ui/h1"
import H2 from "@/components/ui/h2"
import MainWrapper from "@/components/ui/main-wrapper"
import ClaimTypeBadge from "@/components/ClaimTypeBadge"
import { Checkbox } from "@/components/ui/checkbox"
import CreditorTypeBadge from "@/components/CreditorTypeBadge"
import { mustLogin } from "@/auth/actions"
import FieldValuePair from "@/components/FieldValuePair"
import EditCreditorButton from "../../dashboard/_components/creditors-table/EditCreditorButton"
import SimplePopover from "@/components/SimplePopover"
import DetailKreditor from "./_components/DetailKreditor"
import KuasaHukum from "./_components/KuasaHukum"
import TagihanKreditor from "./_components/TagihanKreditor"
import LampiranKreditor from "./_components/LampiranKreditor"

type CreditorDetailPageProps = { params: { slug: string } }

async function CreditorDetailPage({
    params: { slug },
}: CreditorDetailPageProps) {
    await mustLogin()

    const creditor = await db.creditor.findUnique({
        where: { slug },
        include: { attachments: true },
    })
    if (!creditor) {
        notFound()
    }
    return (
        <MainWrapper
            titleIcon={
                <CreditorTypeBadge
                    size={26}
                    className="p-2 border-2 border-slate-600"
                    jenisKreditor={creditor.jenis}
                />
            }
            title={creditor.nama}
            titleClassName="max-md:text-start"
        >
            {/* <p className="font-light">ID: {creditor.id}</p> */}
            <div className="flex flex-col gap-4 items-start sm:flex-row sm:justify-between sm:gap-6">
                <div className="flex flex-col gap-4 items-start">
                    <div className="flex gap-2">
                        <p>Sifat Tagihan:</p>
                        <ClaimTypeBadge sifatTagihan={creditor.sifatTagihan} />
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <EditCreditorButton slug={slug} />
                    <DownloadCreditorPDFButton id={creditor.id} />
                </div>
            </div>
            <section className="grid lg:grid-cols-2 gap-6 mt-2">
                <div>
                    <DetailKreditor creditor={creditor} />
                    <KuasaHukum creditor={creditor} />
                </div>
                <div className="grid">
                    <TagihanKreditor creditor={creditor} />
                    <LampiranKreditor creditor={creditor} />
                </div>
            </section>
        </MainWrapper>
    )
}

export default CreditorDetailPage
