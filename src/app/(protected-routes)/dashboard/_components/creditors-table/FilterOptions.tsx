"use client"

import FormSubmitButton from "@/components/FormSubmitButton"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { CreditorFilterValues, creditorFilterSchema } from "./validations"
import { ClaimType, CreditorType } from "@/types"
import { capitalizeFirstLetter } from "@/lib/utils"
import Select from "@/components/ui/select-server-action"
import { useRouter, useSearchParams } from "next/navigation"

export type FilterOptionsProps = {
    defaultFilterValues: CreditorFilterValues
    onSubmitClicked: () => void
}

function FilterOptions({
    defaultFilterValues,
    onSubmitClicked,
}: FilterOptionsProps) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const form = useForm<CreditorFilterValues>({
        resolver: zodResolver(creditorFilterSchema),
        defaultValues: {
            q: searchParams.get("q") || "",
            claimType: searchParams.get("claimType") || "",
            creditorType: searchParams.get("creditorType") || "",
        },
    })

    function onSubmit({ claimType, creditorType, q }: CreditorFilterValues) {
        // const searchParams = new URLSearchParams({
        //     // the code below is to ensure to pass the object conditionally..
        //     ...(q && { q: q.trim() }),
        //     ...(claimType && { claimType }),
        //     ...(creditorType && { creditorType }),
        // })
        // THIS WAY THE ROUTER.PUSH ALSO INCLUDES THE PREVIOUS SEARCH QUERIES THAT ARE PRESENT ALREADY.
        // BEFORE, IT WAS DELETED.
        // for instance if there were already queries for the users table, it is replaced by the searchParams that is made above. no bueno indeed.
        const currentPageParams = new URLSearchParams(searchParams.toString())
        if (q) {
            currentPageParams.set("q", q)
        } else {
            currentPageParams.delete("q")
        }
        if (claimType) {
            currentPageParams.set("claimType", claimType)
        } else {
            currentPageParams.delete("claimType")
        }
        if (creditorType) {
            currentPageParams.set("creditorType", creditorType)
        } else {
            currentPageParams.delete("creditorType")
        }

        router.push(`/dashboard?${currentPageParams.toString()}`, {
            scroll: false,
        })

        // router.push(`/dashboard?${searchParams.toString()}`, {
        //     scroll:false
        // })
        onSubmitClicked()
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                // action={filterCreditors}
                key={JSON.stringify(defaultFilterValues)}
                className="w-full"
            >
                <div className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="q"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Nama, NIK, Nomor Telepon.."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="creditorType"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="w-full">
                                        <Select {...field}>
                                            <option value="">
                                                Any Creditor Type
                                            </option>
                                            {(
                                                Object.values(
                                                    CreditorType
                                                ) as string[]
                                            ).map((type) => (
                                                <option value={type} key={type}>
                                                    {capitalizeFirstLetter(
                                                        type
                                                    )}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="claimType"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="w-full">
                                        <Select {...field}>
                                            <option value="">
                                                Any Claim Type
                                            </option>
                                            {(
                                                Object.values(
                                                    ClaimType
                                                ) as string[]
                                            ).map((type) => (
                                                <option value={type} key={type}>
                                                    {capitalizeFirstLetter(
                                                        type
                                                    )}
                                                </option>
                                            ))}
                                        </Select>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormSubmitButton className="w-full">
                        Filter Creditors
                    </FormSubmitButton>
                </div>
            </form>
        </Form>
    )
}

export default FilterOptions
