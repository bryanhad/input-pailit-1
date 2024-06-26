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
            <p className={cn("min-w-[180px] font-medium pl-2 py-2", fieldClassName)}>
                {fieldName}
                <span className="ml-2 md:hidden">:</span>
            </p>
            <span className="hidden md:block self-center">:</span>
            <p className={cn("flex-1 w-full text-sm pt-[3px] pr-2 self-center", valueClassName)}>{value || '-'}</p>
        </div>
    )
}

export default FieldValuePair
