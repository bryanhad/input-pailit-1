import React from "react"
import H1 from "@/components/ui/h1"
import AddCreditorForm from "../_components/form/AddCreditorForm"

function AddCreditorPage() {
    return (
        <div>
            <H1 className='mb-4'>Add Creditor</H1>
            <AddCreditorForm />
        </div>
    )
}

export default AddCreditorPage
