import { UserImageIcon } from '@/app/_components/UserPopOver'
import { mustLogin } from '@/auth/actions'
import MainWrapper from '@/components/ui/main-wrapper'
import UserDetail from '../components/UserDetail'
import db from '@/lib/db'
import CreditorCard from '../components/CreditorCard'
import H2 from '@/components/ui/h2'

async function MePage() {
    const user = await mustLogin()

    const inputedCreditors = await db.creditor.findMany({
        where: { userId: user.id },
        include: {
            _count: { select: { attachments: true } },
            lastUpdatedBy: { select: { name: true, image: true, role: true } },
        },
    })

    return (
        <MainWrapper title="User settings">
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
            <div className="space-y-2">
                <H2>Creditors Inputed</H2>
                <p className="font-light">Count: {inputedCreditors.length}</p>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {inputedCreditors.map((creditor) => (
                    <CreditorCard
                        key={creditor.id}
                        creditor={{
                            ...creditor,
                            attachment_count: creditor._count.attachments,
                        }}
                    />
                ))}
            </div>
        </MainWrapper>
    )
}

export default MePage
