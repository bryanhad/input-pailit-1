"use client"

import LoadingButton from "@/components/LoadingButton"
import UserRoleBadge from "@/components/UserRoleBadge"
import FormResponse from "@/components/form-response"
import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { useToast } from "@/components/ui/use-toast"
import { Role } from "@/types"
import { useEffect, useState, useTransition } from "react"
import { CurrentLoggedInUserInfo, ToBeUpdatedUserInfo } from "./UserManagement"
import { toggleUserRole } from "./actions"

type UserRoleToggleProps = {
    toBeUpdatedUserInfo: ToBeUpdatedUserInfo
    currentLoggedInUserInfo: CurrentLoggedInUserInfo
}

function UserRoleToggle({
    toBeUpdatedUserInfo,
    currentLoggedInUserInfo,
}: UserRoleToggleProps) {
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const [formError, setFormError] = useState<string>()
    const [formSuccess, setFormSuccess] = useState<string>()
    const [open, setOpen] = useState(false)

    useEffect(() => {
        setFormError(undefined)
        setFormSuccess(undefined)
    }, [open])

    const [userRole, setUserRole] = useState(toBeUpdatedUserInfo.role)

    const toBeRole = userRole === Role.Admin ? Role.User : Role.Admin

    async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setFormError(undefined)
        setFormSuccess(undefined)
        startTransition(async () => {
            const res = await toggleUserRole(
                toBeUpdatedUserInfo.email,
                toBeRole
            )
            if (res?.error) {
                setFormError(res.error.message)
                return
            }
            setFormSuccess(`Successfully updated user role to ${toBeRole}`)
            toast({
                title: res.success.title,
                description: res.success.message,
            })
            setUserRole(toBeRole)
            setOpen(false)
            setFormError(undefined)
            setFormSuccess(undefined)
        })
    }

    if (
        // if current logged in user has USER role
        // OR if the user is the same as the one who is logged in:
        currentLoggedInUserInfo.role === Role.User ||
        currentLoggedInUserInfo.id === toBeUpdatedUserInfo.id ||
        !toBeUpdatedUserInfo.name
    ) {
        return <UserRoleBadge role={userRole} className="cursor-not-allowed" />
    }

    return (
        <Modal
            open={open}
            onOpenChange={setOpen}
            buttonCustom={
                <div>
                    <UserRoleBadge
                        role={userRole}
                        className="hover:cursor-pointer"
                    />
                </div>
            }
            title={`Change user '${toBeUpdatedUserInfo.name}' role to '${toBeRole}'?`}
            desc={`By confirming, this user will have ${toBeRole.toLowerCase()} privilidges`}
            centerText
        >
            <div className="space-y-1 w-full">
                <FormResponse response={formSuccess} errorMessage={formError} />
                <form onSubmit={onSubmit} className="flex gap-2">
                    <LoadingButton type="submit" loading={isPending}>
                        Yes, change this user into {toBeRole}
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

export default UserRoleToggle
