/**
 * HOOK
 */

import { zodResolver } from "@hookform/resolvers/zod"
import React from "react"
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { AddCreditorSchema, AddCreditorValues } from "./validation"



export const useAddCreditorForm = () => {
    return useForm<AddCreditorValues>({
        resolver: zodResolver(AddCreditorSchema),
        defaultValues: {
            name: "",
            address: "",
            email: "",
            phoneNumber: "",
            attachments: [
                {
                    attachmentName: "Surat Permohonan Tagihan",
                    attachmentFile: undefined,
                    attachmentDescription: "",
                },
                {
                    attachmentName: "Fotocopy KTP / Identitas",
                    attachmentFile: undefined,
                    attachmentDescription: "",
                },
                {
                    attachmentName: "Surat Kuasa (jika dikuasakan)",
                    attachmentFile: undefined,
                    attachmentDescription: "",
                },
                {
                    attachmentName: "Fotocopy KTP Penerima Kuasa",
                    attachmentFile: undefined,
                    attachmentDescription: "",
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