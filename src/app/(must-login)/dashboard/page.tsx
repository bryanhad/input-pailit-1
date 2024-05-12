import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import Link from "next/link"
import Summaries from "./_components/summary/Summaries"
import DashboardTable from "./_components/table/DashboardTable"
import FilterOptions from "./_components/table/FilterOptions"
import { CreditorFilterValues } from "./_components/table/validations"
import FilterOptionsModal from "./_components/table/FilterOptionsModal"
import MainWrapper from "@/components/ui/main-wrapper"

export const metadata: Metadata = {
    title: "Dashboard",
}

type DashboardPageProps = {
    searchParams: {
        q?: string
        creditorType?: string
        claimType?: string
        page?: string
        size?: string
    }
}

async function DashboardPage({
    searchParams: { q, claimType, creditorType, page, size },
}: DashboardPageProps) {
    const filterValues: CreditorFilterValues = {
        q,
        creditorType,
        claimType,
    }
    const currentPage = Number(page) || 1
    const tableSize = Number(size) || 10

    return (
        <MainWrapper>
            <Summaries />
            <div className="flex justify-between">
                <FilterOptionsModal defaultFilterValues={filterValues} />
                <Button asChild variant={"success"}>
                    <Link href={"/creditors/add"}>+ Kreditor</Link>
                </Button>
            </div>
            <DashboardTable
                filterValues={filterValues}
                currentPage={currentPage}
                tableSize={tableSize}
            />
        </MainWrapper>
    )
}

export default DashboardPage
