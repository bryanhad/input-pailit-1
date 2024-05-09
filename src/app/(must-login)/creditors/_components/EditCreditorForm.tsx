"use client"

import { useAddCreditorForm } from "./form"
import CreditorForm from "./form/CreditorForm"
import { addCreditor } from "./form/actions"
import { CreditorFormValues } from "./form/validation"

type EditCreditorFormProps = {
    defaultValues: CreditorFormValues
}

function EditCreditorForm({ defaultValues }: EditCreditorFormProps) {
    const form = useAddCreditorForm(defaultValues)

    return <CreditorForm form={form} title="Edit Creditor" action={addCreditor} />
}

export default EditCreditorForm
