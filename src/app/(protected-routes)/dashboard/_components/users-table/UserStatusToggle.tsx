"use client"

import LoadingButton from "@/components/LoadingButton"
import FormResponse from "@/components/form-response"
import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { capitalizeFirstLetter } from "@/lib/utils"
import { Role } from "@/types"
import { useEffect, useState, useTransition } from "react"
import { CurrentLoggedInUserInfo, ToBeUpdatedUserInfo } from "./UserManagement"
import { toggleUserActiveStatus } from "./actions"
import SimplePopover from "@/components/SimplePopover"

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

    useEffect(() => {
        setFormError(undefined)
        setFormSuccess(undefined)
    }, [open])

    const [userActiveStatus, setUserActiveStatus] = useState(
        toBeUpdatedUserInfo.isActive
    )

    const action = userActiveStatus ? "deactivate" : "activate"

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
            setFormSuccess("Successfully updated user status")
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

    if (!toBeUpdatedUserInfo.emailVerified) {
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

    if (!toBeUpdatedUserInfo.name) {
        return (
            <SimplePopover
                className=" h-6 w-11 shrink-0 bg-amber-300 rounded-full"
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
        return (
            <Switch
                checked={userActiveStatus}
                className={`data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-slate-200 cursor-not-allowed ${
                    userActiveStatus ? "bg-blue-500" : "bg-slate-200"
                }`}
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
                    className={`data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-slate-200 ${
                        userActiveStatus ? "bg-blue-500" : "bg-slate-200"
                    }`}
                />
            }
            title={`${capitalizeFirstLetter(action)} user '${
                toBeUpdatedUserInfo.name
            }'?`}
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
                        variant={userActiveStatus ? "destructive" : "default"}
                    >
                        Yes, {action} this user
                    </LoadingButton>
                    <Button
                        type="button"
                        className="flex-1"
                        variant={"outline"}
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
