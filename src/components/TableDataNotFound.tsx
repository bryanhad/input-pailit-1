import { Database } from "lucide-react"
import { TableCell, TableRow } from "./ui/table"

export type TableDataNotFoundProps = {
    hasFilters: boolean
    tableName: string
    colSpan: number
    notForTable?: boolean
    simpleMessage?: string
}

function TableDataNotFound({
    hasFilters,
    tableName,
    colSpan,
    notForTable = false,
    simpleMessage,
}: TableDataNotFoundProps) {
    if (notForTable) {
        return (
            <div className="flex flex-col gap-2 text-gray-400 text-center items-center py-6">
                <Database size={50} className="shrink-0" />
                <p className="font-semibold text-xl">Data Not Found</p>
                <div className="flex flex-col gap-1">
                    {simpleMessage && <p>{simpleMessage}</p>}
                    {!simpleMessage && (
                        <>
                            <p>
                                {hasFilters &&
                                    `No ${tableName} match the applied filters`}
                                {!hasFilters &&
                                    `The database does not contain any ${tableName}s`}
                            </p>
                            <p>
                                {hasFilters &&
                                    "Please try using different filters"}
                                {!hasFilters && (
                                    <>
                                        {tableName === "user"
                                            ? "Only an admin can add users to the database"
                                            : `Feel free to input a new ${tableName}`}
                                    </>
                                )}
                            </p>
                        </>
                    )}
                </div>
            </div>
        )
    }

    return (
        <TableRow className="hover:bg-white">
            <TableCell colSpan={colSpan} className="hover:bg-white">
                <div className="flex flex-col gap-2 text-gray-400 text-center items-center py-6">
                    <Database size={50} className="shrink-0" />
                    <p className="font-semibold text-xl">Data Not Found</p>
                    <div className="flex flex-col gap-1">
                        <p>
                            {hasFilters &&
                                `No ${tableName} match the applied filters`}
                            {!hasFilters &&
                                `The database does not contain any ${tableName}s`}
                        </p>
                        <p>
                            {hasFilters && "Please try using different filters"}
                            {!hasFilters && (
                                <>
                                    {tableName === "user"
                                        ? "Only an admin can add users to the database"
                                        : `Feel free to input a new ${tableName}`}
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </TableCell>
        </TableRow>
    )
}

export default TableDataNotFound
