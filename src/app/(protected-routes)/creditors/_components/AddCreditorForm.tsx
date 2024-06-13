'use client'

import { useAddCreditorForm } from './form'
import CreditorForm from './form/CreditorForm'
import { addCreditor } from './form/actions'

type AddCreditorFormProps = {
    userId: string
}

function AddCreditorForm({ userId }: AddCreditorFormProps) {
    const form = useAddCreditorForm()

    return <CreditorForm form={form} action={addCreditor} userId={userId} />
}

export default AddCreditorForm
