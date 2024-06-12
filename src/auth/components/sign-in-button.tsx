"use client"

import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { useState } from "react"
import SignInForm from "./sign-in-form"
import ModalWrapper from "@/components/modal-wrapper"

type SignInButtonProps = {
    className?:string
}

function SignInButton({className}:SignInButtonProps) {
    const [open, setOpen] = useState(false)

    return (
        <Modal
            open={open}
            onOpenChange={setOpen}
            buttonCustom={<Button className={className}>Sign In</Button>}
        >
            <ModalWrapper title="Sign In">
                <SignInForm onSuccess={() => setOpen(false)} />
            </ModalWrapper>
        </Modal>
    )
}

export default SignInButton
