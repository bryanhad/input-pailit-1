'use client'

import { useAddCreditorForm } from './form'
import CreditorForm from './form/CreditorForm'
import { editCreditor } from './form/actions'
import { CreditorFormValues } from './form/validation'

type EditCreditorFormProps = {
    defaultValues: CreditorFormValues
    creditorId?: string
    userId: string
}

function EditCreditorForm({
    defaultValues,
    creditorId,
    userId,
}: EditCreditorFormProps) {
    const form = useAddCreditorForm(defaultValues)

    return (
        <CreditorForm
            form={form}
            action={editCreditor}
            creditorId={creditorId}
            userId={userId}
        />
    )
}

export default EditCreditorForm
