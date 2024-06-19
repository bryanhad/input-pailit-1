import {
    UserImageIcon,
    UserImageIconProps,
} from "@/app/_components/UserPopOver"
import MainWrapper from "@/components/ui/main-wrapper"
import { User } from "@prisma/client"
import CreditorFilterOptionsmodal from "../../dashboard/_components/creditors-table/CreditorFilterOptionsModal"
import { fetchCreditors } from "../../dashboard/_components/creditors-table/actions"
import { FetchCreditorsSearchParams } from "../../dashboard/_components/creditors-table/validations"
import CreditorsInputedList from "../components/CreditorsInputedList"
import UserDetail, { UserDetailProps } from "../components/UserDetail"
import Pagination from "./Pagination"
import ClearCreditorFiltersButton from "../../dashboard/_components/creditors-table/ClearCreditorFiltersButton"
import H2 from "@/components/ui/h2"

export type UserDetailPageSearchParams = {
    q?: string
    creditorType?: string
    claimType?: string
    page?: string
    size?: string
}

type UserDetailWithCreditorsInputedProps = {
    title: string
    currentLoggedInUserInfo: Pick<User, "role" | "id">
    userInfo: UserImageIconProps["user"] & UserDetailProps["userDetail"]
    fetchCreditorSearchParams: FetchCreditorsSearchParams
}

async function UserDetailWithCreditorsInputed({
    userInfo,
    title,
    currentLoggedInUserInfo,
    fetchCreditorSearchParams,
}: UserDetailWithCreditorsInputedProps) {
    const {
        totalDataCount,
        creditors,
        isUsingFilter,
        totalAvailablePages,
        fetchSize,
    } = await fetchCreditors({
        filterValues: fetchCreditorSearchParams,
        defaultFetchSize: 4,
        createdByUserId: userInfo.id,
    })

    return (
        <MainWrapper title={title}>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="md:flex-[1] flex justify-center items-center">
                    <UserImageIcon
                        user={userInfo}
                        className="size-32 text-4xl"
                        noNameIconSize={52}
                    />
                </div>
                <div className="relative w-full flex flex-col md:flex-[5] gap-4 border rounded-md p-4 flex-1">
                    <UserDetail
                        userDetail={userInfo}
                        currentLoggedInUserInfo={currentLoggedInUserInfo}
                    />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-2">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-end max-md:text-center">
                    <H2>Creditors Inputed</H2>
                    <p className="font-light">Count: {creditors.length}</p>
                </div>
                {creditors.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                        <ClearCreditorFiltersButton
                            filterValues={fetchCreditorSearchParams}
                        />
                        {/* TODO: MAKE FILTER MODAL HAVE CUSTOMIZABLE TITLE */}
                        <CreditorFilterOptionsmodal
                            defaultFilterValues={fetchCreditorSearchParams}
                            noCreatedByFilter
                            title="Filter Creditors"
                        />
                    </div>
                )}
            </div>
            <CreditorsInputedList
                inputedCreditors={creditors}
                isUsingFilter={isUsingFilter}
            />
            {creditors.length > 0 && (
                <Pagination
                    itemsPerPage={fetchSize}
                    totalAvailablePages={totalAvailablePages}
                    totalRowCount={totalDataCount}
                    totalRowShown={creditors.length}
                />
            )}
        </MainWrapper>
    )
}

export default UserDetailWithCreditorsInputed
