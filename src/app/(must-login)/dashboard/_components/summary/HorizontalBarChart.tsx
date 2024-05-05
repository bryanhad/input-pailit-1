"use client"
import { capitalizeFirstLetter } from "@/lib/utils"
import { CreditorType } from "@/types"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const options = {
    indexAxis: "y" as const,
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
            position: "right" as const,
        },
        title: {
            display: true,
            text: "Jenis Kreditor PT Pailit (dalam Pailit)",
        },
    },
    maintainAspectRatio: false,
}

const labels = [""]

type HorizontalBarChartProps = {
    data: { jenis: CreditorType; count: string }[]
}

function HorizontalBarChart({ data }: HorizontalBarChartProps) {
    const barData = {
        labels,
        datasets: [
            {
                label: capitalizeFirstLetter(CreditorType.Instansi),
                data: data
                    .filter((el) => el.jenis === CreditorType.Instansi)
                    .map((el) => el.count),
                // borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: capitalizeFirstLetter(CreditorType.Pribadi),
                data: data
                    .filter((el) => el.jenis === CreditorType.Pribadi)
                    .map((el) => el.count),
                // borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
        ],
    }

    return <Bar options={options} data={barData} className="h" />
}

export default HorizontalBarChart
