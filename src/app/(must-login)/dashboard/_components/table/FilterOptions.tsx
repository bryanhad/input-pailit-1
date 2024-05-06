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
    const pageSearchParams = useSearchParams()
    const router = useRouter()
    const form = useForm<CreditorFilterValues>({
        resolver: zodResolver(creditorFilterSchema),
        defaultValues: {
            q: pageSearchParams.get("q") || "",
            claimType: pageSearchParams.get("claimType") || "",
            creditorType: pageSearchParams.get("creditorType") || "",
        },
    })

    function onSubmit({ claimType, creditorType, q }: CreditorFilterValues) {
        const searchParams = new URLSearchParams({
            // the code below is to ensure to pass the object conditionally..
            ...(q && { q: q.trim() }),
            ...(claimType && { claimType }),
            ...(creditorType && { creditorType }),
        })

        // console.log()
        // console.log(pageSearchParams.get('claimType'))
        // console.log(pageSearchParams.get('creditorType'))

        // await filterCreditors(values)
        // console.log(searchParams.toString())
        router.push(`/dashboard?${searchParams.toString()}`)
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
                                    <Input placeholder="Nama, NIK, Nomor Telepon.." {...field} />
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
                                        {/* <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select> */}

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
                    {/* <Input
                     id="q"
                     name="q"
                     defaultValue={defaultFilterValues.q}
                     placeholder="Nama, NIK, Akta Pendirian.."
                     className="w-full"
                 />
                 
                */}
                    <FormSubmitButton className="w-full">
                        Filter Creditors
                    </FormSubmitButton>
                </div>
            </form>
        </Form>
    )
}

export default FilterOptions
