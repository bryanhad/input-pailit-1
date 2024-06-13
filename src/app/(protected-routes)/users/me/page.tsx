import { mustLogin } from '@/auth/actions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import MainWrapper from '@/components/ui/main-wrapper'
import { getNameInitial } from '@/lib/utils'
import UserDetail from '../components/UserDetail'

async function MePage() {
    const user = await mustLogin()

    return (
        <MainWrapper title="User settings">
            <div className="flex flex-col md:flex-row items-center gap-10 mt-4">
                <Avatar className="size-32 mt-4 ml-4">
                    <AvatarImage src={user.image || ''} />
                    <AvatarFallback className="capitalize text-4xl">
                        {getNameInitial(user.name || 'no name')}
                    </AvatarFallback>
                </Avatar>
                <div className="relative w-full flex flex-col gap-4 border rounded-md p-4 flex-1">
                    <UserDetail currentUserRole={user.role} userDetail={user} />
                </div>
            </div>
        </MainWrapper>
    )
}

export default MePage
