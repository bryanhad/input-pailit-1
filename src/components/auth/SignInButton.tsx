'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import Modal from "../ui/modal"
import SignInForm from "./SignInForm"

function SignInButton() {
    const [open, setOpen] = useState(false)

  return (
    <Modal
        open={open}
        onOpenChange={setOpen}
        buttonCustom={
            <Button>
                Sign In
            </Button>
        }
    >
        <SignInForm onSuccess={() => setOpen(false)}/>
    </Modal>
)
}

export default SignInButton