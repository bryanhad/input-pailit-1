import { mustLogin } from '@/auth/actions'
import db from '@/lib/db'
import UserDetailWithCreditorsInputed from '../components/UserDetailWithCreditorsInputed'

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
        <UserDetailWithCreditorsInputed
            inputedCreditors={inputedCreditors}
            user={user}
            title='User Settings'
        />
    )
}

export default MePage
