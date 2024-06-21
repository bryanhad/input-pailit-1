import Cards from './Cards'
import CreditorTypeCards from './CreditorTypeCards'
import DoughnutChart from './DoughnutChart'
import HorizontalBarChart from './HorizontalBarChart'
import NewCards from './NewCards'
import TotalCount from './TotalCount'
import { getSummariesData } from './actions'

async function Summaries() {
    const {
        totalCountAllCreditor,
        totalClaimAllCreditor,
        creditorTypesInfo,
        claimTypeInfoArr,
    } = await getSummariesData()

    return (
        <>
            <div className="flex flex-col gap-4">
                <div className="flex-[2] flex flex-col lg:flex-row gap-4">
                    <DoughnutChart
                        title="Detail Tagihan PT Pailit (dalam Pailit)"
                        data={{
                            totalClaimAllCreditor,
                            claimTypeInfoArr,
                            totalCountAllCreditor,
                        }}
                        className="lg:flex-[3]"
                        doughnutChartClassName="lg:max-w-[320px] xl:max-w-[450px]"
                    />
                    <div className="flex flex-col  gap-4 flex-[1] lg:flex-[5]">
                        <div className="">
                            <HorizontalBarChart
                                title="Jumlah Kreditor (berdasarkan jenisnya)"
                                data={{
                                    creditorTypesInfo,
                                    totalCountAllCreditor,
                                    totalClaimAllCreditor,
                                }}
                                className="flex-[1]"
                            />
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <CreditorTypeCards
                                    data={{
                                        creditorTypesInfo,
                                        totalClaimAllCreditor,
                                        totalCountAllCreditor,
                                    }}
                                />
                            </div>
                            {/* <TotalCount
                                title="Total Kreditor"
                                totalCreditorsCount={totalCountAllCreditor}
                            /> */}
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
            {/* <div className="xl:flex gap-4">
            <NewCards claimTypeInfoArr={claimTypeInfoArr} totalClaimAllCreditors={totalClaimAllCreditor}/>
            </div> */}
        </>
    )
}

export default Summaries
