"use client"

import LoadingButton from "@/components/LoadingButton"
import FormResponse from "@/components/form-response"
import ModalWrapper from "@/components/modal-wrapper"
import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { useToast } from "@/components/ui/use-toast"
import { useState, useTransition } from "react"
import { logout } from "../actions"
import { LogOut } from "lucide-react"

type SignOutButtonProps = {
    className?: string
}

function SignOutButton({ className }: SignOutButtonProps) {
    const { toast } = useToast()
    const [open, setOpen] = useState(false)
    const [isPending, startTransition] = useTransition()
    const [formError, setFormError] = useState<string>()
    const [formSuccess, setFormSuccess] = useState<string>()

    function onSignOutClicked() {
        setFormSuccess(undefined)
        setFormError(undefined)
        startTransition(async () => {
            const res = await logout()
            if (res?.error) {
                setFormError(res.error)
                return
            }
            setFormSuccess("Sign out successful")
            toast({
                title: "Sign out successful!",
            })
            setOpen(false)
        })
    }

    return (
        <Modal
            open={open}
            onOpenChange={setOpen}
            buttonCustom={
                <Button
                    className={className}
                    onClick={() => {
                        setFormSuccess(undefined)
                        setFormError(undefined)
                    }}
                >
                    <LogOut size={12} className="mr-2 shrink-0" />
                    Sign Out
                </Button>
            }
        >
            <ModalWrapper title="Are You Sure?">
                <div className="space-y-2">
                    <FormResponse
                        className="justify-center"
                        response={formSuccess}
                        errorMessage={formError}
                    />
                    <div className="flex w-full gap-3">
                        <LoadingButton
                            onClick={() => onSignOutClicked()}
                            loading={isPending}
                            type="button"
                            className="w-full flex-1"
                        >
                            Yes, sign me out baby
                        </LoadingButton>
                        <Button
                            className="flex-1 w-full"
                            type="button"
                            variant="outline"
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </ModalWrapper>
        </Modal>
    )
}

export default SignOutButton
