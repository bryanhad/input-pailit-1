"use client"

import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import React, { useState } from "react"
import { deleteCreditor } from "./actions"
import { useToast } from "@/components/ui/use-toast"
import { Creditor } from "@prisma/client"

type Props = {
    creditorName: Creditor['nama']
    creditorId: Creditor['id']
}

function DeleteButton({ creditorName, creditorId }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const { toast } = useToast()

    async function handleApproveDelete() {
        try {
            await deleteCreditor(creditorId)
            toast({
                title: `Successfully deleted creditor '${creditorName}'.`,
            })
        } catch (err: any) {
            toast({
                variant: "destructive",
                title: "Failed to delete creditor.",
                description: err.message || "Something went wrong.",
            })
        } finally {
            setIsModalOpen(false)
        }
    }

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
                <Button
                    onClick={() => handleApproveDelete()}
                    className="flex-1"
                    variant={"destructive"}
                >
                    Yes, delete permanently
                </Button>
                <Button
                    className="flex-1"
                    variant={"outline"}
                    onClick={() => setIsModalOpen(false)}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteButton
