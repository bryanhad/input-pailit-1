import { formatNumber } from '@/lib/utils'

type TotalCountProps = {
    totalCreditorsCount: number
    title: string
}

function TotalCount({ totalCreditorsCount, title }: TotalCountProps) {
    return (
        <div className="p-5 bg-white rounded-md shadow-sm flex flex-col">
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
