'use client'

import LoadingButton from '@/components/LoadingButton'
import FormResponse from '@/components/form-response'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { capitalizeFirstLetter, cn } from '@/lib/utils'
import { Role, UserStatus } from '@/types'
import { useEffect, useState, useTransition } from 'react'
import { CurrentLoggedInUserInfo, ToBeUpdatedUserInfo } from './UserManagement'
import { toggleUserActiveStatus } from './actions'
import SimplePopover from '@/components/SimplePopover'

type UserStatusToggleProps = {
    toBeUpdatedUserInfo: ToBeUpdatedUserInfo
    currentLoggedInUserInfo: CurrentLoggedInUserInfo
}

function UserStatusToggle({
    toBeUpdatedUserInfo,
    currentLoggedInUserInfo,
}: UserStatusToggleProps) {
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const [formError, setFormError] = useState<string>()
    const [formSuccess, setFormSuccess] = useState<string>()
    const [open, setOpen] = useState(false)

    console.log(toBeUpdatedUserInfo.status)

    const [userStatus, setUserStatus] = useState(toBeUpdatedUserInfo.status)

    // if I didn't do this, When I tried to paginate through the table, the state of the userStatus is not updating!
    // so this does the trick I guess..
    // when the user paginate, it fetches a new set of toBeUpdatedUserInfo, and then this useEffect would fire and update the userStatus state!
    // I think it is something to do with the behaviour of router.push() that I use to paginate, not updating the state of my components.. which can be a good thing or a bad thing.. the bad thing is that I have to do this workaround ahahahah(?)
    useEffect(() => {
        setUserStatus(toBeUpdatedUserInfo.status)
    }, [toBeUpdatedUserInfo.status])

    useEffect(() => {
        setFormError(undefined)
        setFormSuccess(undefined)
    }, [open])

    const action = userStatus === UserStatus.active ? 'deactivate' : 'activate'

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setFormError(undefined)
        setFormSuccess(undefined)
        startTransition(async () => {
            const res = await toggleUserActiveStatus(toBeUpdatedUserInfo.email)
            if (res?.error) {
                setFormError(res.error.message)
                return
            }
            setFormSuccess('Successfully updated user status')
            toast({
                title: res.success.title,
                description: res.success.message,
            })
            setUserStatus((prev) => {
                return prev === UserStatus.active
                    ? UserStatus.inactive
                    : UserStatus.active
            })
            setOpen(false)
            setFormError(undefined)
            setFormSuccess(undefined)
        })
    }

    if (toBeUpdatedUserInfo.status === UserStatus.notVerified) {
        return (
            <SimplePopover
                className=" h-6 w-11 shrink-0 bg-red-500 rounded-full p-0"
                tip={
                    <p className="text-center">
                        User has not clicked
                        <br />
                        the invitation email
                    </p>
                }
            >
                <div className="size-5 rounded-full bg-white mx-auto" />
            </SimplePopover>
        )
    }

    if (toBeUpdatedUserInfo.status === UserStatus.onBoarding) {
        return (
            <SimplePopover
                className=" h-6 w-11 shrink-0 bg-amber-300 rounded-full p-0"
                tip={
                    <p className="text-center">
                        User has not finished
                        <br />
                        setting up their account
                    </p>
                }
            >
                <div className="size-5 rounded-full bg-white mx-auto" />
            </SimplePopover>
        )
    }

    if (
        // if current logged in user has USER role
        // OR if the user is the same as the one who is logged in:
        currentLoggedInUserInfo.role === Role.User ||
        currentLoggedInUserInfo.id === toBeUpdatedUserInfo.id
    ) {
        console.log(userStatus)
        return (
            <SimplePopover
                className={cn(
                    'inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background relative',
                    {
                        'bg-blue-500 ': userStatus === UserStatus.active,
                        'bg-slate-200': userStatus === UserStatus.inactive,
                        'cursor-not-allowed':
                            currentLoggedInUserInfo.id ===
                                toBeUpdatedUserInfo.id &&
                            currentLoggedInUserInfo.role === Role.Admin,
                    }
                )}
                tip={userStatus}
            >
                <div
                    className={cn(
                        'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform absolute left-0',
                        {
                            'translate-x-5': userStatus === UserStatus.active,
                            'translate-x-0': userStatus === UserStatus.inactive,
                        }
                    )}
                />
            </SimplePopover>
        )
    }

    return (
        <Modal
            open={open}
            onOpenChange={setOpen}
            buttonCustom={
                <Switch
                    checked={userStatus === UserStatus.active}
                    className={`data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-slate-200 ${
                        userStatus === UserStatus.active
                            ? 'bg-blue-500'
                            : 'bg-slate-200'
                    }`}
                />
            }
            title={`${capitalizeFirstLetter(action)} user '${
                toBeUpdatedUserInfo.name
            }'?`}
            desc={`By ${action.slice(0, -1)}ing this user, this user ${
                userStatus === UserStatus.active
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
                        variant={
                            userStatus === UserStatus.active
                                ? 'destructive'
                                : 'default'
                        }
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
