import { cn } from "@/lib/utils"
import { LoaderCircle } from "lucide-react"

type LoadingIndicatorProps = {
    sizeInPx?: number
    className?: string
}

function LoadingIndicator({ className, sizeInPx = 100 }: LoadingIndicatorProps) {
    return (
        <div className={className}>
            <div style={{width: `${sizeInPx}px`}} className="loading-indicatorz text-muted-foreground"></div>
        </div>
    )
}

export default LoadingIndicator
