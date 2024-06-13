import { UserImageIcon } from '@/app/_components/UserPopOver'
import { mustLogin } from '@/auth/actions'
import MainWrapper from '@/components/ui/main-wrapper'
import UserDetail from '../components/UserDetail'

async function MePage() {
    const user = await mustLogin()

    return (
        <MainWrapper title="User settings">
            <div className="flex flex-col md:flex-row items-center gap-10 mt-4">
                <UserImageIcon
                    user={user}
                    className="size-32 text-4xl mt-4 ml-4"
                />
                <div className="relative w-full flex flex-col gap-4 border rounded-md p-4 flex-1">
                    <UserDetail currentUserRole={user.role} userDetail={user} />
                </div>
            </div>
        </MainWrapper>
    )
}

export default MePage
