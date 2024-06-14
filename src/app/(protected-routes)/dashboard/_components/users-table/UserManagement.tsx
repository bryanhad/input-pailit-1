import EmailStatusBadge from '@/components/EmailStatusBadge'
import UserRoleBadge from '@/components/UserRoleBadge'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import db from '@/lib/db'
import { formatDateToLocale, formatNumber } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import Link from 'next/link'
import Pagination from './Pagination'
import { UserFilterValues } from './validations'
import TotalCount from '../summary/TotalCount'

type UserManagementProps = {
    filterValues: UserFilterValues
    currentPage: number
    tableSize: number
}

async function UserManagement({
    filterValues: { uq, urole },
    currentPage,
    tableSize,
}: UserManagementProps) {
    const searchString = uq
        ?.split(' ')
        .filter((word) => word.length > 0)
        .join(' & ')

    const searchFilter: Prisma.UserWhereInput = searchString
        ? {
              // we use "OR" filter, so that the searh filter will work on any columns that we specify
              OR: [
                  { name: { search: searchString } },
                  { email: { search: searchString } },
              ],
          }
        : {}

    const whereFilter: Prisma.UserWhereInput = {
        // Search with matching search filter and also urole
        AND: [searchFilter, urole ? { role: urole } : {}],
    }

    const offset = (currentPage - 1) * tableSize

    const users = await db.user.findMany({
        skip: offset,
        take: tableSize,
        include: {
            _count: { select: { creditors: true } },
        },
        orderBy: { createdAt: 'desc' },
        where: whereFilter,
    })

    const totalUsersCount = await db.user.count()

    const totalDataCountByFilter = await db.user.count({
        where: whereFilter,
    })
    const totalPages = Math.ceil(Number(totalDataCountByFilter) / tableSize)

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-4">
                <TotalCount
                    title="Total Users Count"
                    totalCreditorsCount={totalUsersCount}
                    className="flex-1"
                />
                <Button asChild>
                    <Link href="/admin/add-new-user">Add New User</Link>
                </Button>
            </div>
            <div className="flex-1 space-y-2">
                <Table className="bg-white">
                    <TableHeader>
                        <TableRow className="bg-primary hover:bg-primary/90">
                            <TableHead className="text-white w-[60px]">
                                No
                            </TableHead>
                            <TableHead className="text-white w-[160px]">
                                Name
                            </TableHead>
                            <TableHead className="text-white">Email</TableHead>
                            <TableHead className="text-white">Status</TableHead>
                            <TableHead className="text-white">Role</TableHead>
                            <TableHead className="text-white">
                                Joined At
                            </TableHead>
                            <TableHead className="text-white">
                                Creditors Input
                            </TableHead>
                            <TableHead className="text-right text-white">
                                Action
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((user, idx) => (
                            <TableRow key={user.id}>
                                <TableCell className="text-right">
                                    {idx + 1}
                                </TableCell>
                                <TableCell className="font-medium">
                                    {user.name}
                                </TableCell>
                                <TableCell className="font-semibold">
                                    <div className="flex items-center gap-1">
                                        {user.email}
                                        <EmailStatusBadge
                                            verifiedDate={user.emailVerified}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>ACTIVE</TableCell>
                                <TableCell>
                                    <UserRoleBadge role={user.role} />
                                </TableCell>
                                <TableCell>
                                    {formatDateToLocale(user.createdAt)}
                                </TableCell>
                                <TableCell>
                                    {formatNumber(user._count.creditors)}
                                </TableCell>
                                <TableCell>
                                    <div className="flex gap-2 justify-end">
                                        <Button asChild>
                                            <Link href={`/users/${user.id}`}>
                                                View
                                            </Link>
                                        </Button>
                                        <Button variant={'destructive-soft'}>
                                            Disable
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Pagination
                    itemsPerPage={tableSize}
                    totalRowCount={totalDataCountByFilter}
                    totalRowShown={users.length}
                    totalAvailablePages={totalPages}
                />
            </div>
        </div>
    )
}

export default UserManagement
