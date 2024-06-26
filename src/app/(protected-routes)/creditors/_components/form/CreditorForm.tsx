'use client'

import LoadingButton from '@/components/LoadingButton'
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
import { useToast } from '@/components/ui/use-toast'
import {
    capitalizeFirstLetter,
    formatCurrency,
    formatNumber,
} from '@/lib/utils'
import { ClaimType, CreditorType } from '@/types'
import { useRouter } from 'next/navigation'
import { UseFormReturn } from 'react-hook-form'
import { FormProviderAddCreditor } from '.'
import AttachmentsFieldNew from './AttachmentsFieldNew'
import LegalRepresentativeInputs from './LegalRepresentativeInputs'
import { CreditorFormValues } from './validation'
import { useState, useTransition } from 'react'
import FormResponse from '@/components/form-response'
import { BadgePercent, Gavel, HandCoins, PlusCircle } from 'lucide-react'
import SimplePopover from '@/components/SimplePopover'
import H2 from '@/components/ui/h2'
import H1 from '@/components/ui/h1'
import CreditorFormSection from './CreditorFormSection'

type CreditorFormProps = {
    form: UseFormReturn<CreditorFormValues>
    action: (
        userId: string,
        values: CreditorFormValues,
        ...params: any[]
    ) => Promise<
        | {
              success: {
                  title: string
                  message: string
              }
              error?: undefined
          }
        | {
              error: {
                  title: string
                  message: string
              }
              success?: undefined
          }
    >
    creditorId?: string
    userId: string
}

function CreditorForm({ form, action, creditorId, userId }: CreditorFormProps) {
    const { toast } = useToast()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [formError, setFormError] = useState<string>()
    const [formSuccess, setFormSuccess] = useState<string>()

    function onSubmit(values: CreditorFormValues) {
        setFormError(undefined)
        setFormSuccess(undefined)
        startTransition(async () => {
            const res = await action(
                userId,
                values,
                form.formState.dirtyFields,
                creditorId
            )
            if (res.error) {
                setFormError(res.error.message)
                toast({
                    variant: 'destructive',
                    title: res.error.title,
                    description: res.error.message,
                })
                return
            }
            setFormSuccess(res.success.message)
            toast({
                title: res.success.title,
                description: res.success.message,
            })
            router.push('/dashboard')
        })
    }

    function handleNumberInputChange(
        e: React.ChangeEvent<HTMLInputElement>,
        onChange: (...event: any[]) => void,
        field: keyof CreditorFormValues
    ) {
        // the regex is for removing all '.' from the e.target.value that has been modified from the formatNumber lol
        const value = parseInt(e.target.value.replace(/\./g, ''))

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
        field: keyof CreditorFormValues
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
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="grid grid-cols-1 xl:grid-cols-2 xl:gap-10"
                >
                    <CreditorFormSection title="Detail Kreditor">
                        <div className="space-y-3">
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
                                                        <FormLabel className="font-normal cursor-pointer">
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
                            {/* TODO: show the label relative to what the user choses the creditor type! */}
                            <FormField
                                control={form.control}
                                name="NIKAtauNomorAktaPendirian"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            {form.watch('jenis') ===
                                            CreditorType.Instansi
                                                ? 'Akta Pendirian'
                                                : 'NIK'}
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
                        </div>
                    </CreditorFormSection>
                    <div className="space-y-3 max-xl:pt-4">
                        {/* TAGIHAN STUFFS */}
                        <CreditorFormSection title="Detail Tagihan">
                            <FormField
                                control={form.control}
                                name="sifatTagihan"
                                render={({ field }) => (
                                    <FormItem className="space-y-3 mb-5">
                                        <FormLabel>Sifat Tagihan</FormLabel>
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
                                                        <FormLabel className="font-normal cursor-pointer">
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
                            <div className="space-y-2">
                                <FormField
                                    control={form.control}
                                    name="tagihanPokok"
                                    render={({
                                        field: { value, ...restOfFieldValues },
                                    }) => (
                                        <FormItem>
                                            <div className="flex gap-2">
                                                <FormLabel
                                                    className="gap-2 flex items-center"
                                                    htmlFor="tagihanPokok"
                                                >
                                                    Tagihan Pokok
                                                </FormLabel>
                                                <FormControl className="flex-[1]">
                                                    <div className="flex items-center rounded-l-md rounded-r-md border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-black text-white">
                                                        <p className="px-3">
                                                            Rp
                                                        </p>
                                                        <Input
                                                            className="tracking-widest text-black rounded-r-md border border-black"
                                                            value={formatNumber(
                                                                Number(
                                                                    form.watch(
                                                                        'tagihanPokok'
                                                                    )
                                                                )
                                                            )}
                                                            variant="withIcon"
                                                            placeholder="Add Product's Price"
                                                            {...restOfFieldValues}
                                                            id="tagihanPokok"
                                                            onChange={(e) =>
                                                                handleNumberInputChange(
                                                                    e,
                                                                    restOfFieldValues.onChange,
                                                                    'tagihanPokok'
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </FormControl>
                                            </div>
                                            <FormMessage className="ml-auto" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="bungaTagihan"
                                    render={({
                                        field: { value, ...restOfFieldValues },
                                    }) => (
                                        <FormItem className="flex gap-2">
                                            <FormLabel
                                                className="gap-2 flex items-center"
                                                htmlFor="bungaTagihan"
                                            >
                                                Bunga Tagihan
                                            </FormLabel>
                                            <FormControl className="flex-[1]">
                                                <div className="flex items-center rounded-l-md rounded-r-md border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                                    <p className="px-3">Rp</p>
                                                    <Input
                                                        className="tracking-widest text-black rounded-r-md border-l"
                                                        value={formatNumber(
                                                            Number(
                                                                form.watch(
                                                                    'bungaTagihan'
                                                                )
                                                            )
                                                        )}
                                                        variant="withIcon"
                                                        placeholder="Add Product's Price"
                                                        {...restOfFieldValues}
                                                        id="bungaTagihan"
                                                        onChange={(e) =>
                                                            handleNumberInputChange(
                                                                e,
                                                                restOfFieldValues.onChange,
                                                                'bungaTagihan'
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
                                    name="dendaTagihan"
                                    render={({
                                        field: { value, ...restOfFieldValues },
                                    }) => (
                                        <FormItem className="flex gap-2">
                                            <FormLabel
                                                className="gap-2 flex items-center"
                                                htmlFor="dendaTagihan"
                                            >
                                                Denda Tagihan
                                            </FormLabel>
                                            <FormControl className="flex-[1]">
                                                <div className="flex items-center rounded-l-md rounded-r-md border focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                                                    <p className="px-3">Rp</p>
                                                    <Input
                                                        className="tracking-widest text-black rounded-r-md border-l"
                                                        value={formatNumber(
                                                            Number(
                                                                form.watch(
                                                                    'dendaTagihan'
                                                                )
                                                            )
                                                        )}
                                                        variant="withIcon"
                                                        placeholder="Add Product's Price"
                                                        {...restOfFieldValues}
                                                        id="dendaTagihan"
                                                        onChange={(e) =>
                                                            handleNumberInputChange(
                                                                e,
                                                                restOfFieldValues.onChange,
                                                                'dendaTagihan'
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div>
                                    <div className="flex items-center">
                                        <hr className="flex-[1] border border-gray-300" />
                                        <PlusCircle
                                            className="shrink-0 text-gray-400"
                                            size={14}
                                        />
                                    </div>
                                    <div className="flex justify-end pr-2">
                                        <SimplePopover
                                            tip="Total Taighan"
                                            className="border-none"
                                        >
                                            <span className="tracking-widest">
                                                {formatCurrency(
                                                    Number(
                                                        form.watch(
                                                            'tagihanPokok'
                                                        )
                                                    ) +
                                                        Number(
                                                            form.watch(
                                                                'bungaTagihan'
                                                            )
                                                        ) +
                                                        Number(
                                                            form.watch(
                                                                'dendaTagihan'
                                                            )
                                                        ),
                                                    'IDR'
                                                )}
                                            </span>
                                        </SimplePopover>
                                    </div>
                                </div>
                            </div>
                            {/* END OF TAGIHAN STUFFS */}
                        </CreditorFormSection>

                        <LegalRepresentativeInputs />
                        <CreditorFormSection title="Lampiran">
                            {/* <AttachmentsField /> */}
                            <AttachmentsFieldNew />
                        </CreditorFormSection>

                        <FormResponse
                            className="hidden sm:flex"
                            response={formSuccess}
                            errorMessage={formError}
                        />
                        <LoadingButton
                            type="submit"
                            loading={isPending}
                            disabled={!form.formState.isDirty}
                        >
                            {creditorId
                                ? !form.formState.isDirty
                                    ? 'Edit one of the fields to submit'
                                    : 'Edit Creditor'
                                : !form.formState.isDirty
                                ? 'Fill in any of the fields to submit'
                                : 'Add Creditor'}
                        </LoadingButton>
                    </div>
                </form>
            </Form>
        </FormProviderAddCreditor>
    )
}

export default CreditorForm
