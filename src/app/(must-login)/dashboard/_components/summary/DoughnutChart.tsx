"use client"
import { Doughnut } from "react-chartjs-2"
import {
    Chart as ChartJS,
    Tooltip,
    Legend,
    ArcElement,
    ChartData,
    CoreChartOptions,
    ElementChartOptions,
    PluginChartOptions,
    DatasetChartOptions,
    ScaleChartOptions,
    DoughnutControllerChartOptions,
} from "chart.js"
import { formatCurrency } from "@/lib/utils"

ChartJS.register(ArcElement, Tooltip, Legend)

type DoughnutChartProps = {
    data: {
        totalCreditorsClaim: string
        groupedData: number[]
        labels: ("SEPARATIS" | "PREFEREN" | "KONKUREN" | "TOTAL")[]
    }
}

function DoughnutChart({
    data: { totalCreditorsClaim, groupedData, labels },
}: DoughnutChartProps) {
    const data: ChartData<"doughnut"> = {
        labels,
        datasets: [
            {
                label: "Rp",
                data: groupedData,
                backgroundColor: [
                    "rgba(255, 99, 132, 0.4)",
                    "rgba(54, 162, 235, 0.4)",
                    "rgba(75, 192, 192, 0.4)",
                ],
                borderWidth: 1,
            },
        ],
    }

    const options: Partial<
        CoreChartOptions<"doughnut"> &
            ElementChartOptions<"doughnut"> &
            PluginChartOptions<"doughnut"> &
            DatasetChartOptions<"doughnut"> &
            ScaleChartOptions<"doughnut"> &
            DoughnutControllerChartOptions
    > = {
        cutout: "50%",
        resizeDelay: 200,
        radius: "85%",
        responsive: true
        // plugins: {
        //     legend: {
        //         display: false
        //     }
        // }
    }

    const plugins: any = [
        {
            beforeDraw: function (chart: any) {
                const { ctx, data, width, height } = chart
                ctx.save()
                // ctx.restore()
                const fontSize = (height / 230).toFixed(2)
                ctx.font = fontSize + "em sans-serif"
                ctx.textAlign = "center"
                ctx.Baseline = "middle"
                const text2 = `${formatCurrency(
                    Number(totalCreditorsClaim),
                    "IDR"
                )}`
                ctx.fillText(
                    text2,
                    chart.getDatasetMeta(0).data[0].x,
                    chart.getDatasetMeta(0).data[0].y
                )
                ctx.save()
            },
        },
    ]

    return <Doughnut options={options} data={data} plugins={plugins} />
}

export default DoughnutChart
