import { mustLogin } from "@/auth/actions"
import { Button } from "@/components/ui/button"
import MainWrapper from "@/components/ui/main-wrapper"
import { Metadata } from "next"
import Link from "next/link"
import Summaries from "./_components/summary/Summaries"
import DashboardTable from "./_components/table/DashboardTable"
import FilterOptionsModal from "./_components/table/FilterOptionsModal"
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
    await mustLogin()

    const filterValues: CreditorFilterValues = {
        q,
        creditorType,
        claimType,
    }
    const currentPage = Number(page) || 1
    const tableSize = Number(size) || 10

    return (
        <MainWrapper>
            <div>
                <Button asChild>
                    <Link href="/admin/add-new-user">
                        ADMIN ROUTE: Add New User
                    </Link>
                </Button>
            </div>
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
