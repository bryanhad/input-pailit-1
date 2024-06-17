'use client'

import { Button, ButtonProps } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { useToast } from '@/components/ui/use-toast'
import { Creditor } from '@prisma/client'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { deleteCreditor } from './actions'

type DeleteCreditorButtonProps = {
    creditorName: Creditor['nama']
    creditorId: Creditor['id']
    small?: boolean
    variant?: ButtonProps['variant']
}

function DeleteCreditorButton({
    creditorName,
    creditorId,
    small = false,
    variant='destructive'
}: DeleteCreditorButtonProps) {
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
                variant: 'destructive',
                title: 'Failed to delete creditor.',
                description: err.message || 'Something went wrong.',
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
                    variant={variant}
                    onClick={() => {
                        setIsModalOpen((prev) => !prev)
                    }}
                >
                    {small ? (
                        <Trash className="shrink-0" size={16} />
                    ) : (
                        'Delete'
                    )}
                </Button>
            }
            title={`Are you sure?`}
            desc={`Delete entry of '${creditorName}'`}
        >
            <div className="flex gap-2 w-full">
                <Button
                    onClick={() => handleApproveDelete()}
                    className="flex-1"
                    variant={'destructive'}
                >
                    Yes, delete permanently
                </Button>
                <Button
                    className="flex-1"
                    variant={'outline'}
                    onClick={() => setIsModalOpen(false)}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteCreditorButton
