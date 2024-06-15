import EmailStatusBadge from '@/components/EmailStatusBadge'
import { Button } from '@/components/ui/button'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import db from '@/lib/db'
import { formatDateToLocale, formatNumber } from '@/lib/utils'
import { Prisma, User } from '@prisma/client'
import Link from 'next/link'
import TotalCount from '../summary/TotalCount'
import Pagination from './Pagination'
import UserRoleToggle from './UserRoleToggle'
import UserStatusToggle from './UserStatusToggle'
import { UserFilterValues } from './validations'
import { UserStatus } from '@/types'
import UserFilterOptions from './FilterOptions'

export type CurrentLoggedInUserInfo = Pick<User, 'id' | 'role'>
export type ToBeUpdatedUserInfo = Pick<
    User,
    'name' | 'email' | 'status' | 'id' | 'role' | 'emailVerified'
>

type UserManagementProps = {
    filterValues: UserFilterValues
    currentPage: number
    tableSize: number
    currentLoggedInUserInfo: CurrentLoggedInUserInfo
}

async function UserManagement({
    filterValues,
    currentPage,
    tableSize,
    currentLoggedInUserInfo,
}: UserManagementProps) {
    const searchString = filterValues.uq
        ?.split(' ')
        .filter((word) => word.length > 0)
        .join(' ')

    const searchFilter: Prisma.UserWhereInput = searchString
        ? {
              // we use "OR" filter, so that the searh filter will work on any columns that we specify
              OR: [
                  { name: { contains: searchString, mode: 'insensitive' } },
                  { email: { contains: searchString, mode: 'insensitive' } },
              ],
          }
        : {}

    const whereFilter: Prisma.UserWhereInput = {
        // Search with matching search filter and also urole
        AND: [searchFilter, filterValues.urole ? { role: filterValues.urole } : {}],
    }

    const offset = (currentPage - 1) * tableSize

    const getUsers = db.user.findMany({
        skip: offset,
        take: tableSize,
        include: {
            _count: { select: { creditors: true } },
        },
        orderBy: { id: 'desc' },
        where: whereFilter,
    })
    // const getNotVerifiedUsers = db.verificationToken.findMany()
    const getTotalDataCountByFilter = db.user.count({
        where: whereFilter,
    })
    const getVerifiedUsersCount = db.user.count({
        where: { status: { in: [UserStatus.active, UserStatus.inactive] } },
    })

    const [
        users,
        // notVerifiedUsers,
        totalDataCountByFilter,
        totalVerifiedUsersCount,
    ] = await Promise.all([
        getUsers,
        // getNotVerifiedUsers,
        getTotalDataCountByFilter,
        getVerifiedUsersCount,
    ])
    const totalPages = Math.ceil(Number(totalDataCountByFilter) / tableSize)

    // TODO: REMOVE COMMENT
    // const users: typeof verifiedUsers = [
    //     // DONT JUDGE ME :D
    //     ...notVerifiedUsers.map((el) => {
    //         const returnValue: (typeof verifiedUsers)[0] = {
    //             email: el.email,
    //             _count: { creditors: 0 },
    //             createdAt: el.createdAt,
    //             emailVerified: null,
    //             id: 'null',
    //             image: null,
    //             isActive: false,
    //             name: null,
    //             password: null,
    //             role: 'USER',
    //             updatedAt: el.createdAt,
    //         }
    //         return returnValue
    //     }),
    //     ...verifiedUsers,
    // ]

    return (
        <div className="flex gap-4">
            <div className="flex flex-col gap-4">
                <TotalCount
                    title="Verified Users Count"
                    totalCreditorsCount={totalVerifiedUsersCount}
                    className="flex-1"
                />
                <UserFilterOptions
                    defaultFilterValues={filterValues}
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
                            <TableHead className="text-white w-[200px]">
                                Email
                            </TableHead>
                            <TableHead className="text-white">Status</TableHead>
                            <TableHead className="text-white">Role</TableHead>
                            <TableHead className="text-white">
                                Joined At
                            </TableHead>
                            <TableHead className="text-white text-center">
                                Creditors Input
                            </TableHead>
                            <TableHead className="text-white text-center">
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
                                    <div className="max-w-[160px]">
                                        {user.name ? (
                                            <p className="max-w-max truncate">
                                                {user.name}
                                            </p>
                                        ) : (
                                            <p className="font-light">
                                                Not filled yet
                                            </p>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="font-semibold">
                                    <div className="flex items-center gap-1">
                                        <EmailStatusBadge
                                            verifiedDate={user.emailVerified}
                                        />
                                        <div className="max-w-[200px]">
                                            <p className="max-w-max truncate">
                                                {user.email}
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <UserStatusToggle
                                        toBeUpdatedUserInfo={user}
                                        currentLoggedInUserInfo={
                                            currentLoggedInUserInfo
                                        }
                                    />
                                </TableCell>
                                <TableCell>
                                    <UserRoleToggle
                                        currentLoggedInUserInfo={
                                            currentLoggedInUserInfo
                                        }
                                        toBeUpdatedUserInfo={user}
                                    />
                                </TableCell>
                                <TableCell>
                                    {formatDateToLocale(user.createdAt)}
                                </TableCell>
                                <TableCell className="text-center">
                                    <p>{formatNumber(user._count.creditors)}</p>
                                </TableCell>
                                <TableCell>
                                    <div className="flex justify-center">
                                        <Button asChild>
                                            <Link href={`/users/${user.id}`}>
                                                View
                                            </Link>
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
