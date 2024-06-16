import { mustLogin } from "@/auth/actions"
import { Button } from "@/components/ui/button"
import MainWrapper from "@/components/ui/main-wrapper"
import { Metadata } from "next"
import Link from "next/link"
import Summaries from "./_components/summary/Summaries"
import CreditorsTable from "./_components/creditors-table/CreditorsTable"
import CreditorFilterOptionsModal from "./_components/creditors-table/CreditorFilterOptionsModal"
import { CreditorFilterValues } from "./_components/creditors-table/validations"
import UserManagement from "./_components/users-table/UserManagement"
import { UserFilterValues } from "./_components/users-table/validations"
import { cn } from "@/lib/utils"
import ClearCreditorFiltersButton from "./_components/creditors-table/ClearCreditorFiltersButton"

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
        uq?: string
        urole?: string
        upage?: string
        usize?: string
    }
}

async function DashboardPage({
    searchParams: {
        q,
        claimType,
        creditorType,
        page,
        size,
        upage,
        uq,
        urole,
        usize,
    },
}: DashboardPageProps) {
    const user = await mustLogin()

    const creditorsTableFilterValues: CreditorFilterValues = {
        q,
        creditorType,
        claimType,
    }
    const currentPage = Number(page) || 1
    const tableSize = Number(size) || 10

    const usersTableFilterValues: UserFilterValues = {
        uq,
        urole,
    }
    const currentUsersTablePage = Number(upage) || 1
    const usersTableSize = Number(usize) || 3

    return (
        <MainWrapper noBackgroundAndPadding>
            <DashboardSectionTitle>
                PT. Bakso Jaya Mantab Overview
            </DashboardSectionTitle>
            <Summaries />
            <DashboardSectionTitle>User Dashboard</DashboardSectionTitle>
            <UserManagement
                filterValues={usersTableFilterValues}
                currentPage={currentUsersTablePage}
                tableSize={usersTableSize}
                currentLoggedInUserInfo={user}
            />
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <DashboardSectionTitle className="">
                    Creditor Dashboard
                </DashboardSectionTitle>
                <div className="flex gap-4 justify-between">
                    <div className="flex gap-2 sm:gap-4">
                        <CreditorFilterOptionsModal
                            defaultFilterValues={creditorsTableFilterValues}
                        />
                        <ClearCreditorFiltersButton
                            filterValues={creditorsTableFilterValues}
                        />
                    </div>
                    <Button asChild variant={"success"}>
                        <Link href={"/creditors/add"}>+ Kreditor</Link>
                    </Button>
                </div>
            </div>
            <CreditorsTable
                filterValues={creditorsTableFilterValues}
                currentPage={currentPage}
                tableSize={tableSize}
            />
        </MainWrapper>
    )
}

export default DashboardPage

function DashboardSectionTitle({
    children,
    className,
}: {
    children: string
    className?: string
}) {
    return (
        <h2 className={cn("text-3xl font-light py-2 text-center", className)}>
            {children}
        </h2>
    )
}
