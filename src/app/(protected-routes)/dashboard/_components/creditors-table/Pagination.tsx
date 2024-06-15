"use client"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ReadonlyURLSearchParams } from "next/navigation"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type PaginationProps = {
    totalAvailablePages: number
    totalRowCount: number
    itemsPerPage: number
    totalRowShown: number
}

export const createPageURL = (
    pathname: string,
    searchParams: ReadonlyURLSearchParams,
    pageNumber: number | string,
    pageSize?: number | string
    // order?: string
) => {
    const params = new URLSearchParams(searchParams)
    params.set("page", pageNumber.toString())
    if (pageSize) {
        params.set("size", pageSize.toString())
    }
    // if (order) {
    //     params.set("order", order)
    // }
    return `${pathname}?${params.toString()}`
}

function Pagination({
    totalAvailablePages,
    totalRowCount,
    itemsPerPage,
    totalRowShown,
}: PaginationProps) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const currentPage = Number(searchParams.get("page")) || 1
    const currentPageSize = Number(searchParams.get("size")) || 10

    // createPageUrl returns the pageUrl with the search params attached
    function generatePageUrl(
        pageNumber: number | string,
        size?: number | string
    ) {
        return createPageURL(pathname, searchParams, pageNumber, size)
    }

    return (
        <div className="flex items-center justify-between px-2 my-4">
            {totalRowShown && (
                <div className="flex-[1] text-sm text-muted-foreground md:block hidden">
                    {totalRowShown} of {totalRowCount} row(s) shown.
                </div>
            )}
            <div className="flex flex-col-reverse gap-3 md:flex-row items-center justify-between flex-[1]">
                <div className="flex items-center space-x-2 flex-col md:flex-row gap-3">
                    <p className="text-sm font-medium">Rows per page</p>
                    <Select
                        onValueChange={(value) => {
                            router.push(generatePageUrl(1, value), {
                                scroll: false,
                            })
                        }}
                    >
                        <SelectTrigger className="h-8 w-[70px]">
                            <SelectValue placeholder={itemsPerPage} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[5, 10, 15].map((pageSize) => (
                                <SelectItem
                                    key={pageSize}
                                    value={`${pageSize}`}
                                >
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="md:flex hidden w-[100px] items-center justify-center text-sm font-medium">
                    Page {currentPage} of {totalAvailablePages}
                </div>
                <div className="flex items-center gap-2">
                    {/* GO TO FIRST PAGE */}
                    {/* <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        disabled={currentPage <= 1}
                    >
                        <Link href={generatePageUrl(currentPage - 1)}>
                            <span className="sr-only">Go to first page</span>
                            <DoubleArrowLeftIcon className="h-4 w-4" />
                        </Link>
                    </Button> */}
                    {/* GO TO PREV PAGE */}
                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        disabled={currentPage <= 1}
                        onClick={() =>
                            router.push(generatePageUrl(currentPage - 1), {
                                scroll: false,
                            })
                        }
                    >
                        <span className="sr-only">Go to previous page</span>
                        <ChevronLeft size={16} className="shrink-0" />
                    </Button>

                    <div className="md:hidden flex w-[100px] items-center justify-center text-sm font-medium">
                        Page {currentPage} of {totalAvailablePages}
                    </div>
                    {/* GO TO NEXT PAGE */}
                    {/* <Button
                        asChild
                        variant="outline"
                        className="h-8 w-8 p-0"
                        disabled={currentPage >= totalAvailablePages}
                    >
                        <Link href={generatePageUrl(currentPage + 1)}>
                            <span className="sr-only">Go to next page</span>
                            <ChevronRight size={16} className="shrink-0" />
                        </Link>
                    </Button> */}

                    <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        disabled={currentPage >= totalAvailablePages}
                        onClick={() =>
                            router.push(generatePageUrl(currentPage + 1), {
                                scroll: false,
                            })
                        }
                    >
                        <span className="sr-only">Go to next page</span>
                        <ChevronRight size={16} className="shrink-0" />
                    </Button>

                    {/* GO TO LAST PAGE */}
                    {/* <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        disabled={currentPage >= totalAvailablePages}
                    >
                        <Link href={generatePageUrl(currentPage + 1)}>
                            <span className="sr-only">Go to last page</span>
                            <DoubleArrowRightIcon className="h-4 w-4" />
                        </Link>
                    </Button> */}
                </div>
            </div>
        </div>
    )
}

export default Pagination
