import { cn } from '@/lib/utils'

type FieldValuePairProps = {
    fieldName: string
    value: string | null
    className?: string
    valueClassName?:string
}
function FieldValuePair({ fieldName, value, className, valueClassName }: FieldValuePairProps) {
    return (
        <div
            className={cn(
                'flex gap-1 flex-col md:flex-row border rounded-md p-2',
                className
            )}
        >
            <p className="min-w-[180px] font-medium">
                {fieldName}
                <span className="ml-2 md:hidden">:</span>
            </p>
            <span className="hidden md:block">:</span>
            <p className={cn("flex-1 w-full text-sm pt-[3px]", valueClassName)}>{value || '-'}</p>
        </div>
    )
}

export default FieldValuePair
