import FieldValuePair from "@/components/FieldValuePair"
import { Section } from "./Section"
import { Creditor } from "@prisma/client"
import { capitalizeFirstLetter } from "@/lib/utils"
import { CreditorType } from "@/types"

type DetailKreditorProps = {
    creditor: Creditor
}

function DetailKreditor({ creditor }: DetailKreditorProps) {
    return (
        <Section title="Detail Kreditor">
            <div className="flex flex-col gap-2">
                <FieldValuePair fieldName="Nama" value={creditor.nama} />
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
                <FieldValuePair fieldName="Alamat" value={creditor.alamat} />
                <FieldValuePair fieldName="Email" value={creditor.email} />
                <FieldValuePair
                    fieldName="Nomor Telepon"
                    value={creditor.nomorTelepon}
                />
                <FieldValuePair
                    fieldName="Korespondensi"
                    value={creditor.korespondensi}
                />
            </div>
        </Section>
    )
}

export default DetailKreditor
