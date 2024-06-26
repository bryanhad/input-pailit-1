import H1 from "@/components/ui/h1"
import H2 from "@/components/ui/h2"
import { cn } from "@/lib/utils"

export function Section({
    children,
    title,
    className,
    useH1,
}: {
    children: React.ReactNode
    useH1?: boolean
    title: string
    className?: string
}) {
    return (
        <div className={cn("flex flex-col gap-4 w-full", className)}>
            {useH1 ? <H1>{title}</H1> : <H2>{title}</H2>}
            {children}
        </div>
    )
}
