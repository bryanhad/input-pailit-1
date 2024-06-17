import { UserImageIcon } from '@/app/_components/UserPopOver'
import { mustLogin } from '@/auth/actions'
import MainWrapper from '@/components/ui/main-wrapper'
import React from 'react'
import UserDetail from '../components/UserDetail'
import db from '@/lib/db'
import { notFound, redirect } from 'next/navigation'
import UserDetailWithCreditorsInputed from '../components/UserDetailWithCreditorsInputed'

type UserDetailPageProps = { params: { userId: string } }

async function UserDetailPage({ params: { userId } }: UserDetailPageProps) {
    const loggedInUser = await mustLogin()

    if (userId === loggedInUser.id) {
        redirect('/users/me')
    }

    const queriedUser = await db.user.findUnique({ where: { id: userId } })

    if (!queriedUser) {
        notFound()
    }


    const inputedCreditors = await db.creditor.findMany({
        where: { userId: queriedUser.id },
        include: {
            _count: { select: { attachments: true }},
            lastUpdatedBy: { select: { name: true, image: true, role: true } },
        },
    })

    return (
        <UserDetailWithCreditorsInputed
            inputedCreditors={inputedCreditors}
            userInfo={queriedUser}
            title={`${queriedUser.name}'s Profile`}
            currentLoggedInUserInfo={loggedInUser}
        />
    )
}

export default UserDetailPage
