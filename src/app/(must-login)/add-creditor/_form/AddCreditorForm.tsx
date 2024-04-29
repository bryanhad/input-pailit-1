'use client'

import LoadingButton from '@/components/LoadingButton'
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'
import { capitalizeFirstLetter } from '@/lib/utils'
import { useState } from 'react'
import { FormProviderAddCreditor, useAddCreditorForm } from '.'
import AttachmentsField from './AttachmentsField'
import LegalRepresentativeInputs from './LegalRepresentativeInputs'
import { AddCreditorValues } from './validation'

function AddCreditorForm() {
    const [withLegalRepresentative, setWithLegalRepresentative] =
        useState<boolean>()

    const form = useAddCreditorForm()

    function onSubmit(values: AddCreditorValues) {
        console.log(values)
    }

    function handleNumberInputChange(
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (...event: any[]) => void,
        field: keyof AddCreditorValues
    ) {
        const value = parseInt(e.target.value)
        if (isNaN(value) || value < 1) {
            onChange(0)
        } else {
            if (value > 0 && String(form.watch(field)).length < 2) {
                form.setValue(field, value)
            } else {
                onChange(value)
            }
        }
        form.trigger(field)
    }

    return (
        <FormProviderAddCreditor>
            <main className="px-3 py-10">
                <section className="mx-auto space-y-6">
                    <h1 className="text-3xl font-bold">Add Creditor</h1>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className=" space-y-2.5"
                        >
                            <FormField
                                control={form.control}
                                name="jenis"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>Jenis kreditor</FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-1"
                                            >
                                                {[
                                                    'INSTANSI/PERUSAHAAN',
                                                    'PRIBADI',
                                                ].map((item) => (
                                                    <FormItem
                                                        key={item}
                                                        className="flex items-center space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <RadioGroupItem
                                                                value={item}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {capitalizeFirstLetter(
                                                                item
                                                            )}
                                                        </FormLabel>
                                                    </FormItem>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="nama"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Nama Kreditor</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Masukkan nama kreditor.."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="NIKAtauNomorAktaPendirian"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            NIK Atau Akta Pendirian
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Masukkan NIK Atau Akta Pendirianr.."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="alamat"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Alamat Kreditor</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Jl. Mangga Duren Mantab No.17"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email Kreditor</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Masukkan email kreditor.."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="nomorTelepon"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Nomor Telepon Kreditor
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Masukkan Nomor Telepon Kreditor"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="korespondensi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Korespondensi Kreditor
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Masukkan korespondensi kreditor"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="totalTagihan"
                                render={({
                                    field: { value, ...restOfFieldValues },
                                }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <div className="flex items-center rounded-md border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                                <p className="px-3">Rp</p>
                                                <Input
                                                    value={form.watch(
                                                        'totalTagihan'
                                                    )}
                                                    variant="withIcon"
                                                    placeholder="Add Product's Price"
                                                    {...restOfFieldValues}
                                                    onChange={(e) =>
                                                        handleNumberInputChange(
                                                            e,
                                                            restOfFieldValues.onChange,
                                                            'totalTagihan'
                                                        )
                                                    }
                                                />
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {!withLegalRepresentative && (
                                <Button
                                    className="block"
                                    type="button"
                                    onClick={() =>
                                        setWithLegalRepresentative(
                                            (prev) => !prev
                                        )
                                    }
                                >
                                    + Kuasa Hukum
                                </Button>
                            )}
                            {withLegalRepresentative && (
                                <>
                                    <h2 className="font-bold">Kuasa Hukum</h2>
                                    <LegalRepresentativeInputs
                                        onCloseClicked={() =>
                                            setWithLegalRepresentative(false)
                                        }
                                        form={form}
                                    />
                                </>
                            )}
                            <FormField
                                control={form.control}
                                name="sifatTagihan"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>
                                            Pilih sifat tagihan
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-1"
                                            >
                                                {[
                                                    'SEPARATIS',
                                                    'PREFEREN',
                                                    'KONKUREN',
                                                ].map((item) => (
                                                    <FormItem
                                                        key={item}
                                                        className="flex items-center space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <RadioGroupItem
                                                                value={item}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {capitalizeFirstLetter(
                                                                item
                                                            )}
                                                        </FormLabel>
                                                    </FormItem>
                                                ))}
                                            </RadioGroup>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <h2 className="font-bold text-2xl">Lampiran</h2>
                            <AttachmentsField />
                            <LoadingButton
                                type="submit"
                                loading={form.formState.isSubmitting}
                            >
                                Submit
                            </LoadingButton>
                        </form>
                    </Form>
                </section>
            </main>
        </FormProviderAddCreditor>
    )
}

export default AddCreditorForm
