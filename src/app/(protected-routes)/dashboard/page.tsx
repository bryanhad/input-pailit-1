import { mustLogin } from '@/auth/actions'
import { Button } from '@/components/ui/button'
import MainWrapper from '@/components/ui/main-wrapper'
import { Metadata } from 'next'
import Link from 'next/link'
import Summaries from './_components/summary/Summaries'
import CreditorsTable from './_components/creditors-table/CreditorsTable'
import FilterOptionsModal from './_components/creditors-table/FilterOptionsModal'
import { CreditorFilterValues } from './_components/creditors-table/validations'
import UsersTable from './_components/users-table/UserManagement'
import { UserFilterValues } from './_components/users-table/validations'

export const metadata: Metadata = {
    title: 'Dashboard',
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
    await mustLogin()

    const filterValues: CreditorFilterValues = {
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
    const usersTableSize = Number(usize) || 10

    return (
        <MainWrapper noBackgroundAndPadding>
         
            <Summaries />
            <UsersTable
                filterValues={usersTableFilterValues}
                currentPage={currentUsersTablePage}
                tableSize={usersTableSize}
            />
            <div className="flex justify-between">
                <FilterOptionsModal defaultFilterValues={filterValues} />
                <Button asChild variant={'success'}>
                    <Link href={'/creditors/add'}>+ Kreditor</Link>
                </Button>
            </div>
            <CreditorsTable
                filterValues={filterValues}
                currentPage={currentPage}
                tableSize={tableSize}
            />
        </MainWrapper>
    )
}

export default DashboardPage
