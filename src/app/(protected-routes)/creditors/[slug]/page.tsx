import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import db from "@/lib/db"
import { capitalizeFirstLetter, cn, formatCurrency } from "@/lib/utils"
import { CreditorType } from "@/types"
import Link from "next/link"
import { notFound } from "next/navigation"
import DownloadCreditorPDFButton from "../../dashboard/_components/creditors-table/DownloadCreditorPDFButton"
import { Pencil } from "lucide-react"
import H1 from "@/components/ui/h1"
import H2 from "@/components/ui/h2"
import MainWrapper from "@/components/ui/main-wrapper"
import ClaimTypeBadge from "@/components/ClaimTypeBadge"
import { Checkbox } from "@/components/ui/checkbox"
import CreditorTypeBadge from "@/components/CreditorTypeBadge"
import { mustLogin } from "@/auth/actions"
import FieldValuePair from "@/components/FieldValuePair"
import EditCreditorButton from "../../dashboard/_components/creditors-table/EditCreditorButton"

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
                <Section title="Detail Kreditor">
                    <div className="flex flex-col gap-2">
                        <FieldValuePair
                            fieldName="Nama"
                            value={creditor.nama}
                        />
                        <FieldValuePair
                            fieldName="Jenis Kreditor"
                            value={capitalizeFirstLetter(creditor.jenis)}
                        />
                        <FieldValuePair
                            fieldName={
                                creditor.jenis === CreditorType.Instansi
                                    ? "Nomor Akta Pendirian"
                                    : "NIK"
                            }
                            value={creditor.NIKAtauNomorAktaPendirian}
                        />
                        <FieldValuePair
                            fieldName="Alamat"
                            value={creditor.alamat}
                        />
                        <FieldValuePair
                            fieldName="Email"
                            value={creditor.email}
                        />
                        <FieldValuePair
                            fieldName="Nomor Telepon"
                            value={creditor.nomorTelepon}
                        />
                        <FieldValuePair
                            fieldName="Korespondensi"
                            value={creditor.korespondensi}
                        />
                        <FieldValuePair
                            fieldName="Total Tagihan"
                            value={formatCurrency(
                                Number(creditor.totalTagihan),
                                "IDR"
                            )}
                            className="bg-black text-white border-2"
                            valueClassName="font-medium tracking-wider"
                        />
                    </div>
                </Section>
                <Section title="Kuasa Hukum">
                    <div className="flex flex-col gap-2">
                        <FieldValuePair
                            fieldName="Nama"
                            value={creditor.namaKuasaHukum}
                        />
                        <FieldValuePair
                            fieldName="Email"
                            value={creditor.emailKuasaHukum}
                        />
                        <FieldValuePair
                            fieldName="Nomor Telepon"
                            value={creditor.nomorTeleponKuasaHukum}
                        />
                        <FieldValuePair
                            fieldName="Alamat"
                            value={creditor.alamatKuasaHukum}
                        />
                    </div>
                </Section>

                <Section
                    title="Lampiran"
                    className="lg:col-span-2 overflow-auto"
                >
                    {creditor.attachments.length < 1 ? (
                        <p>Creditor doesn&apos;t have any attachments</p>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">
                                        No
                                    </TableHead>
                                    <TableHead className="w-[300px]">
                                        Nama Lampiran
                                    </TableHead>
                                    <TableHead className="w-[100px] text-center">
                                        Ready
                                    </TableHead>
                                    <TableHead>Deskripsi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {creditor.attachments.map(
                                    ({ nama, deskripsi, ready, id }, idx) => (
                                        <TableRow key={id}>
                                            <TableCell>{idx + 1}</TableCell>
                                            <TableCell className="font-medium">
                                                {nama}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-center mr-4">
                                                    <Checkbox
                                                        disabled
                                                        checked={ready}
                                                    />
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <p>
                                                    {deskripsi ? (
                                                        deskripsi
                                                    ) : (
                                                        <span className="ml-2">
                                                            -
                                                        </span>
                                                    )}
                                                </p>
                                            </TableCell>
                                        </TableRow>
                                    )
                                )}
                            </TableBody>
                        </Table>
                    )}
                </Section>
            </section>
        </MainWrapper>
    )
}

export default CreditorDetailPage

function Section({
    children,
    title,
    className,
    useH1,
}: {
    children: React.ReactNode
    useH1?: boolean
    title: string
    className?: string
}) {
    return (
        <div className={cn("flex flex-col gap-4 w-full", className)}>
            {useH1 ? <H1>{title}</H1> : <H2>{title}</H2>}
            {children}
        </div>
    )
}
