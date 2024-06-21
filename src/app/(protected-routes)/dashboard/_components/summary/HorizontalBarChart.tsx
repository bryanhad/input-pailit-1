'use client'
import { capitalizeFirstLetter, cn } from '@/lib/utils'
import { CreditorType } from '@/types'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { CreditorTypeInfo } from './actions'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
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
            position: 'bottom' as const,
        },
        title: {
            display: false,
            text: 'Detail Jenis Kreditor PT Pailit (dalam Pailit)',
        },
    },
    layout: {
        // padding: {
        //     left: 10,
        //     right: 50,
        // },
    },
    maintainAspectRatio: false,
}

const labels = ['']

type HorizontalBarChartProps = {
    data: CreditorTypeInfo[]
    title: string
    className?:string
}

function HorizontalBarChart({ data, title, className }: HorizontalBarChartProps) {
    const barData = {
        labels,
        datasets: [
            {
                label: capitalizeFirstLetter(CreditorType.Instansi),
                data: data
                    .filter((el) => el.creditorType === CreditorType.Instansi)
                    .map((el) => el.creditorCount),
                // borderColor: "rgb(255, 99, 132)",
                backgroundColor: 'hsl(46 97% 77%)',
            },
            {
                label: capitalizeFirstLetter(CreditorType.Pribadi),
                data: data
                    .filter((el) => el.creditorType === CreditorType.Pribadi)
                    .map((el) => el.creditorCount),
                // borderColor: "rgb(53, 162, 235)",
                backgroundColor: 'hsl(269 97% 90%)',
            },
        ],
    }

    return (
        <div className={cn("flex flex-col p-4 bg-white rounded-md shadow-sm", className)}>
            <p className="text-center text-sm font-semibold">{title}</p>
            <div>
                <Bar options={options} data={barData} className="h" />
            </div>
        </div>
    )
}

export default HorizontalBarChart
