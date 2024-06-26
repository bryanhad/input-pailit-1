import { cn } from '@/lib/utils'

type FieldValuePairProps = {
    fieldName: string
    value: string | null
    className?: string
    valueClassName?:string
    fieldClassName?:string
}
function FieldValuePair({ fieldName, value, className, valueClassName, fieldClassName }: FieldValuePairProps) {
    return (
        <div
            className={cn(
                'flex gap-1 flex-col md:flex-row border rounded-md',
                className
            )}
        >
            <p className={cn("min-w-[160px] font-medium pl-2 max-md:pt-2 md:py-2", fieldClassName)}>
                {fieldName}
                <span className="ml-2 md:hidden">:</span>
            </p>
            <span className="hidden md:block self-center">:</span>
            <p className={cn("flex-1 w-full text-sm pt-[3px] px-2 max-md:pb-2 md:py-2 self-center break-all", valueClassName)}>{value || '-'}</p>
        </div>
    )
}

export default FieldValuePair
