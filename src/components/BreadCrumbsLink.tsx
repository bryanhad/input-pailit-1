"use client"
import Link from "next/link"

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { usePathname } from "next/navigation"
import { Fragment } from "react"
import { capitalizeFirstLetter } from "@/lib/utils"

type PathSegment = {
    path: string
    label: string
}

function generatePathSegments(url: string): PathSegment[] {
    const segments = url.split("/").filter(Boolean) // Remove empty segments
    const result: PathSegment[] = []
    let path = ""
    for (const segment of segments) {
        path += `/${segment}`
        result.push({ path, label: segment })
    }
    return result
}

function BreadCrumbsLink() {
    const pathname = usePathname()
    const pathnameSegments = generatePathSegments(pathname)
    if (pathname !== '/dashboard' && !pathname.includes('confirmation') && !pathname.includes('on-boarding')) return (
        <div className="w-full mb-4">
        <Breadcrumb>
            <BreadcrumbList>
                {/* <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem> */}
                {pathnameSegments.map((segment) => (
                    <Fragment key={segment.label}>
                        {segment.label !== "dashboard" &&
                            segment.label !== "creditors" && (
                                <BreadcrumbSeparator />
                            )}
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link
                                    href={
                                        segment.path === "/creditors"
                                            ? "/dashboard"
                                            : segment.path
                                    }
                                >
                                    {segment.label === "creditors"
                                        ? capitalizeFirstLetter("dashboard")
                                        : capitalizeFirstLetter(segment.label)}
                                </Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
        </div>

    )
}

export default BreadCrumbsLink
