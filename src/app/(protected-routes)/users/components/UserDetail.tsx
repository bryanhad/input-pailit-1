'use client'

import SimplePopover from '@/components/SimplePopover'
import UserRoleBadge from '@/components/UserRoleBadge'
import { Button } from '@/components/ui/button'
import { formatDateToLocale } from '@/lib/utils'
import { User } from '@prisma/client'
import { MailCheck, MailWarning, PencilIcon, X } from 'lucide-react'
import { useState } from 'react'
import EditUserForm from './form'
import Modal from '@/components/ui/modal'
import ModalWrapper from '@/components/modal-wrapper'

type UserDetailAndIsEditableProps = {
    currentUserRole: string
    userDetail: Pick<
        User,
        'createdAt' | 'email' | 'emailVerified' | 'image' | 'name' | 'role'
    >
}

function UserDetailAndIsEditable({ userDetail }: UserDetailAndIsEditableProps) {
    const [isEditing, setIsEditing] = useState(false)
    return (
        <>
            {/* EDIT BUTTON */}
            {!isEditing && (
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
                            <SimplePopover
                                tip={
                                    userDetail.emailVerified
                                        ? `Terverivikasi pada ${formatDateToLocale(
                                              userDetail.emailVerified
                                          )}`
                                        : 'User'
                                }
                                className="border-none"
                            >
                                {userDetail.emailVerified ? (
                                    <MailCheck
                                        className="shrink-0 text-green-400"
                                        size={22}
                                    />
                                ) : (
                                    <MailWarning
                                        className="shrink-0 text-red-400"
                                        size={22}
                                    />
                                )}
                            </SimplePopover>
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

export default UserDetailAndIsEditable

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
