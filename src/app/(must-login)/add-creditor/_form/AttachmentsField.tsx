"use client"

import React from "react"
import { useFormContextAddCreditor } from "."
import { useFieldArray } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

function AttachmentsField() {
    const {
        register,
        formState: { errors },
        watch,
        control,
    } = useFormContextAddCreditor()

    const { append, remove, fields } = useFieldArray({
        name: "attachments",
        control,
    })

    return (
        <div>
            {fields.map((field, attachmentIndex) => (
                <div key={field.id} className="flex gap-3">
                    {/* Register the individual attachment form field */}
                    <Input
                        placeholder="Write your attachment name"
                        {...register(
                            `attachments.${attachmentIndex}.attachmentName`
                        )}
                    />
                    <Input
                        placeholder=""
                        {...register(
                            `attachments.${attachmentIndex}.attachmentFile`
                        )}
                    />
                    <Input
                        {...register(
                            `attachments.${attachmentIndex}.attachmentDescription`
                        )}
                    />
                </div>
            ))}
            {errors.attachments?.message}
            <Button
            type="button"
                onClick={() =>
                    append({
                        attachmentName: "",
                        attachmentFile: undefined,
                        attachmentDescription: "",
                    })
                }
            >
                Add More Attachment
            </Button>
        </div>
    )
}

export default AttachmentsField
