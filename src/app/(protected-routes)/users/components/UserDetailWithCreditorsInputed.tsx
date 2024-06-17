import {
    UserImageIcon,
    UserImageIconProps,
} from "@/app/_components/UserPopOver"
import MainWrapper from "@/components/ui/main-wrapper"
import CreditorsInputedList, {
    CreditorsInputedListProps,
} from "../components/CreditorsInputedList"
import UserDetail, { UserDetailProps } from "../components/UserDetail"
import { User } from "@prisma/client"

type UserDetailWithCreditorsInputedProps = {
    userInfo: UserImageIconProps["user"] & UserDetailProps["userDetail"]
    title: string
    currentLoggedInUserInfo: Pick<User, "role" | "id">
} & CreditorsInputedListProps

function UserDetailWithCreditorsInputed({
    userInfo,
    inputedCreditors,
    title,
    currentLoggedInUserInfo,
}: UserDetailWithCreditorsInputedProps) {
    return (
        <MainWrapper title={title}>
            <div className="flex flex-col md:flex-row gap-4 mt-4">
                <div className="md:flex-[1] flex justify-center items-center">
                    <UserImageIcon
                        user={userInfo}
                        className="size-32 text-4xl"
                    />
                </div>
                <div className="relative w-full flex flex-col md:flex-[5] gap-4 border rounded-md p-4 flex-1">
                    <UserDetail
                        userDetail={userInfo}
                        currentLoggedInUserInfo={currentLoggedInUserInfo}
                    />
                </div>
            </div>
            <CreditorsInputedList inputedCreditors={inputedCreditors} />
        </MainWrapper>
    )
}

export default UserDetailWithCreditorsInputed
