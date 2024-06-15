'use client'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { capitalizeFirstLetter } from '@/lib/utils'
import { Role } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    ReadonlyURLSearchParams,
    usePathname,
    useRouter,
    useSearchParams,
} from 'next/navigation'
import { useForm } from 'react-hook-form'
import { UserFilterValues, userFilterSchema } from './validations'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

export function createUserPageURL(
    pathname: string,
    searchParams: ReadonlyURLSearchParams,
    role?: string
) {
    const params = new URLSearchParams(searchParams)
    if (role === 'All Roles') {
        params.delete('urole')
    } else {
        params.set('urole', role || '')
    }
    return `${pathname}?${params.toString()}`
}

export type UserFilterOptionsProps = {
    defaultFilterValues: UserFilterValues
}

function UserFilterOptions({ defaultFilterValues }: UserFilterOptionsProps) {
    const pageSearchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const form = useForm<UserFilterValues>({
        resolver: zodResolver(userFilterSchema),
        defaultValues: {
            uq: pageSearchParams.get('uq') || '',
            urole: pageSearchParams.get('urole') || '',
        },
    })

    function onSubmit({ uq, urole }: UserFilterValues) {
        const searchParams = new URLSearchParams({
            // the code below is to ensure to pass the object conditionally..
            ...(uq && { uq: uq.trim() }),
            ...(urole && { urole }),
        })

        router.push(`/dashboard?${searchParams.toString()}`)
    }

    function generateUsersPageUrl(selectedRole: string) {
        return createUserPageURL(pathname, pageSearchParams, selectedRole)
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    key={JSON.stringify(defaultFilterValues)}
                    className="w-full"
                >
                    <div className="flex flex-col gap-4 select-none">
                        <FormField
                            control={form.control}
                            name="uq"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            placeholder="Name or Email.."
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
            <div className="mt-2">
                <Select
                    onValueChange={(value) => {
                        router.push(generateUsersPageUrl(value), {
                            scroll: false,
                        })
                    }}
                >
                    <SelectTrigger className="h-8">
                        <SelectValue
                            placeholder={
                                defaultFilterValues.urole
                                    ? capitalizeFirstLetter(
                                          defaultFilterValues.urole
                                      )
                                    : 'All Roles'
                            }
                        />
                    </SelectTrigger>
                    <SelectContent side="top">
                        {[
                            ...(Object.values(Role) as string[]),
                            'All Roles',
                        ].map((userRoleQuery) => (
                            <SelectItem
                                key={userRoleQuery}
                                value={`${userRoleQuery}`}
                            >
                                {capitalizeFirstLetter(userRoleQuery)}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
    )
}

export default UserFilterOptions
