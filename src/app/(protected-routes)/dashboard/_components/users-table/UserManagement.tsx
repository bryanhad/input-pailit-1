import EmailStatusBadge from "@/components/EmailStatusBadge"
import { Button } from "@/components/ui/button"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import db from "@/lib/db"
import { cn, formatDateToLocale, formatNumber } from "@/lib/utils"
import { Prisma, User } from "@prisma/client"
import Link from "next/link"
import TotalCount from "../summary/TotalCount"
import Pagination from "./Pagination"
import UserRoleToggle from "./UserRoleToggle"
import UserStatusToggle from "./UserStatusToggle"
import { UserFilterValues } from "./validations"
import { Role, UserStatus } from "@/types"
import UserFilterOptions from "./FilterOptions"
import ClearUserFilterButton from "./ClearUserFilterButton"
import TableDataNotFound from "@/components/TableDataNotFound"

export type CurrentLoggedInUserInfo = Pick<User, "id" | "role">
export type ToBeUpdatedUserInfo = Pick<
    User,
    "name" | "email" | "status" | "id" | "role" | "emailVerified"
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
        ?.split(" ")
        .filter((word) => word.length > 0)
        .join(" ")

    const searchFilter: Prisma.UserWhereInput = searchString
        ? {
              // we use "OR" filter, so that the searh filter will work on any columns that we specify
              OR: [
                  { name: { contains: searchString, mode: "insensitive" } },
                  { email: { contains: searchString, mode: "insensitive" } },
              ],
          }
        : {}

    const whereFilter: Prisma.UserWhereInput = {
        // Search with matching search filter and also urole
        AND: [
            searchFilter,
            filterValues.urole ? { role: filterValues.urole } : {},
        ],
    }

    const offset = (currentPage - 1) * tableSize

    const getUsers = db.user.findMany({
        skip: offset,
        take: tableSize,
        include: {
            _count: { select: { creditors: true } },
        },
        orderBy: { id: "desc" },
        where: whereFilter,
    })
    // const getNotVerifiedUsers = db.verificationToken.findMany()
    const getTotalDataCountByFilter = db.user.count({
        where: whereFilter,
    })
    const getVerifiedUsersCount = db.user.count({
        where: { status: { in: [UserStatus.active, UserStatus.inactive] } },
    })

    const [users, totalDataCountByFilter, totalVerifiedUsersCount] =
        await Promise.all([
            getUsers,
            getTotalDataCountByFilter,
            getVerifiedUsersCount,
        ])
    const totalPages = Math.ceil(Number(totalDataCountByFilter) / tableSize)

    return (
        <>
            <div className="flex flex-col gap-4 xl:flex-row">
                <div
                    className={cn(
                        "flex flex-col sm:flex-row xl:flex-col md:justify-between gap-4",
                        {
                            "xl:gap-2":
                                currentLoggedInUserInfo.role === Role.User,
                        }
                    )}
                >
                    <TotalCount
                        title="Verified Users Count"
                        totalCreditorsCount={totalVerifiedUsersCount}
                        className="flex-[1]"
                        countClassName="sm:text-3xl"
                    />
                    {currentLoggedInUserInfo.role === Role.Admin && (
                        <Button
                            asChild
                            variant={"success"}
                            className="hidden xl:flex"
                        >
                            <Link href="/admin/add-new-user">+ User</Link>
                        </Button>
                    )}
                    <div
                        className={cn("flex-[2] ", {
                            "grid grid-cols-2 place-content-between sm:grid-cols-3 xl:flex xl:flex-col xl:gap-3 xl:justify-start gap-4":
                                currentLoggedInUserInfo.role === Role.Admin,
                            "grid grid-cols-2 xl:grid-cols-1 gap-4 xl:flex xl:flex-col xl:gap-2":
                                currentLoggedInUserInfo.role === Role.User,
                        })}
                    >
                        <UserFilterOptions
                            currentLoggedInUserRole={
                                currentLoggedInUserInfo.role
                            }
                            defaultFilterValues={filterValues}
                        />
                        <ClearUserFilterButton
                            filterValues={filterValues}
                            className={cn("", {
                                "max-sm:order-2 ":
                                    currentLoggedInUserInfo.role === Role.Admin,
                                "col-span-2 xl:col-span-1":
                                    currentLoggedInUserInfo.role === Role.User,
                            })}
                        />
                        {currentLoggedInUserInfo.role === Role.Admin && (
                            <Button
                                asChild
                                variant={"success"}
                                className="col-span-1 sm:col-span-3 xl:hidden max-sm:order-4"
                            >
                                <Link href="/admin/add-new-user">+ User</Link>
                            </Button>
                        )}
                    </div>
                </div>

                {/* TABLE STUFFS */}
                <div className="flex-1 min-h-[318px] gap-3 flex flex-col xl:flex-[1] pb-1 rounded-md overflow-hidden">
                    {/* <div className="bg-black p-4 h-40"></div> */}
                    <div className="flex-[1] bg-white">
                        <Table
                            className={cn("bg-white", {
                                "border-b": users.length > 0,
                            })}
                        >
                            <TableHeader>
                                <TableRow className="bg-primary hover:bg-primary/90">
                                    <TableHead className="text-white text-center w-[60px]">
                                        No
                                    </TableHead>
                                    <TableHead className="text-white w-[160px]">
                                        Name
                                    </TableHead>
                                    <TableHead className="text-white w-[200px]">
                                        Email
                                    </TableHead>
                                    <TableHead className="text-white">
                                        Status
                                    </TableHead>
                                    <TableHead className="text-white">
                                        Role
                                    </TableHead>
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
                                {users.length < 1 ? (
                                    <TableDataNotFound
                                        hasFilters={
                                            !!filterValues.uq ||
                                            !!filterValues.urole
                                        }
                                        tableName="user"
                                        colSpan={8}
                                    />
                                ) : (
                                    users.map((user, idx) => (
                                        <TableRow key={user.id}>
                                            <TableCell className="text-center">
                                                {idx + 1}
                                            </TableCell>
                                            <TableCell className="font-medium w-[200px]">
                                                <div className="max-w-[155px]">
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
                                            <TableCell className="font-semibold w-[255px]">
                                                <div className="flex items-center gap-1">
                                                    <EmailStatusBadge
                                                        verifiedDate={
                                                            user.emailVerified
                                                        }
                                                    />
                                                    <div className="w-full max-w-[180px]">
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
                                                {formatDateToLocale(
                                                    user.createdAt
                                                )}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <p>
                                                    {formatNumber(
                                                        user._count.creditors
                                                    )}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-center">
                                                    <Button asChild>
                                                        <Link
                                                            href={`/users/${user.id}`}
                                                        >
                                                            View
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <Pagination
                        itemsPerPage={tableSize}
                        totalRowCount={totalDataCountByFilter}
                        totalRowShown={users.length}
                        totalAvailablePages={totalPages}
                    />
                </div>
            </div>
        </>
    )
}

export default UserManagement
