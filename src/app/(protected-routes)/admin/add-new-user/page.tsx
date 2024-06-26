import AddNewUserForm from "@/auth/components/add-new-user-form"
import MainWrapper from "@/components/ui/main-wrapper"
import React from "react"
import AddNewUserDescription from "./form-description"
import { mustLogin } from "@/auth/actions"
import { Role } from "@/types"
import { redirect } from "next/navigation"

async function AddNewUserPage() {
    const user = await mustLogin()

    if (user.role !== Role.Admin) {
        redirect('/dashboard')
    }

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
