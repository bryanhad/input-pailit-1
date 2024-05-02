"use client"

import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import React, { useState } from "react"

type Props = {
    creditorName: string
    creditorId: string
}

function DeleteButton({ creditorName, creditorId }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <Modal
        centerText
            className="items-center"
            open={isModalOpen}
            onOpenChange={async () => {
                if (isModalOpen) {
                    setIsModalOpen((prev) => !prev)
                }
            }}
            buttonCustom={
                <Button
                    variant={"destructive"}
                    onClick={() => {
                        setIsModalOpen((prev) => !prev)
                    }}
                >
                    Delete
                </Button>
            }
            title={`Are you sure?`}
            desc={`Delete entry of '${creditorName}'`}
        >
            <div className="flex gap-2 w-full">
                <Button className="flex-1" variant={"destructive"}>Yes, delete permanently</Button>
                <Button
                    className="flex-1" variant={"outline"}
                    onClick={() => setIsModalOpen(false)}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteButton