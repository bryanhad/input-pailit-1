import AddNewUserForm from "@/auth/components/add-new-user-form"
import MainWrapper from "@/components/ui/main-wrapper"
import React from "react"
import AddNewUserDescription from "./form-description"
import { mustLogin } from "@/auth/actions"

async function AddNewUserPage() {
    await mustLogin()

    return (
        <MainWrapper title="Add New User">
            <>
                <AddNewUserDescription />
                <AddNewUserForm />
            </>
        </MainWrapper>
    )
}

export default AddNewUserPage
