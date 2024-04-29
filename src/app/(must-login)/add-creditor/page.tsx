import React from "react"
import AddCreditorForm from "./_form/AddCreditorForm"
import H1 from "@/components/ui/h1"

function AddCreditorPage() {
    return (
        <div>
            <H1 className='mb-4'>Add Creditor</H1>
            <AddCreditorForm />
        </div>
    )
}

export default AddCreditorPage
