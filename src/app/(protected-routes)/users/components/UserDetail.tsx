'use client'

import SimplePopover from '@/components/SimplePopover'
import UserRoleBadge from '@/components/UserRoleBadge'
import { Button } from '@/components/ui/button'
import { formatDateToLocale } from '@/lib/utils'
import { Role } from '@/types'
import { User } from '@prisma/client'
import { MailCheck, MailWarning, PencilIcon } from 'lucide-react'
import { useState } from 'react'
import EditUserForm from './form'
import EmailStatusBadge from '@/components/EmailStatusBadge'

export type UserDetailProps = {
    currentUserRole: string
    currentUserId: string
    userDetail: Pick<
        User,
        | 'createdAt'
        | 'email'
        | 'emailVerified'
        | 'image'
        | 'name'
        | 'role'
        | 'id'
    >
}

function UserDetail({
    userDetail,
    currentUserRole,
    currentUserId,
}: UserDetailProps) {
    const [isEditing, setIsEditing] = useState(false)
    return (
        <>
            {/* EDIT BUTTON */}
            {!isEditing &&
                (currentUserRole === Role.Admin ||
                    currentUserId === userDetail.id) && (
                    <Button
                        variant={'ghost'}
                        className="absolute top-0 right-0 rounded-tl-none rounded-br-none"
                        type="button"
                        onClick={() => setIsEditing((prev) => !prev)}
                    >
                        <PencilIcon size={16} className="shrink-0" />
                    </Button>
                )}
            {/* FIELDS */}
            {isEditing ? (
                <EditUserForm
                    setIsEditing={setIsEditing}
                    userDetail={userDetail}
                    // onApproveCancelEditing={() => setIsEditing(false)}
                />
            ) : (
                <UserFieldValuePair
                    fieldName="Name"
                    value={userDetail.name || undefined}
                />
            )}
            <div className="flex">
                <UserFieldValuePair
                    fieldName="Email"
                    value={
                        <div className="flex gap-1">
                            <p className="text-sm pt-[4px]">
                                {userDetail.email}
                            </p>
                            <EmailStatusBadge
                                verifiedDate={userDetail.emailVerified}
                            />
                        </div>
                    }
                />
            </div>
            <UserFieldValuePair
                fieldName="Role"
                value={
                    <UserRoleBadge
                        className="max-w-max mt-[3px]"
                        role={userDetail.role}
                    />
                }
            />
            <UserFieldValuePair
                fieldName="Joined At"
                value={formatDateToLocale(userDetail.createdAt)}
            />
        </>
    )
}

export default UserDetail

type UserFieldValuePairProps = {
    fieldName: string
    value?: React.ReactNode
}

function UserFieldValuePair({ fieldName, value }: UserFieldValuePairProps) {
    return (
        <div className="flex gap-1 flex-col sm:flex-row sm:items-center">
            <p className="md:min-w-[180px] font-medium">
                {fieldName}
                <span className="ml-2 sm:hidden">:</span>
            </p>
            <span className="hidden sm:block">:</span>
            {typeof value === 'string' ? (
                <p className="flex-1 w-full text-sm pt-[3px]">{value || '-'}</p>
            ) : (
                value
            )}
        </div>
    )
}
