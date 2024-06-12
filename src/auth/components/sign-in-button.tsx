"use client"

import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { useState } from "react"
import SignInForm from "./sign-in-form"
import ModalWrapper from "@/components/modal-wrapper"
import { usePathname } from "next/navigation"

type SignInButtonProps = {
    className?:string
}

function SignInButton({className}:SignInButtonProps) {
    const pathname = usePathname()
    const [open, setOpen] = useState(false)

    if (pathname.includes('/auth')) {
        return null
    }

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
