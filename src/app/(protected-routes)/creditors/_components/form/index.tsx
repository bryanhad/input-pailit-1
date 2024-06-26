/**
 * HOOK
 */

import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { AddCreditorSchema, CreditorFormValues } from "./validation"

export const useAddCreditorForm = (defaultFormValue?: CreditorFormValues) => {
    return useForm<CreditorFormValues>({
        resolver: zodResolver(AddCreditorSchema),
        defaultValues: {
            jenis: defaultFormValue?.jenis || "INSTANSI/PERUSAHAAN",
            nama: defaultFormValue?.nama || undefined,
            NIKAtauNomorAktaPendirian:
                defaultFormValue?.NIKAtauNomorAktaPendirian || undefined,
            alamat: defaultFormValue?.alamat || undefined,
            email: defaultFormValue?.email || undefined,
            nomorTelepon: defaultFormValue?.nomorTelepon || undefined,
            tagihanPokok: defaultFormValue?.tagihanPokok || 0,
            bungaTagihan: defaultFormValue?.bungaTagihan || 0,
            dendaTagihan: defaultFormValue?.dendaTagihan || 0,
            sifatTagihan: defaultFormValue?.sifatTagihan || "SEPARATIS",
            alamatKorespondensi: defaultFormValue?.alamatKorespondensi || undefined,
            emailKuasaHukum: defaultFormValue?.emailKuasaHukum || undefined,
            namaKuasaHukum: defaultFormValue?.namaKuasaHukum || undefined,
            nomorTeleponKuasaHukum:
                defaultFormValue?.nomorTeleponKuasaHukum || undefined,
            attachments: defaultFormValue?.attachments || [
                {
                    nama: "Surat Permohonan Tagihan",
                    ready: false,
                    deskripsi: undefined,
                },
                {
                    nama: "Fotocopy KTP / Identitas",
                    ready: false,
                    deskripsi: undefined,
                },
                {
                    nama: "Surat Kuasa (jika dikuasakan)",
                    ready: false,
                    deskripsi: undefined,
                },
                {
                    nama: "Fotocopy KTP Penerima Kuasa",
                    ready: false,
                    deskripsi: undefined,
                },
            ],
        },
    })
}

/**
 * Context
 */

export const FormProviderAddCreditor = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const formMethods = useAddCreditorForm()
    return <FormProvider {...formMethods}>{children}</FormProvider>
}

export const useFormContextAddCreditor = () => {
    return useFormContext<CreditorFormValues>()
}
