import { cn, formatNumber } from '@/lib/utils'

type TotalCountProps = {
    totalCreditorsCount: number
    title: string
    className?:string
    countClassName?:string
}

function TotalCount({ totalCreditorsCount, title, className, countClassName}: TotalCountProps) {
    return (
        <div className={cn("p-4 bg-white rounded-md shadow-sm flex flex-col", className)}>
            <p className="text-nowrap font-semibold text-sm text-center mb-3">{title}</p>
            <div className="flex-1 grid place-content-center">
                <p className={cn("text-4xl font-semibold", countClassName)}>
                    {formatNumber(totalCreditorsCount)}
                </p>
            </div>
        </div>
    )
}

export default TotalCount
