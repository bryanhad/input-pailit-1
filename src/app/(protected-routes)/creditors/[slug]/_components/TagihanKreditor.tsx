import FieldValuePair from "@/components/FieldValuePair"
import SimplePopover from "@/components/SimplePopover"
import { formatCurrency } from "@/lib/utils"
import { PlusCircle } from "lucide-react"
import React from "react"
import { Section } from "./Section"
import { Creditor } from "@prisma/client"

type TagihanKreditorProps = {
    creditor: Creditor
}

function TagihanKreditor({ creditor }: TagihanKreditorProps) {
    return (
        <Section title="Detail Tagihan Kreditor">
            <div className="space-y-2">
                <FieldValuePair
                    fieldName="Tagihan Pokok"
                    value={formatCurrency(Number(creditor.tagihanPokok), "IDR")}
                    className="border-black"
                    valueClassName="font-medium tracking-wider"
                    fieldClassName="bg-black text-white"
                />
                <FieldValuePair
                    fieldName="Denda Tagihan"
                    value={formatCurrency(Number(creditor.dendaTagihan), "IDR")}
                    valueClassName="font-medium tracking-wider"
                />
                <FieldValuePair
                    fieldName="Bunga Tagihan"
                    value={formatCurrency(Number(creditor.bungaTagihan), "IDR")}
                    valueClassName="font-medium tracking-wider"
                />
                <div className="flex items-center">
                    <hr className="flex-[1] border border-gray-300" />
                    <PlusCircle className="shrink-0 text-gray-400" size={14} />
                </div>
                <div className="flex gap-4 justify-end  ">
                    <SimplePopover tip="Total Taighan" className="border-none">
                        <span className="tracking-widest">
                            {formatCurrency(
                                Number(creditor.tagihanPokok) +
                                    Number(creditor.bungaTagihan) +
                                    Number(creditor.dendaTagihan),
                                "IDR"
                            )}
                        </span>
                    </SimplePopover>
                </div>
            </div>
        </Section>
    )
}

export default TagihanKreditor
