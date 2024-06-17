import { Button, ButtonProps } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type EditCreditorButtonProps = {
    slug: string
    small?: boolean
    variant?: ButtonProps['variant']
}

function EditCreditorButton({
    slug,
    small = false,
    variant
}: EditCreditorButtonProps) {
    return (
        <Button asChild className="flex gap-2" variant={variant}>
            <Link href={`/creditors/${slug}/edit`}>
                {!small && <p>Edit Creditor</p>}
                <Pencil className="shrink-0 md:pb-[1px]" size={15} />
            </Link>
        </Button>
    )
}

export default EditCreditorButton
