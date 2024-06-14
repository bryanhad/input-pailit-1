'use client'

import { z } from 'zod'

import { Switch } from '@/components/ui/switch'
import Modal from '@/components/ui/modal'
import ModalWrapper from '@/components/modal-wrapper'
import { useToast } from '@/components/ui/use-toast'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toggleUserRole } from './actions'
import { Role } from '@/types'
import { Button } from '@/components/ui/button'
import LoadingButton from '@/components/LoadingButton'

type UserRoleToggleProps = {
    email: string
    currentRole: string
}

function UserRoleToggle({ email, currentRole }: UserRoleToggleProps) {
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const [formError, setFormError] = useState<string>()
    const [formSuccess, setFormSuccess] = useState<string>()
    const [open, setOpen] = useState(false)

    const userToBeRole = currentRole === Role.Admin ? Role.User : Role.Admin

    async function onSubmit() {
        setFormError(undefined)
        setFormSuccess(undefined)
        startTransition(async () => {
            const res = await toggleUserRole(email)
            if (res?.error) {
                setFormError(res.error.message)
                return
            }
            setFormSuccess('Success')
            toast({
                title: res.success.title,
                description: res.success.message,
            })
        })
    }

    return (
        <Modal
            open={open}
            onOpenChange={setOpen}
            buttonCustom={<Switch checked={true} className='bg-black' />}
        >
            <ModalWrapper
                title="Are you sure?"
                desc={`By confirming this action, you will update this users role to ${userToBeRole}`}
            >
                <form onSubmit={onSubmit} className="flex gap-2">
                    <LoadingButton
                        type="submit"
                        loading={isPending}
                        className="flex-1"
                    >
                        Yes, update user&apos;s role to {userToBeRole}
                    </LoadingButton>
                    <Button
                        className="flex-1"
                        variant={'outline'}
                        onClick={() => setOpen(false)}
                    >
                        Cancel
                    </Button>
                </form>
            </ModalWrapper>
        </Modal>
    )
}

export default UserRoleToggle
