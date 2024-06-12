import MainWrapper from "@/components/ui/main-wrapper"
import AddCreditorForm from "../_components/AddCreditorForm"
import { mustLogin } from "@/auth/actions"

async function AddCreditorPage() {
    await mustLogin()

    return (
        <MainWrapper title="Add Creditor">
            <AddCreditorForm />
        </MainWrapper>
    )
}

export default AddCreditorPage
