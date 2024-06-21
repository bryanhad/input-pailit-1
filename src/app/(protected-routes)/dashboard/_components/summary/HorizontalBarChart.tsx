'use client'
import CreditorTypeBadge from '@/components/CreditorTypeBadge'
import { cn, formatCurrency } from '@/lib/utils'
import { CreditorType } from '@/types'
import {
    BarElement,
    CategoryScale,
    ChartData,
    Chart as ChartJS,
    ChartOptions,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { CreditorTypesInfo } from './actions'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options: ChartOptions<'bar'> = {
    indexAxis: 'y' as const,
    // layout: {
    //         padding:50
    // },
    elements: {
        // bar: {
        //     borderWidth: 2,
        // },
    },
    responsive: true,
    resizeDelay: 200,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
            text: 'Detail Jenis Kreditor PT Pailit (dalam Pailit)',
        },
        subtitle: {
            display: false,
        },
        decimation: {
            enabled: false,
        },
        // tooltip: {
        //     enabled: false
        // }
    },
    layout: {
        // padding: {
        //     left: 10,
        //     right: 50,
        // },
    },
    maintainAspectRatio: false,
}

// const labels = ['Instansi / Perusahaan', 'Pribadi']

type HorizontalBarChartProps = {
    data: {
        creditorTypesInfo: CreditorTypesInfo
        totalCountAllCreditor: number
        totalClaimAllCreditor: number
    }
    title: string
    className?: string
}

function HorizontalBarChart({
    data,
    title,
    className,
}: HorizontalBarChartProps) {
    const barData: ChartData<'bar'> = {
        labels: [''],
        datasets: [
            {
                label: 'Instansi / Perusahaan',
                data: [
                    data.creditorTypesInfo['INSTANSI/PERUSAHAAN']
                        .creditorsCount,
                ],
                backgroundColor: 'hsl(269, 97%, 85%',
            },
            {
                label: 'Pribadi',
                data: [data.creditorTypesInfo.PRIBADI.creditorsCount],
                backgroundColor: 'hsl(31, 97%, 72%)',
            },
        ],
    }

    return (
        <div
            className={cn(
                'flex flex-col p-4 bg-white border border-input/40 rounded-md shadow-sm',
                className
            )}
        >
            <p className="text-center text-sm font-semibold">{title}</p>
            <div className="pt-2">
                <div className="flex max-sm:flex-col-reverse">
                    <div className="flex sm:flex-col sm:gap-2 sm:pb-7 sm:pt-3 max-sm:justify-evenly sm:justify-center pt-1 sm:px-1">
                        <div className="flex gap-1 items-center sm:hidden">
                            <div className="size-3 rounded-full bg-purple-300" />
                            <p className="text-sm font-light">
                                Instansi / Perusahaan
                            </p>
                        </div>
                        <div className="flex gap-1 items-center sm:hidden">
                            <div className="size-3 rounded-full bg-orange-300" />
                            <p className="text-sm font-light">Pribadi</p>
                        </div>
                        <CreditorTypeBadge
                            jenisKreditor={CreditorType.Instansi}
                            className="p-1 sm:p-2  hidden sm:block text-purple-400"
                            iconClassName="sm:w-6"
                        />
                        <CreditorTypeBadge
                            jenisKreditor={CreditorType.Pribadi}
                            className="p-1 sm:p-2 hidden sm:block text-orange-400"
                            iconClassName="sm:w-6"
                        />
                    </div>
                    <div className="flex-[1]">
                        <Bar options={options} data={barData} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HorizontalBarChart

type CreditorTypeSummaryProps = {
    creditorType: CreditorType
    data: HorizontalBarChartProps['data']
    className?: string
}

function CreditorTypeSummary({
    creditorType,
    data,
    className,
}: CreditorTypeSummaryProps) {
    const claimPercentage = (
        (data.creditorTypesInfo[creditorType].totalClaimAmount /
            data.totalClaimAllCreditor) *
        100
    ).toFixed(2)

    return (
        <div
            className={cn(
                'flex flex-col items-start gap-2 p-2 border rounded-md',
                className
            )}
        >
            <div className="flex justify-between w-full pr-2 items-end">
                <div className='flex gap-2 items-center'>
                    {creditorType === CreditorType.Instansi ? (
                        <CreditorTypeBadge
                            jenisKreditor={CreditorType.Instansi}
                            className=" text-purple-400"
                        />
                    ) : (
                        <CreditorTypeBadge
                            jenisKreditor={CreditorType.Pribadi}
                            className=" text-orange-400"
                        />
                    )}
                    <p>
                        {creditorType === CreditorType.Instansi
                            ? 'Instansi / Perusahaan'
                            : 'Pribadi'}
                    </p>
                </div>

                <p className="text-sm font-light">{`${data.creditorTypesInfo[creditorType].creditorsCount} Creditors`}</p>
            </div>
            <div className="flex gap-4 items-end w-full">
                <p className="text-2xl md:text-xl lg:text-2xl">
                    {formatCurrency(
                        data.creditorTypesInfo[creditorType].totalClaimAmount,
                        'IDR'
                    )}
                </p>
                <p className="text-xl text-green-400 font-semibold">{`${claimPercentage}%`}</p>
            </div>
        </div>
    )
}
