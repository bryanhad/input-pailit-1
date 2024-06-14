'use client'

import LoadingButton from '@/components/LoadingButton'
import ModalWrapper from '@/components/modal-wrapper'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { capitalizeFirstLetter, cn } from '@/lib/utils'
import { useEffect, useState, useTransition } from 'react'
import { toggleUserActiveStatus } from './actions'
import { Role } from '@/types'
import FormResponse from '@/components/form-response'
import { User } from '@prisma/client'

type UserStatusToggleProps = {
    user: Pick<User, 'name' | 'email' | 'isActive'>
    currentLoggedInUserRole: string
}

function UserStatusToggle({
    user,
    currentLoggedInUserRole,
}: UserStatusToggleProps) {
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const [formError, setFormError] = useState<string>()
    const [formSuccess, setFormSuccess] = useState<string>()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setFormError(undefined)
        setFormSuccess(undefined)
    }, [open])

    const [userActiveStatus, setUserActiveStatus] = useState(user.isActive)

    const action = userActiveStatus ? 'deactivate' : 'activate'

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setFormError(undefined)
        setFormSuccess(undefined)
        startTransition(async () => {
            const res = await toggleUserActiveStatus(user.email)
            if (res?.error) {
                setFormError(res.error.message)
                return
            }
            setFormSuccess('Successfully updated user status')
            toast({
                title: res.success.title,
                description: res.success.message,
            })
            setUserActiveStatus((prev) => !prev)
            setOpen(false)
            setFormError(undefined)
            setFormSuccess(undefined)
        })
    }

    if (currentLoggedInUserRole === Role.User) {
        return (
            <Switch
                checked={userActiveStatus}
                className={
                    'data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-slate-200 cursor-not-allowed'
                }
            />
        )
    }

    return (
        <Modal
            open={open}
            onOpenChange={setOpen}
            buttonCustom={
                <Switch
                    checked={userActiveStatus}
                    className={
                        'data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-slate-200'
                    }
                />
            }
            title={`${capitalizeFirstLetter(action)} user '${user.name}'?`}
            desc={`By ${action.slice(0, -1)}ing this user, this user ${
                userActiveStatus
                    ? `won't be able to sign in.`
                    : `will be able to sign in again.`
            }`}
            centerText
        >
            <div className="space-y-1 w-full">
                <FormResponse response={formSuccess} errorMessage={formError} />
                <form onSubmit={onSubmit} className="flex gap-2">
                    <LoadingButton
                        type="submit"
                        loading={isPending}
                        variant={userActiveStatus ? 'destructive' : 'default'}
                    >
                        Yes, {action} this user
                    </LoadingButton>
                    <Button
                        type="button"
                        className="flex-1"
                        variant={'outline'}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                </form>
            </div>
        </Modal>
    )
}

export default UserStatusToggle
