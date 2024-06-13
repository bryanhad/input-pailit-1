import Cards from './Cards'
import DoughnutChart from './DoughnutChart'
import HorizontalBarChart from './HorizontalBarChart'
import TotalCount from './TotalCount'
import {
    getEachClaimTypeTotalClaims,
    getEachCreditorTypeCount,
} from './actions'

async function Summaries() {
    const res = await getEachClaimTypeTotalClaims()
    const res2 = await getEachCreditorTypeCount()

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-[2] flex items-center justify-center bg-white rounded-md shadow-sm">
                <DoughnutChart
                    title="Detail Tagihan PT Pailit (dalam Pailit)"
                    data={res}
                    className="p-2"
                />
            </div>
            <div className="flex-[4] flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <TotalCount
                        title="Total Kreditor"
                        totalCreditorsCount={res.totalCreditors}
                    />
                    <div className="flex-1 bg-white rounded-md shadow-sm p-5">
                        <HorizontalBarChart
                            title="Jumlah Kreditor (berdasarkan jenisnya)"
                            data={res2}
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex-1 gap-4">
                    <Cards data={res} />
                </div>
            </div>
        </div>
    )
}

export default Summaries
