import EmailStatusBadge from "@/components/EmailStatusBadge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import db from "@/lib/db"
import { formatDateToLocale, formatNumber } from "@/lib/utils"
import { Prisma, User } from "@prisma/client"
import Link from "next/link"
import TotalCount from "../summary/TotalCount"
import Pagination from "./Pagination"
import UserRoleToggle from "./UserRoleToggle"
import UserStatusToggle from "./UserStatusToggle"
import { UserFilterValues } from "./validations"

export type CurrentLoggedInUserInfo = Pick<User, "id" | "role">
export type ToBeUpdatedUserInfo = Pick<
    User,
    "name" | "email" | "isActive" | "id" | "role"
>

type UserManagementProps = {
    filterValues: UserFilterValues
    currentPage: number
    tableSize: number
    currentLoggedInUserInfo: CurrentLoggedInUserInfo
}

async function UserManagement({
    filterValues: { uq, urole },
    currentPage,
    tableSize,
    currentLoggedInUserInfo,
}: UserManagementProps) {
    const searchString = uq
        ?.split(" ")
        .filter((word) => word.length > 0)
        .join(" & ")

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
        orderBy: { id: "desc" },
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
                                    {user.name ? user.name : "-"}
                                </TableCell>
                                <TableCell className="font-semibold">
                                    <div className="flex items-center gap-1">
                                        {user.email}
                                        <EmailStatusBadge
                                            verifiedDate={user.emailVerified}
                                        />
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
