import { mustLogin } from '@/auth/actions'
import db from '@/lib/db'
import UserDetailWithCreditorsInputed from '../components/UserDetailWithCreditorsInputed'

async function MePage() {
    const loggedInUser = await mustLogin()

    const inputedCreditors = await db.creditor.findMany({
        where: { userId: loggedInUser.id },
        include: {
            _count: { select: { attachments: true }},
            lastUpdatedBy: { select: { name: true, image: true, role: true } },
        },
    })

    return (
        <UserDetailWithCreditorsInputed
            inputedCreditors={inputedCreditors}
            currentLoggedInUserInfo={loggedInUser}
            userInfo={loggedInUser}
            title='User Settings'
        />
    )
}

export default MePage
