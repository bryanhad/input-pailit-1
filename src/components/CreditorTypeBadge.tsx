import React from 'react'
import SimplePopover from './SimplePopover'
import { Building2, UserRound } from 'lucide-react'
import { CreditorType } from '@/types'
import { capitalizeFirstLetter, cn } from '@/lib/utils'

type CreditorTypeBadgeProps = {
    jenisKreditor: string
    className?: string
    size?: number
    iconClassName?: string
}

function CreditorTypeBadge({
    jenisKreditor,
    className,
    size = 16,
    iconClassName,
}: CreditorTypeBadgeProps) {
    return (
        <SimplePopover
            className={cn(
                'rounded-full p-1',
                // {
                //     'text-purple-400':
                //         jenisKreditor === CreditorType.Instansi,
                //     'text-orange-400':
                //         jenisKreditor === CreditorType.Pribadi,
                // },
                className
            )}
            tip={capitalizeFirstLetter(jenisKreditor)}
        >
            {jenisKreditor === CreditorType.Instansi && (
                <Building2
                    size={!iconClassName ? size : undefined}
                    className={cn('shrink-0', iconClassName)}
                />
            )}
            {jenisKreditor === CreditorType.Pribadi && (
                <UserRound
                    size={!iconClassName ? size : undefined}
                    className={cn('shrink-0', iconClassName)}
                />
            )}
        </SimplePopover>
    )
}

export default CreditorTypeBadge
