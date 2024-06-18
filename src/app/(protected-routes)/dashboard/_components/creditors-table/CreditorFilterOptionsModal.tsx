"use client"

import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { useState } from "react"
import FilterOptions from "./FilterOptions"
import { CreditorFilterValues } from "./validations"
import { SlidersHorizontal } from "lucide-react"

type CreditorFilterOptionsModalProps = {
    defaultFilterValues: CreditorFilterValues
    noCreatedByFilter?: boolean
    title:string
}

function CreditorFilterOptionsmodal({
    defaultFilterValues,
    noCreatedByFilter = false,
    title
}: CreditorFilterOptionsModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
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
                    className="flex gap-2 items-center"
                    variant={"outline-bold"}
                    onClick={() => {
                        setIsModalOpen((prev) => !prev)
                    }}
                >
                    <SlidersHorizontal className="shrink-0" size={16} />
                </Button>
            }
            title={title}
        >
            <div className="flex gap-2 w-full">
                <FilterOptions
                    defaultFilterValues={defaultFilterValues}
                    onSubmitClicked={() => setIsModalOpen(false)}
                    noCreatedByFilter={noCreatedByFilter}
                />
            </div>
        </Modal>
    )
}

export default CreditorFilterOptionsmodal
