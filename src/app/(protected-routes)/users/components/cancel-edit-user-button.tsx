import ModalWrapper from '@/components/modal-wrapper'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { X } from 'lucide-react'

type CancelEditUserButtonProps = {
    openModal: boolean
    setOpenModal: (open: boolean) => void
    onApproveCancelEditing: () => void
    isFormDirty: boolean
}

function CancelEditUserButton({
    isFormDirty,
    onApproveCancelEditing,
    openModal,
    setOpenModal,
}: CancelEditUserButtonProps) {
    return (
        <>
            <Button
                variant={'ghost'}
                className="absolute top-0 right-0 rounded-tl-none rounded-br-none"
                type="button"
                onClick={() => {
                    if (isFormDirty) {
                        setOpenModal(true)
                        return
                    }
                    onApproveCancelEditing()
                }}
            >
                <X size={16} className="shrink-0 text-destructive" />
            </Button>
            <Modal open={openModal} onOpenChange={setOpenModal} noButtonTrigger>
                <ModalWrapper title="Cancel Editing User?">
                    <div className="flex gap-4">
                        <Button
                            className="flex-1"
                            type="button"
                            onClick={() => {
                                setOpenModal(false)
                                onApproveCancelEditing()
                            }}
                        >
                            Yes
                        </Button>
                        <Button
                            className="flex-1"
                            type="button"
                            variant={'outline'}
                            onClick={() => setOpenModal(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </ModalWrapper>
            </Modal>
        </>
    )
}

export default CancelEditUserButton
