import { UserImageIcon } from '@/app/_components/UserPopOver'
import { mustLogin } from '@/auth/actions'
import MainWrapper from '@/components/ui/main-wrapper'
import React from 'react'
import UserDetail from '../components/UserDetail'
import db from '@/lib/db'
import { notFound, redirect } from 'next/navigation'

type UserDetailPageProps = { params: { userId: string } }

async function UserDetailPage({ params: { userId } }: UserDetailPageProps) {
    const user = await mustLogin()

    if (userId === user.id) {
        redirect('/users/me')
    }

    const queriedUser = await db.user.findUnique({ where: { id: userId } })

    if (!queriedUser) {
        notFound()
    }

    return (
        <MainWrapper title={`${queriedUser.name}'s Profile`}>
            <div className="flex flex-col md:flex-row items-center gap-10 mt-4">
                <UserImageIcon
                    user={queriedUser}
                    className="size-32 text-4xl mt-4 ml-4"
                />
                <div className="relative w-full flex flex-col gap-4 border rounded-md p-4 flex-1">
                    <UserDetail
                        currentUserRole={user.role}
                        currentUserId={user.id}
                        userDetail={queriedUser}
                    />
                </div>
            </div>
        </MainWrapper>
    )
}

export default UserDetailPage
