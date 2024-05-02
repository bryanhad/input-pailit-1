/**
 * HOOK
 */

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { AddCreditorSchema, AddCreditorValues } from './validation'

export const useAddCreditorForm = () => {
    return useForm<AddCreditorValues>({
        resolver: zodResolver(AddCreditorSchema),
        defaultValues: {
            jenis: 'INSTANSI/PERUSAHAAN',
            nama: undefined,
            NIKAtauNomorAktaPendirian: undefined,
            alamat: undefined,
            email: undefined,
            nomorTelepon: undefined,
            korespondensi: undefined,
            totalTagihan: 0,
            sifatTagihan: 'SEPARATIS',
            alamatKuasaHukum: undefined,
            emailKuasaHukum: undefined,
            namaKuasaHukum: undefined,
            nomorTeleponKuasaHukum: undefined,
            attachments: [
                {
                    nama: 'Surat Permohonan Tagihan',
                    ready: false,
                    deskripsi: undefined,
                },
                {
                    nama: 'Fotocopy KTP / Identitas',
                    ready: false,
                    deskripsi: undefined,
                },
                {
                    nama: 'Surat Kuasa (jika dikuasakan)',
                    ready: false,
                    deskripsi: undefined,
                },
                {
                    nama: 'Fotocopy KTP Penerima Kuasa',
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
    return useFormContext<AddCreditorValues>()
}
