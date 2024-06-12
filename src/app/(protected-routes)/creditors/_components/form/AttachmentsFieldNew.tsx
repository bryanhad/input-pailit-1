"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"
import { useFieldArray } from "react-hook-form"
import { useFormContextAddCreditor } from "."

function AttachmentsField() {
    const { control } = useFormContextAddCreditor()

    const { append, remove, fields } = useFieldArray({
        name: "attachments",
        control,
    })

    return (
        <div className="flex flex-col gap-6">
            {fields.map((field, attachmentIndex) => (
                <div
                    key={field.id}
                    className="flex flex-col lg:flex-row items-start gap-3 max-lg:border max-lg:border-input max-lg:p-2 max-lg:rounded-md"
                >
                    <div className="flex w-full max-lg:flex-row-reverse flex-1 gap-2">
                        <Button
                            type="button"
                            variant={"destructive-soft"}
                            className=""
                            onClick={() => remove(attachmentIndex)}
                        >
                            <X size={16} className="shrink-0" />
                        </Button>

                        <FormField
                            control={control}
                            name={`attachments.${attachmentIndex}.nama`}
                            render={({ field }) => (
                                <FormItem className="flex-1 xl:min-w-[250px] w-full">
                                    <FormControl>
                                        <div className="flex gap-2">
                                            <Input
                                                className="text-sm lg:text-base "
                                                placeholder="Masukkan nama lampiran.."
                                                {...field}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex items-center gap-4 max-lg:justify-between flex-[2] max-lg:w-full">
                        <FormField
                            control={control}
                            name={`attachments.${attachmentIndex}.ready`}
                            render={({ field }) => (
                                <FormItem className="pl-1">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={control}
                            name={`attachments.${attachmentIndex}.deskripsi`}
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormControl>
                                        <Input
                                            placeholder="Keterangan (Cth: belum lengkap)"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            ))}
            <Button
                className="self-start"
                type="button"
                variant={"success"}
                onClick={() =>
                    append({
                        nama: "",
                        ready: false,
                        deskripsi: undefined,
                    })
                }
            >
                + Tambah Lampiran
            </Button>
        </div>
    )
}

export default AttachmentsField
