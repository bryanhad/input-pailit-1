'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Control, UseFieldArrayRemove, useFieldArray } from 'react-hook-form'
import { useFormContextAddCreditor } from '.'
import { useState } from 'react'
import { AddCreditorValues } from './validation'
import { Pencil, X, Check } from 'lucide-react'

function AttachmentsField() {
    const { control, watch, setValue, trigger } = useFormContextAddCreditor()

    const { append, remove, fields } = useFieldArray({
        name: 'attachments',
        control,
    })

    return (
        <div className="flex flex-col gap-6">
            {fields.map((field, attachmentIndex) => (
                <div
                    key={field.id}
                    className="flex flex-col lg:flex-row items-center gap-3 max-lg:border max-lg:border-input max-lg:p-2 max-lg:rounded-md"
                >
                    <AttachmentNameField
                        control={control}
                        index={attachmentIndex}
                        onCheckClicked={async (newLampiranName, close) => {
                            setValue(
                                `attachments.${attachmentIndex}.nama`,
                                newLampiranName
                            )
                            await trigger(`attachments.${attachmentIndex}.nama`)
                            // only close the input if the newLampiranName is filled and is less than 100 chars long.
                            if (
                                newLampiranName.length >= 1 &&
                                newLampiranName.length < 100
                            ) {
                                close(false)
                            }
                        }}
                        defaultValue={watch(
                            `attachments.${attachmentIndex}.nama`
                        )}
                        removeAttachment={remove}
                    />
                    <div className="flex items-center gap-4 max-lg:justify-between flex-1 max-lg:w-full">
                        <FormField
                            control={control}
                            name={`attachments.${attachmentIndex}.ready`}
                            render={({ field }) => (
                                <FormItem>
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
                                <FormItem className="flex-1 lg:max-w-[500px]">
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
                onClick={() =>
                    append({
                        nama: '',
                        ready: false,
                        deskripsi: '',
                    })
                }
            >
                + Tambah Lampiran
            </Button>
        </div>
    )
}

export default AttachmentsField

function AttachmentNameField({
    control,
    index,
    defaultValue,
    onCheckClicked,
    removeAttachment,
}: {
    control: Control<AddCreditorValues>
    index: number
    defaultValue: string
    onCheckClicked: (
        newLampiranName: string,
        close: React.Dispatch<React.SetStateAction<boolean>>
    ) => Promise<void>
    removeAttachment: UseFieldArrayRemove
}) {
    const [name, setName] = useState(defaultValue)
    const [isEditing, setIsEditing] = useState<boolean>(
        defaultValue.length <= 0
    )

    return (
        <>
            {isEditing ? (
                <FormField
                    control={control}
                    name={`attachments.${index}.nama`}
                    render={({
                        field: { onChange, value, ...restOfFieldValues },
                    }) => (
                        <FormItem className="flex-1 lg:max-w-[400px] w-full">
                            <FormControl>
                                <div className="flex gap-2">
                                    <Input
                                        className="text-sm lg:text-base"
                                        placeholder="Masukkan nama lampiran.."
                                        value={name}
                                        onChange={(e) => {
                                            setName(e.target.value)
                                        }}
                                        {...restOfFieldValues}
                                    />
                                    <Button
                                        type="button"
                                        variant={'outline'}
                                        onClick={() => {
                                            if (defaultValue.length < 1) {
                                                removeAttachment(index)
                                            }
                                            setName(defaultValue)
                                            setIsEditing(false)
                                        }}
                                    >
                                        <X size={16} className="shrink-0" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={'success'}
                                        onClick={() => {
                                            onCheckClicked(name, setIsEditing)
                                        }}
                                    >
                                        <Check size={16} className="shrink-0" />
                                    </Button>
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ) : (
                <div className="flex-1 lg:max-w-[400px] w-full flex gap-2 items-center">
                    <p className="pr-4 text-sm lg:text-base max-lg:flex-1 ">
                        {defaultValue}
                    </p>
                    <Button
                        type="button"
                        variant={'ghost'}
                        onClick={() => setIsEditing(true)}
                    >
                        <Pencil size={16} className="shrink-0" />
                    </Button>
                    <Button
                        type="button"
                        variant={'destructive-soft'}
                        className=""
                        onClick={() => removeAttachment(index)}
                    >
                        <X size={16} className="shrink-0" />
                    </Button>
                </div>
            )}
        </>
    )
}
