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
import { ClaimType, CreditorType } from '@/types'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { addCreditor } from './actions'

function AddCreditorForm() {
    const { toast } = useToast()
    const router = useRouter()

    const [withLegalRepresentative, setWithLegalRepresentative] =
        useState<boolean>()

    const form = useAddCreditorForm()

    async function onSubmit(values: AddCreditorValues) {
        try {
            await addCreditor(values)
            toast({
                title: 'Successfully Added Creditor:',
                description: values.nama,
            })
            router.push('/dashboard')
        } catch (err) {
            toast({
                title: 'Oh no!',
                description: 'Something went wrong!',
            })
        }
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

    function handlePhoneNumberInputChange(
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (...event: any[]) => void,
        field: keyof AddCreditorValues
    ) {
        const value = parseInt(e.target.value)
        if (isNaN(value) && e.target.value !== '') {
            return
        }
        onChange(e.target.value)
        form.trigger(field)
    }

    return (
        <FormProviderAddCreditor>
            <section className="mx-auto space-y-6 p-4 border border-input rounded-xl bg-white">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="grid grid-cols-1 xl:grid-cols-2 gap-3 xl:gap-10"
                    >
                        <div className=" space-y-3">
                            <h2 className="font-bold text-2xl">
                                Detail Kreditor
                            </h2>
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
                                                className="flex flex-wrap gap-4"
                                            >
                                                {(
                                                    Object.values(
                                                        CreditorType
                                                    ) as string[]
                                                ).map((item) => (
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
                                            NIK / Akta Pendirian
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Masukkan NIK Atau Akta Pendirian.."
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
                                render={({
                                    field: { value, ...restOfFieldValues },
                                }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Nomor Telepon Kreditor
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                value={form.watch(
                                                    'nomorTelepon'
                                                )}
                                                placeholder="Masukkan nomor telepon kreditor"
                                                {...restOfFieldValues}
                                                onChange={(e) =>
                                                    handlePhoneNumberInputChange(
                                                        e,
                                                        restOfFieldValues.onChange,
                                                        'nomorTelepon'
                                                    )
                                                }
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
                                                className="flex flex-wrap gap-4"
                                            >
                                                {(
                                                    Object.values(
                                                        ClaimType
                                                    ) as string[]
                                                ).map((item) => (
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
                        </div>
                        <div className="space-y-4 max-xl:pt-4">
                            {!withLegalRepresentative && (
                                <Button
                                    className="block "
                                    type="button"
                                    variant={'success'}
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
                                    <h2 className="font-bold text-2xl">
                                        Kuasa Hukum
                                    </h2>
                                    <LegalRepresentativeInputs
                                        onCloseClicked={() =>
                                            setWithLegalRepresentative(false)
                                        }
                                        form={form}
                                    />
                                </>
                            )}
                            <h2 className="font-bold text-2xl">Lampiran</h2>
                            <AttachmentsField />
                            <LoadingButton
                                type="submit"
                                loading={form.formState.isSubmitting}
                            >
                                Submit
                            </LoadingButton>
                        </div>
                    </form>
                </Form>
            </section>
        </FormProviderAddCreditor>
    )
}

export default AddCreditorForm
