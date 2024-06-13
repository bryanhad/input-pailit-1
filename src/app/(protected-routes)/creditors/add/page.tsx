import MainWrapper from "@/components/ui/main-wrapper"
import AddCreditorForm from "../_components/AddCreditorForm"
import { mustLogin } from "@/auth/actions"

async function AddCreditorPage() {
    const user = await mustLogin()

    return (
        <MainWrapper title="Add Creditor">
            <AddCreditorForm userId={user.id}/>
        </MainWrapper>
    )
}

export default AddCreditorPage
