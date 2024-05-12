import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"

function SimplePopover({
    children,
    tip,
    className,
}: {
    children: React.ReactNode
    tip: string
    className?: string
}) {
    return (
        <Popover>
            <PopoverTrigger
                className={cn("border py-[2px] px-2 rounded-md", className)}
            >
                {children}
            </PopoverTrigger>
            <PopoverContent className="text-[11px] w-max px-2 py-1">
                {tip}
            </PopoverContent>
        </Popover>
    )
}

export default SimplePopover