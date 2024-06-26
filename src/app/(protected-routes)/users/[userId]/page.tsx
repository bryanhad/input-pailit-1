import { UserImageIcon } from "@/app/_components/UserPopOver"
import { mustLogin } from "@/auth/actions"
import MainWrapper from "@/components/ui/main-wrapper"
import React from "react"
import UserDetail from "../components/UserDetail"
import db from "@/lib/db"
import { notFound, redirect } from "next/navigation"
import UserDetailWithCreditorsInputed from "../components/UserDetailWithCreditorsInputed"
import { FetchCreditorsSearchParams } from "../../dashboard/_components/creditors-table/validations"

type UserDetailPageProps = {
    params: { userId: string }
    searchParams: FetchCreditorsSearchParams
}

async function UserDetailPage({
    params: { userId },
    searchParams,
}: UserDetailPageProps) {
    const loggedInUser = await mustLogin()

    if (userId === loggedInUser.id) {
        redirect("/users/me")
    }

    const queriedUser = await db.user.findUnique({ where: { id: userId } })

    if (!queriedUser) {
        notFound()
    }

    return (
        <UserDetailWithCreditorsInputed
            fetchCreditorSearchParams={searchParams}
            userInfo={queriedUser}
            title={`${queriedUser.name || queriedUser.email}'s Profile`}
            currentLoggedInUserInfo={loggedInUser}
        />
    )
}

export default UserDetailPage
