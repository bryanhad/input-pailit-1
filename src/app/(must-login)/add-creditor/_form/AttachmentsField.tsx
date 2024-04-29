'use client'

import React from 'react'
import { useFormContextAddCreditor } from '.'
import { useFieldArray } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form'

function AttachmentsField() {
    const {
        register,
        formState: { errors },
        watch,
        control,
    } = useFormContextAddCreditor()

    const { append, remove, fields } = useFieldArray({
        name: 'attachments',
        control,
    })

    return (
        <div>
            {fields.map((field, attachmentIndex) => (
                <div key={field.id} className="flex gap-3">
                    {/* Register the individual attachment form field */}
                    <FormField
                        control={control}
                        name={`attachments.${attachmentIndex}.nama`}
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Nama lampiran baru.."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
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
                            <FormItem>
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
            ))}
            <Button
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
