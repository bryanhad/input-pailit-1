import { capitalizeFirstLetter, cn } from '@/lib/utils'
import { Role } from '@/types'
import { Bolt, CircleUserRound } from 'lucide-react'
import SimplePopover from './SimplePopover'

type UserRoleBadgeProps = {
    role: string
    className?: string
    size?: number
    noClick?: boolean
}

function UserRoleBadge({
    role,
    className,
    size = 16,
    noClick = false,
}: UserRoleBadgeProps) {
    return (
        <SimplePopover
            className={cn(
                'rounded-full p-1 flex items-center gap-1.5 pl-2 pr-3 select-none',
                { 'pointer-events-none': noClick },
                className
            )}
            tip={`User has ${role} privilidges`}
        >
            {role === Role.Admin ? (
                <Bolt size={size} className="shrink-0" />
            ) : (
                <CircleUserRound size={size} className="shrink-0" />
            )}
            <p className="max-w-max truncate text-sm tracking-tight">{role}</p>
        </SimplePopover>
    )
}

export default UserRoleBadge
