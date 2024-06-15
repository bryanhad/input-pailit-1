import { cn, formatNumber } from '@/lib/utils'

type TotalCountProps = {
    totalCreditorsCount: number
    title: string
    className?:string
}

function TotalCount({ totalCreditorsCount, title, className }: TotalCountProps) {
    return (
        <div className={cn("p-5 bg-white rounded-md shadow-sm flex flex-col", className)}>
            <p className="text-nowrap font-semibold text-sm text-center mb-3">{title}</p>
            <div className="flex-1 grid place-content-center">
                <p className="text-4xl font-semibold">
                    {formatNumber(totalCreditorsCount)}
                </p>
            </div>
        </div>
    )
}

export default TotalCount
