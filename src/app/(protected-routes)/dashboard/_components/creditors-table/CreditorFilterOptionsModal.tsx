"use client"

import { Button } from "@/components/ui/button"
import Modal from "@/components/ui/modal"
import { useState } from "react"
import FilterOptions from "./FilterOptions"
import { CreditorFilterValues } from "./validations"
import {SlidersHorizontal} from 'lucide-react'

type Props = {defaultFilterValues: CreditorFilterValues}

function CreditorFilterOptionsmodal({ defaultFilterValues }: Props) {
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
                className="flex gap-2 items-center"
                    variant={"outline"}
                    onClick={() => {
                        setIsModalOpen((prev) => !prev)
                    }}
                >
                    <SlidersHorizontal className="shrink-0" size={16}/>
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

export default CreditorFilterOptionsmodal
