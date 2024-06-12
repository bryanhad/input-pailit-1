import Cards from './Cards'
import DoughnutChart from './DoughnutChart'
import HorizontalBarChart from './HorizontalBarChart'
import {
    getEachClaimTypeTotalClaims,
    getEachCreditorTypeCount,
} from './actions'

async function Summaries() {
    const res = await getEachClaimTypeTotalClaims()
    const res2 = await getEachCreditorTypeCount()

    return (
        <div className="flex flex-col md:flex-row">
            <div className="flex-[2] flex items-center justify-center">
                <DoughnutChart data={res} className='p-2'/>
            </div>
            <div className="flex-[4] flex flex-col gap-4">
                <div className="flex-1">
                    <HorizontalBarChart data={res2} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex-1">
                    <Cards data={res} />
                </div>
            </div>
        </div>
    )
}

export default Summaries
