import {
    UserImageIcon,
    UserImageIconProps,
} from '@/app/_components/UserPopOver'
import MainWrapper from '@/components/ui/main-wrapper'
import CreditorsInputedList, {
    CreditorsInputedListProps,
} from '../components/CreditorsInputedList'
import UserDetail, { UserDetailProps } from '../components/UserDetail'

type UserDetailWithCreditorsInputedProps = {
    user: UserImageIconProps['user'] & UserDetailProps['userDetail']
    title: string
} & CreditorsInputedListProps

function UserDetailWithCreditorsInputed({
    user,
    inputedCreditors,
    title
}: UserDetailWithCreditorsInputedProps) {
    return (
        <MainWrapper title={title}>
            <div className="flex flex-col md:flex-row items-center gap-10 mt-4">
                <UserImageIcon
                    user={user}
                    className="size-32 text-4xl mt-4 ml-4"
                />
                <div className="relative w-full flex flex-col gap-4 border rounded-md p-4 flex-1">
                    <UserDetail
                        currentUserRole={user.role}
                        userDetail={user}
                        currentUserId={user.id}
                    />
                </div>
            </div>
            <CreditorsInputedList inputedCreditors={inputedCreditors} />
        </MainWrapper>
    )
}

export default UserDetailWithCreditorsInputed
