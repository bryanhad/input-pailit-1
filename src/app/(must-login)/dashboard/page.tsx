import { Button } from "@/components/ui/button"
import { Metadata } from "next"
import Link from "next/link"
import Summaries from "./_components/summary/Summaries"
import DashboardTable from "./_components/table/DashboardTable"
import FilterOptions from "./_components/table/FilterOptions"
import { CreditorFilterValues } from "./_components/table/validations"

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
        <div className="flex flex-col gap-4 bg-white px-4">
            <Summaries/>
            <Button asChild variant={'success'}>
                <Link href={"/add-creditor"}>+ Kreditor</Link>
            </Button>
            <FilterOptions defaultFilterValues={filterValues} />
            <DashboardTable
                filterValues={filterValues}
                currentPage={currentPage}
                tableSize={tableSize}
            />
        </div>
    )
}

export default DashboardPage
