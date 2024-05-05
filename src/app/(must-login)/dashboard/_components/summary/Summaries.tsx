import Cards from "./Cards"
import DoughnutChart from "./DoughnutChart"
import HorizontalBarChart from "./HorizontalBarChart"
import { getDoughnutChartData, getEachCreditorTypeCount } from "./actions"

async function Summaries() {
    const res = await getDoughnutChartData()
    const res2 = await getEachCreditorTypeCount()

    return (
        <div className="flex flex-col lg:flex-row">
            <div className="flex-1">
                <DoughnutChart data={res} />
            </div>
            <div className="flex-1 flex flex-col">
                <div className="flex-1">
                    <HorizontalBarChart data={res2} />
                </div>
                <div className="flex flex-1">
                    <Cards />
                </div>
            </div>
        </div>
    )
}

export default Summaries
