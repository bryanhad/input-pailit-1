import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

type ModalProps = {
    centerText?: boolean
    children: React.ReactNode
    title?: string
    desc?: string
    open?: boolean
    onOpenChange?: (open: boolean) => void
    className?: string
    disableDefaultCloseButton?: boolean
} & (
    | { buttonText: string; buttonCustom?: never }
    | {
          buttonCustom: React.ReactNode
          buttonText?: never
      }
      | {
        buttonText?: never; buttonCustom?: never; noButtonTrigger:boolean
      }
)

function Modal({
    centerText = false,
    open,
    onOpenChange,
    children,
    buttonCustom,
    buttonText,
    title,
    desc,
    className,
    disableDefaultCloseButton,
}: ModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            {buttonCustom && (
                <DialogTrigger asChild>{buttonCustom}</DialogTrigger>
            )}
            {buttonText && (
                <DialogTrigger asChild>
                    <Button variant={'outline'}>{buttonText}</Button>
                </DialogTrigger>
            )}
            <DialogContent
                disableDefaultCloseButton={disableDefaultCloseButton}
                className={cn('sm:max-w-md', className)}
            >
                {(title || desc) && (
                    <DialogHeader>
                        <DialogTitle
                            className={cn({ 'text-center': centerText })}
                        >
                            {title}
                        </DialogTitle>
                        {desc && (
                            <DialogDescription
                                className={cn({ 'text-center': centerText })}
                            >
                                {desc}
                            </DialogDescription>
                        )}
                    </DialogHeader>
                )}
                <div className="flex items-center space-x-2">{children}</div>
            </DialogContent>
        </Dialog>
    )
}

export default Modal
