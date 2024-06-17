"use client"

import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { capitalizeFirstLetter, cn, sanitizeInput } from "@/lib/utils"
import { Role } from "@/types"
import {
    ReadonlyURLSearchParams,
    useRouter,
    useSearchParams,
} from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { UserFilterValues } from "./validations"

export function createUserPageURL(
    pathname: string,
    searchParams: ReadonlyURLSearchParams,
    role?: string
) {
    const params = new URLSearchParams(searchParams)
    if (role === "Any Roles") {
        params.delete("urole")
    } else {
        params.set("urole", role || "")
    }
    return `${pathname}?${params.toString()}`
}

export type UserFilterOptionsProps = {
    defaultFilterValues: UserFilterValues
    currentLoggedInUserRole: string
}

function UserFilterOptions({
    defaultFilterValues,
    currentLoggedInUserRole,
}: UserFilterOptionsProps) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const searchBoxRef = useRef<HTMLInputElement>(null)
    const isFirstLoadRef = useRef(true)
    // Don't ask on why I did the below.. It just clicks to me to use this work around with a boolean flag to make sure to only focus on the searhcBox if the change of the URL is caused by the searchBox and not any other component!
    const isSearchBoxEnteredFlag = useRef(false)
    const [searchValue, setSearchValue] = useState(defaultFilterValues.uq || "")

    // const [userTableQuery, setUserTableQuery] = useState(defaultFilterValues.uq)
    // const [userTableRole, setUserTableRole] = useState(
    //     defaultFilterValues.urole || 'Any Role'
    // )

    // console.log({ userTableQuery, userTableRole })

    // const form = useForm<UserFilterValues>({
    //     resolver: zodResolver(userFilterSchema),
    //     defaultValues: {
    //         uq: searchParams.get("uq") || "",
    //         urole: searchParams.get("urole") || "Any Role",
    //     },
    // })

    useEffect(() => {
        if (isFirstLoadRef.current) {
            isFirstLoadRef.current = false
        } else if (searchBoxRef.current && isSearchBoxEnteredFlag.current) {
            searchBoxRef.current.focus()
            isSearchBoxEnteredFlag.current = false
        } else {
            if (!defaultFilterValues.uq && searchBoxRef.current) {
                setSearchValue("")
            }
        }
    }, [isSearchBoxEnteredFlag, defaultFilterValues])

    function onSubmit({ uq, urole }: UserFilterValues) {
        const currentPageParams = new URLSearchParams(searchParams.toString())
        if (uq) {
            currentPageParams.set("uq", uq.trim())
        } else {
            currentPageParams.delete("uq")
        }
        if (urole && urole !== "Any Role") {
            currentPageParams.set("urole", urole)
        } else {
            currentPageParams.delete("urole")
        }

        router.push(`/dashboard?${currentPageParams.toString()}`, {
            scroll: false,
        })
        isSearchBoxEnteredFlag.current = false
    }

    // function generateUsersPageUrl(selectedRole: string) {
    //     return createUserPageURL(pathname, searchParams, selectedRole)
    // }

    function myOnSubmit({ uq, urole }: UserFilterValues) {
        const currentPageParams = new URLSearchParams(searchParams.toString())
        if (uq) {
            currentPageParams.set("uq", uq.trim())
        } else {
            currentPageParams.delete("uq")
        }
        if (urole && urole !== "Any Role") {
            currentPageParams.set("urole", urole)
        } else {
            currentPageParams.delete("urole")
        }
        if (searchParams.get("upage")) {
            currentPageParams.delete("upage")
        }

        router.push(`/dashboard?${currentPageParams.toString()}`, {
            scroll: false,
        })
    }

    return (
        <>
            <Input
                className={cn({
                    "max-sm:order-1": currentLoggedInUserRole === Role.Admin,
                })}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        if (searchBoxRef.current) {
                            const sanitizedInput = sanitizeInput(
                                searchBoxRef.current.value
                            )
                            myOnSubmit({
                                uq: sanitizedInput,
                                urole: defaultFilterValues.urole,
                            })
                            isSearchBoxEnteredFlag.current = true
                        }
                    }
                }}
                placeholder="Name or Email.."
                ref={searchBoxRef}
            />
            <Select
                onValueChange={(selectedRole) => {
                    myOnSubmit({
                        urole: selectedRole,
                        uq: defaultFilterValues.uq,
                    })
                }}
                value={defaultFilterValues.urole || "Any Role"}
            >
                <SelectTrigger
                    className={cn({
                        "max-sm:order-3":
                            currentLoggedInUserRole === Role.Admin,
                        "":
                            currentLoggedInUserRole === Role.User,
                    })}
                >
                    <SelectValue placeholder="Select any role" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Any Role">Any Role</SelectItem>
                    {(Object.values(Role) as string[]).map((userRoleQuery) => (
                        <SelectItem
                            key={userRoleQuery}
                            value={`${userRoleQuery}`}
                        >
                            {capitalizeFirstLetter(userRoleQuery)}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </>
    )
}

export default UserFilterOptions
