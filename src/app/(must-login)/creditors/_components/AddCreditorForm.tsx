"use client"

import { useAddCreditorForm } from "./form"
import CreditorForm from "./form/CreditorForm"
import { addCreditor } from "./form/actions"

function AddCreditorForm() {
    const form = useAddCreditorForm()

    return <CreditorForm form={form} title="Add Creditor" action={addCreditor}/>
}

export default AddCreditorForm
