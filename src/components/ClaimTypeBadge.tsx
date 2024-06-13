import { cn } from '@/lib/utils'
import { ClaimType } from '@/types'
import React from 'react'

type ClaimTypeBadgeProps = {
    sifatTagihan: string
    className?: string
}

function ClaimTypeBadge({ className, sifatTagihan }: ClaimTypeBadgeProps) {
    return (
        <div
            className={cn(
                {
                    'bg-separatis/5 border border-separatis text-separatis':
                        sifatTagihan === ClaimType.Separatis,
                    'bg-konkuren/5 border border-konkuren text-konkuren':
                        sifatTagihan === ClaimType.Konkuren,
                    'bg-preferen/5 border border-preferen text-preferen':
                        sifatTagihan === ClaimType.Preferen,
                },
                'py-[2px] px-3 text-sm font-semibold rounded-md flex items-center gap-1',
                className
            )}
        >
            <div
                className={cn('size-2 rounded-full self-center mt-[1px]', {
                    'bg-separatis': sifatTagihan === ClaimType.Separatis,
                    'bg-konkuren': sifatTagihan === ClaimType.Konkuren,
                    'bg-preferen': sifatTagihan === ClaimType.Preferen,
                })}
            />
            <p className="font-semibold">{sifatTagihan}</p>
        </div>
    )
}

export default ClaimTypeBadge
