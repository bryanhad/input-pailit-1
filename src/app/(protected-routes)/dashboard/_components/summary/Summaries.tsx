import Cards from "./Cards"
import DoughnutChart from "./DoughnutChart"
import HorizontalBarChart from "./HorizontalBarChart"
import TotalCount from "./TotalCount"
import { getSummariesData } from "./actions"

async function Summaries() {
    const {
        totalCountAllCreditor,
        totalClaimAllCreditor,
        creditorTypeInfoArr,
        claimTypeInfoArr,
    } = await getSummariesData()

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex-[2] flex flex-col lg:flex-row gap-4">
                    <DoughnutChart
                        title="Detail Tagihan PT Pailit (dalam Pailit)"
                        data={{ totalClaimAllCreditor, claimTypeInfoArr }}
                        className="lg:flex-[1]"
                        doughnutChartClassName="lg:max-w-[320px] xl:max-w-[400px]"
                    />
                    <div className="flex flex-col  gap-4 flex-[1] lg:flex-[3]">
                        <div className="flex flex-col gap-4 sm:flex-row-reverse lg:flex-col-reverse xl:flex-row-reverse flex-1">
                            <HorizontalBarChart
                                title="Jumlah Kreditor (berdasarkan jenisnya)"
                                data={creditorTypeInfoArr}
                                className="flex-[1]"
                            />
                            <TotalCount
                                title="Total Kreditor"
                                totalCreditorsCount={totalCountAllCreditor}
                            />
                        </div>
                        <div className="hidden xl:flex gap-4">
                            <Cards
                                claimTypeInfoArr={claimTypeInfoArr}
                                totalClaimAllCreditors={totalClaimAllCreditor}
                            />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:hidden flex-1 gap-4">
                    <Cards
                        claimTypeInfoArr={claimTypeInfoArr}
                        totalClaimAllCreditors={totalClaimAllCreditor}
                    />
                </div>
            </div>
        </>
    )
}

export default Summaries
