import { UserInfo } from "@/app/_components/UserPopOver"
import SimplePopover from "@/components/SimplePopover"
import { cn, formatDateToLocale } from "@/lib/utils"
import { CalendarDays  } from "lucide-react"
import Link from "next/link"

export type InputorInfoProps = {
    inputorId: string
    inputorName: string | null
    inputorRole: string
    date: Date
    tip: string
    className?:string
}

function InputorInfo({
    date,
    inputorId,
    inputorName,
    inputorRole,
    tip,
    className
}: InputorInfoProps) {
    return (
        <div className={cn("space-y-1", className)}>
            <Link href={`/users/${inputorId}`}>
                <UserInfo
                    user={{
                        name: inputorName,
                        role: inputorRole,
                        image: null,
                    }}
                    className="text-sm"
                    userImageClassName="size-6 text-xs"
                />
            </Link>
            <div className="flex gap-2 items-center">
                <SimplePopover tip={tip} className="p-1 rounded-full">
                    <CalendarDays
                        className="shrink-0 text-muted-foreground"
                        size={14}
                    />
                </SimplePopover>
                <p className="text-muted-foreground text-sm">
                    {formatDateToLocale(date, 'id-ID', true)}
                </p>
            </div>
        </div>
    )
}

export default InputorInfo