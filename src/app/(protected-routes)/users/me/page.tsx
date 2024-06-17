import { mustLogin } from "@/auth/actions"
import { FetchCreditorsSearchParams } from "../../dashboard/_components/creditors-table/validations"
import UserDetailWithCreditorsInputed from "../components/UserDetailWithCreditorsInputed"

type MePageProps = {
    searchParams: FetchCreditorsSearchParams
}

async function MePage({ searchParams }: MePageProps) {
    const loggedInUser = await mustLogin()

    return (
        <UserDetailWithCreditorsInputed
            fetchCreditorSearchParams={searchParams}
            currentLoggedInUserInfo={loggedInUser}
            userInfo={loggedInUser}
            title="User Settings"
        />
    )
}

export default MePage
