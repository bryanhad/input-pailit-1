import { Loader2 } from "lucide-react"
import { ComponentProps } from "react"
import { Button, ButtonProps } from "./ui/button"

type LoadingButtonProps = {
    loading: boolean
    loadingMessage?: string
    noLoadingMessage?: boolean
} & ButtonProps

function LoadingButton({
    loading,
    children,
    loadingMessage,
    noLoadingMessage = false,
    ...props
}: LoadingButtonProps) {
    return (
        <Button {...props} disabled={props.disabled || loading}>
            <span className="flex items-center justify-center gap-1">
                {loading && <Loader2 size={16} className="animate-spin" />}
                {loading
                    ? !noLoadingMessage     
                        ? loadingMessage || "Loading..."
                        : null
                    : children}
            </span>
        </Button>
    )
}

export default LoadingButton
