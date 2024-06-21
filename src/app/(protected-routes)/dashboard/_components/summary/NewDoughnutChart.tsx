"use client"
import { capitalizeFirstLetter, cn, formatCurrency } from "@/lib/utils"
import {
    ArcElement,
    ChartData,
    Chart as ChartJS,
    Legend,
    Tooltip,
} from "chart.js"
import { PieChart } from "lucide-react"
import { Doughnut } from "react-chartjs-2"
import { ClaimTypeInfo } from "./actions"
import { ExtendClaimType, SelectedSummaryClaimType } from "./NewSummaries"
import { ClaimType } from "@/types"

ChartJS.register(ArcElement, Tooltip, Legend)

type ClaimTypeInfoMap = {
    preferen: Pick<ClaimTypeInfo, 'creditorCount' | 'totalClaimAmount'>
    konkuren: Pick<ClaimTypeInfo, 'creditorCount' | 'totalClaimAmount'>
    separatis: Pick<ClaimTypeInfo, 'creditorCount' | 'totalClaimAmount'>
    total: Pick<ClaimTypeInfo, 'creditorCount' | 'totalClaimAmount'>
}

type NewDoughnutChartProps = {
    // data: { claimTypeInfoArr: ClaimTypeInfo[]; totalClaimAllCreditor: number }
    data: {claimTypeInfoMap: ClaimTypeInfoMap, totalClaimAllCreditor: number}
    className?: string
    title: string
    newdoughnutChartClassName?: string
    selectedSummary: string
}

function NewDoughnutChart({
    data: { claimTypeInfoMap, totalClaimAllCreditor },
    className,
    title,
    newdoughnutChartClassName,
    selectedSummary,
}: NewDoughnutChartProps) {
    let labels: string[] = []

    const konkurenLabel = capitalizeFirstLetter(ClaimType.Konkuren)
    const preferenLabel = capitalizeFirstLetter(ClaimType.Preferen)
    const separatisLabel = capitalizeFirstLetter(ClaimType.Separatis)

    switch (selectedSummary) {
        case ClaimType.Konkuren:
            labels = [konkurenLabel]
            break
        case ClaimType.Preferen:
            labels = [preferenLabel]
            break
        case ClaimType.Separatis:
            labels = [separatisLabel]
            break
        case ExtendClaimType.All:
            labels = [preferenLabel, konkurenLabel, separatisLabel]
            break
    }

    const preferenColor= "hsl(142 68% 67%)"
    const konkurenColor= "hsl(199 89% 73%)"
    const separatisColor= "hsl(351 95% 73%)"

    const dataSetsMap = {
        preferen: {
            data: [claimTypeInfoMap.preferen.totalClaimAmount],
            backgroundColor: preferenColor
        },
        konkuren: {
            data: [claimTypeInfoMap.konkuren.totalClaimAmount],
            backgroundColor: konkurenColor
        },
        separatis: {
            data: [claimTypeInfoMap.separatis.totalClaimAmount],
            backgroundColor: separatisColor
        },
        all: {
            data:[
                claimTypeInfoMap.preferen.totalClaimAmount,
                claimTypeInfoMap.konkuren.totalClaimAmount,
                claimTypeInfoMap.separatis.totalClaimAmount,
            ],
            backgroundColor: [
                preferenColor,
                konkurenColor,
                separatisColor,
            ]
        }
    }

    const data: ChartData<"doughnut"> = {
        labels,
        datasets: [
            {
                label: "Rp",
                // Array of totalClaim (Preferen, Konkuren, Separatis)
                data: dataSetsMap[selectedSummary as keyof typeof dataSetsMap].data,
                    // claimTypeInfoMap.preferen.totalClaimAmount,
                    // claimTypeInfoMap.preferen.totalClaimAmount,
                    // claimTypeInfoMap.preferen.totalClaimAmount,

                    // claimTypeInfoArr.find((el) => el.claimType === "PREFEREN")
                    //     ?.totalClaimAmount || 0,
                    // claimTypeInfoArr.find((el) => el.claimType === "KONKUREN")
                    //     ?.totalClaimAmount || 0,
                    // claimTypeInfoArr.find((el) => el.claimType === "SEPARATIS")
                    //     ?.totalClaimAmount || 0,
                // ],
                backgroundColor: dataSetsMap[selectedSummary as keyof typeof dataSetsMap].backgroundColor,
                //  [
                //     "hsl(142 68% 67%)",
                //     "hsl(199 89% 73%)",
                //     "hsl(351 95% 73%)",
                // ],
                borderWidth: 1,
            },
        ],
    }

    const options = {
        cutout: "88%",
        resizeDelay: 200,
        radius: "85%",
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    // THIS IS BAAADDD
                    label: (ctx: any) => {
                        return `${(
                            (ctx.parsed / totalClaimAllCreditor) *
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
                top: 35,
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
                    totalClaimAllCreditor,
                    "IDR"
                )}`
                // const totalCreditorsCount = "Total Creditors: " + formatNumber(totalCreditors)
                // ctx.fillText(
                //     totalCreditorsCount,
                //     chart.getDatasetMeta(0).data[0].x,
                //     chart.getDatasetMeta(0).data[0].y + 170
                // )
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
        <div
            className={cn("relative bg-white rounded-md shadow-sm", className)}
        >
            <p className="absolute font-semibold top-5 left-1/2 -translate-x-1/2 w-[80%] text-center text-sm">
                {title}
            </p>
            <div
                className={cn(
                    "relative w-[80vw] max-w-[400px] mx-auto p-2",
                    newdoughnutChartClassName
                )}
            >
                {/* <p className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-[30%] text-2xl font-bold">
                    {formatCurrency(totalClaimAllCreditor, 'IDR')}
                </p> */}
                {totalClaimAllCreditor ? (
                    <Doughnut
                        className="relative z-10"
                        options={options}
                        data={data}
                        plugins={plugins}
                    />
                ) : (
                    <div className="flex flex-col justify-center text-muted-foreground/20 items-center pt-10">
                        <PieChart className="shrink-0" size={230} />
                        <p className="font-semibold text-3xl mt-2">
                            No Data To Show
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default NewDoughnutChart
