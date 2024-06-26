import React from "react"
import { Section } from "./Section"
import FieldValuePair from "@/components/FieldValuePair"
import { Creditor } from "@prisma/client"

type KuasaHukumProps = {
    creditor: Creditor
}

function KuasaHukum({ creditor }: KuasaHukumProps) {
    return (
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
    )
}

export default KuasaHukum
