import { cn } from "@/lib/utils"
import { CircleCheckBig, TriangleAlert } from "lucide-react"

type FormResponseProps = {
    response?: string
    errorMessage?: string
    className?: string
}

function FormResponse({
    response,
    errorMessage,
    className,
}: FormResponseProps) {
    if (!response && !errorMessage) return null
    return (
        <div
            className={cn(
                "py-2 px-4 rounded-md bg-green-500 flex items-center gap-3 text-white",
                {
                    "bg-red-500": !!errorMessage,
                },
                className
            )}
        >
            {errorMessage ? (
                <TriangleAlert size={16} className="shrink-0" />
            ) : (
                <CircleCheckBig size={16} className="shrink-0" />
            )}
            <p>{errorMessage || response}</p>
        </div>
    )
}

export default FormResponse
