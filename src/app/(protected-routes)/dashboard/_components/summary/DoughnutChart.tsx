"use client"
import { cn, formatCurrency } from "@/lib/utils"
import {
    ArcElement,
    ChartData,
    Chart as ChartJS,
    Legend,
    Tooltip,
} from "chart.js"
import { Doughnut } from "react-chartjs-2"
import { EachClaimTypeTotalClaims } from "./actions"
import { PieChart } from "lucide-react"

ChartJS.register(ArcElement, Tooltip, Legend)

type DoughnutChartProps = {
    data: EachClaimTypeTotalClaims
    className?: string
    title: string
}

function DoughnutChart({
    data: { claimTypes, totalClaimAmount, totalCreditors },
    className,
    title
}: DoughnutChartProps) {
    const data: ChartData<"doughnut"> = {
        labels: ["Preferen", "Konkuren", "Separatis"],
        datasets: [
            {
                label: "Rp",
                // Array of totalClaim (Preferen, Konkuren, Separatis)
                data: [
                    claimTypes.find((el) => el.claimType === "PREFEREN")
                        ?.totalClaim || 0,
                    claimTypes.find((el) => el.claimType === "KONKUREN")
                        ?.totalClaim || 0,
                    claimTypes.find((el) => el.claimType === "SEPARATIS")
                        ?.totalClaim || 0,
                ],
                backgroundColor: [
                    "hsl(142 68% 67%)",
                    "hsl(199 89% 73%)",
                    "hsl(351 95% 73%)",
                ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        cutout: "85%",
        resizeDelay: 200,
        radius: "80%",
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: (ctx: any) => {
                        return `${(
                            (ctx.parsed / totalClaimAmount) *
                            100
                        ).toFixed(2)}% | ${formatCurrency(ctx.parsed, "IDR")}`
                    },
                },
            },
            legend: {
                display: false,
            },
            title: {
                display: false,
                text: "Detail Tagihan PT Pailit (dalam Pailit)",
            },
        },
        // aspectRatio: 1.5,
        layout: {
            padding: {
                top: 5,
                bottom: 5,
                right: 35,
                left: 35,
            },
        },
    }

    const plugins: any = [
        {
            beforeDraw: function (chart: any) {
                const { ctx, data, width, height } = chart
                ctx.save()
                const fontSize = (height / 270).toFixed(2)
                ctx.font = fontSize + "em sans-serif"
                ctx.textAlign = "center"
                ctx.Baseline = "middle"
                const totalClaimText = `${formatCurrency(
                    totalClaimAmount,
                    "IDR"
                )}`
                ctx.fillText(
                    totalClaimText,
                    chart.getDatasetMeta(0).data[0].x,
                    chart.getDatasetMeta(0).data[0].y
                )
                ctx.save()
            },
        },
        // https://www.youtube.com/watch?v=ussXnf3l-U0&ab_channel=ChartJS
        {
            id: "doughnutSliceLabel",
            beforeDatasetsDraw: (chart: any, args: any, plugins: any) => {
                const { ctx, data, height } = chart

                chart
                    .getDatasetMeta(0)
                    .data.forEach((dataPoint: any, index: any) => {
                        ctx.save()
                        const xCenter = chart.getDatasetMeta(0).data[index].x
                        const yCenter = chart.getDatasetMeta(0).data[index].y

                        const startAngle =
                            chart.getDatasetMeta(0).data[index].startAngle
                        const endAngle =
                            chart.getDatasetMeta(0).data[index].endAngle

                        const centerAngle = (startAngle + endAngle) / 2

                        const outerRadius =
                            chart.getDatasetMeta(0).data[index].outerRadius + 35

                        // get the x and y coordinate for our text!
                        const xCoordinate =
                            -10 + outerRadius * Math.cos(centerAngle)
                        const yCoordinate =
                            -10 + outerRadius * Math.sin(centerAngle)

                        const fontSize = (height / 500).toFixed(2)
                        ctx.font = "bold " + fontSize + "em sans-serif"

                        // ctx.font = 'bold 15px sans-serif'
                        const textWidth = ctx.measureText(
                            data.labels[index]
                        ).width
                        const centerWidth = textWidth / 2

                        // beginPath if you want to have rect.. I don't wanna tho
                        // ctx.beginPath()
                        ctx.translate(xCenter, yCenter)
                        // USE FILLRECT BELOW TO SEE THE EXACT LOCATION OF COORDINATE FOR EACH TEXT
                        // ctx.fillRect(xCoordinate,yCoordinate,10,10)

                        // ctx.fillStyle = data.datasets[0].backgroundColor[index]
                        // ctx.roundRect(xCoordinate, yCoordinate, weight, height, borderRadius)
                        // ctx.roundRect(xCoordinate, yCoordinate, textWidth, 50, 10)

                        // ctx.fill()

                        ctx.fillStyle = data.datasets[0].backgroundColor[index]
                        ctx.textAlign = "center"
                        ctx.textBaseline = "middle"
                        ctx.fillText(
                            data.labels[index],
                            xCoordinate + centerWidth / 3,
                            yCoordinate + 5
                        )

                        ctx.restore()
                    })
            },
        },
    ]

    return (
        <div className="relative">   
            <p className="absolute font-semibold top-5 left-1/2 -translate-x-1/2 w-[80%] text-center text-sm">{title}</p>
            <div className={cn("relative w-[80vw] max-w-[400px]", className)}>
                {/* <p className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] text-2xl font-bold">
                    {formatCurrency(totalClaimAmount, 'IDR')}
                </p> */}
                {totalClaimAmount ? (
                    <Doughnut
                        className="relative z-10"
                        options={options}
                        data={data}
                        plugins={plugins}
                    />
                ) : (
                    <div className="flex flex-col justify-center text-muted-foreground/20 items-center">
                        <PieChart className="shrink-0" size={250} />
                        <p className="font-semibold text-3xl">No Data To Show</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default DoughnutChart
