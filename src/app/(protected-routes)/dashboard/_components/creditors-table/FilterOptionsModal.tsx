"use client"

import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { useState } from "react"
import FilterOptions from "./FilterOptions"
import { CreditorFilterValues } from "./validations"

type Props = {defaultFilterValues: CreditorFilterValues}

function FilterOptionsModal({ defaultFilterValues }: Props) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    async function handleApproveDelete() {
        setIsModalOpen(false)
    }

    return (
        // TODO: BUTTON TO CLEAR ALL FILTER
        <Modal
            centerText
            className="items-center"
            open={isModalOpen}
            onOpenChange={async () => {
                if (isModalOpen) {
                    setIsModalOpen((prev) => !prev)
                }
            }}
            buttonCustom={
                <Button
                    variant={"outline"}
                    onClick={() => {
                        setIsModalOpen((prev) => !prev)
                    }}
                >
                    Filter
                </Button>
            }
            title={`Filter Table`}
        >
            <div className="flex gap-2 w-full">
                <FilterOptions
                    defaultFilterValues={defaultFilterValues}
                    onSubmitClicked={() => setIsModalOpen(false)}
                />
            </div>
        </Modal>
    )
}

export default FilterOptionsModal
