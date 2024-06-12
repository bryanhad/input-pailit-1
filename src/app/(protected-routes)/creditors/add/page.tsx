import React from "react"
import H1 from "@/components/ui/h1"
import AddCreditorForm from "../_components/AddCreditorForm"
import MainWrapper from "@/components/ui/main-wrapper"

function AddCreditorPage() {
    return (
        <MainWrapper title="Add Creditor">
            <AddCreditorForm />
        </MainWrapper>
    )
}

export default AddCreditorPage
