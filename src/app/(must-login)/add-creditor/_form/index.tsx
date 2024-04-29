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
            nama: '',
            NIKAtauNomorAktaPendirian: '',
            alamat: '',
            email: '',
            nomorTelepon: '',
            korespondensi: '',
            totalTagihan: 0,
            sifatTagihan: 'SEPARATIS',
            attachments: [
                {
                    nama: 'Surat Permohonan Tagihan',
                    ready: false,
                    deskripsi: '',
                },
                {
                    nama: 'Fotocopy KTP / Identitas',
                    ready: false,
                    deskripsi: '',
                },
                {
                    nama: 'Surat Kuasa (jika dikuasakan)',
                    ready: false,
                    deskripsi: '',
                },
                {
                    nama: 'Fotocopy KTP Penerima Kuasa',
                    ready: false,
                    deskripsi: '',
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
