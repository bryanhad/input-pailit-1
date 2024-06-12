"use client"

import { useAddCreditorForm } from "./form"
import CreditorForm from "./form/CreditorForm"
import { editCreditor } from "./form/actions"
import { CreditorFormValues } from "./form/validation"

type EditCreditorFormProps = {
    defaultValues: CreditorFormValues
    creditorId?: string
}

function EditCreditorForm({
    defaultValues,
    creditorId,
}: EditCreditorFormProps) {
    const form = useAddCreditorForm(defaultValues)

    return (
        <CreditorForm
            form={form}
            action={editCreditor}
            creditorId={creditorId}
        />
    )
}

export default EditCreditorForm
