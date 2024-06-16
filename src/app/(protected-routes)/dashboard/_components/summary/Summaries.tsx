import Cards from "./Cards"
import DoughnutChart from "./DoughnutChart"
import HorizontalBarChart from "./HorizontalBarChart"
import TotalCount from "./TotalCount"
import {
    getEachClaimTypeTotalClaims,
    getEachCreditorTypeCount,
} from "./actions"

async function Summaries() {
    const res = await getEachClaimTypeTotalClaims()
    const res2 = await getEachCreditorTypeCount()

    return (
        <div className="flex flex-col gap-4">
            <div className="flex-[2] flex flex-col lg:flex-row gap-4">
                <DoughnutChart
                    title="Detail Tagihan PT Pailit (dalam Pailit)"
                    data={res}
                    className="lg:flex-[1]"
                    doughnutChartClassName="lg:max-w-[320px] xl:max-w-[400px]"
                />
                <div className="flex flex-col  gap-4 flex-[1] lg:flex-[3]">
                    <div className="flex flex-col gap-4 sm:flex-row-reverse lg:flex-col-reverse xl:flex-row-reverse flex-1">
                        <HorizontalBarChart
                            title="Jumlah Kreditor (berdasarkan jenisnya)"
                            data={res2}
                            className="flex-[1]"
                        />
                        <TotalCount
                            title="Total Kreditor"
                            totalCreditorsCount={res.totalCreditors}
                        />
                    </div>
                    <div className="hidden xl:flex gap-4">
                        <Cards data={res} />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:hidden flex-1 gap-4">
                <Cards data={res} />
            </div>
            {/* <div className="flex-[4] flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 bg-white rounded-md shadow-sm p-5">
                        <HorizontalBarChart
                            title="Jumlah Kreditor (berdasarkan jenisnya)"
                            data={res2}
                        />
                    </div>
                </div>
            </div> */}
        </div>
    )
}

export default Summaries
