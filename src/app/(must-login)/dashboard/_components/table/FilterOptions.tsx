import React from "react"
import { Label } from "@/components/ui/label"
import Select from "@/components/ui/select-server-action"
import { CreditorFilterValues } from "./validations"
import { ClaimType, CreditorType } from "@/types"
import { Input } from "@/components/ui/input"
import FormSubmitButton from "@/components/FormSubmitButton"
import { filterCreditors } from "./actions"
import { capitalizeFirstLetter } from "@/lib/utils"

type FilterOptionsProps = {
    defaultFilterValues: CreditorFilterValues
}

function FilterOptions({
    defaultFilterValues,
}: FilterOptionsProps) {
    return (
        <form
            action={filterCreditors}
            key={JSON.stringify(defaultFilterValues)}
        >
            <div className="flex gap-6 flex-col">
                <Input
                    id="q"
                    name="q"
                    defaultValue={defaultFilterValues.q}
                    placeholder="Nama, NIK, Akta Pendirian.."
                />
                <div className="w-full">
                    <Select
                        id="creditorType"
                        defaultValue={defaultFilterValues.creditorType || ""}
                        name="creditorType"
                    >
                        <option value="">Any Creditor Type</option>
                        {(Object.values(CreditorType) as string[]).map(
                            (type) => (
                                <option value={type} key={type}>
                                    {capitalizeFirstLetter(type)}
                                </option>
                            )
                        )}
                    </Select>
                </div>
                <div className="w-full">
                    <Select
                        id="claimType"
                        defaultValue={defaultFilterValues.claimType || ""}
                        name="claimType"
                    >
                        <option value="">Any Claim Type</option>
                        {(Object.values(ClaimType) as string[]).map((type) => (
                            <option value={type} key={type}>
                                {capitalizeFirstLetter(type)}
                            </option>
                        ))}
                    </Select>
                </div>
                <FormSubmitButton className="w-full">
                    Filter Creditors
                </FormSubmitButton>
            </div>
        </form>
    )
}

export default FilterOptions
