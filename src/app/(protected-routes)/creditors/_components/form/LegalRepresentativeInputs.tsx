'use client'
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { UseFormReturn } from 'react-hook-form'
import { X } from 'lucide-react'
import { CreditorFormValues } from './validation'
import { Button } from '@/components/ui/button'
import Modal from '@/components/ui/modal'
import { useEffect, useState } from 'react'
import { useFormContextAddCreditor } from '.'
import CreditorFormSection from './CreditorFormSection'

type LegalRepresentativeInputsProps = {
    form: UseFormReturn<CreditorFormValues>
    onCloseClicked: () => void
}

function LegalRepresentativeInputs() {
    const form = useFormContextAddCreditor()

    const [withLegalRepresentative, setWithLegalRepresentative] =
        useState<boolean>(!!form.getValues('namaKuasaHukum'))

    const [kuasaDetail, setKuasaDetail] = useState<{
        namaKuasaHukum: null | string
        emailKuasaHukum: null | string
        alamatKorespondensi: null | string
        nomorTeleponKuasaHukum: null | string
    }>({
        namaKuasaHukum: null,
        emailKuasaHukum: null,
        alamatKorespondensi: null,
        nomorTeleponKuasaHukum: null,
    })

    useEffect(() => {
        setKuasaDetail({
            namaKuasaHukum: form.getValues('namaKuasaHukum') || null,
            emailKuasaHukum: form.getValues('emailKuasaHukum') || null,
            alamatKorespondensi: form.getValues('alamatKorespondensi') || null,
            nomorTeleponKuasaHukum:
                form.getValues('nomorTeleponKuasaHukum') || null,
        })
    }, [form])

    const [isModalOpen, setIsModalOpen] = useState(false)

    function handleApprove() {
        setKuasaDetail({
            namaKuasaHukum: null,
            emailKuasaHukum: null,
            alamatKorespondensi: null,
            nomorTeleponKuasaHukum: null,
        })

        form.setValue('namaKuasaHukum', undefined)
        form.setValue('emailKuasaHukum', undefined)
        form.setValue('alamatKorespondensi', undefined)
        form.setValue('nomorTeleponKuasaHukum', undefined)

        setWithLegalRepresentative(false)
        setIsModalOpen(false)
    }

    if (!withLegalRepresentative) {
        return (
            <Button
                className="block "
                type="button"
                variant={'success'}
                onClick={() => {
                    setWithLegalRepresentative(true)
                    form.setValue('namaKuasaHukum', '')
                }}
            >
                + Kuasa Hukum
            </Button>
        )
    }

    return (
        <CreditorFormSection title="Kuasa Hukum">
            <div className="border border-input p-4 rounded-md relative flex flex-col gap-2">
                <Modal
                    title={`Are you sure?`}
                    desc={`This action will remove all 'Kuasa Hukum' fields from the current form.`}
                    open={isModalOpen}
                    onOpenChange={async () => {
                        if (isModalOpen) {
                            setIsModalOpen((prev) => !prev)
                        }
                    }}
                    buttonCustom={
                        <Button
                            type="button"
                            className="p-1 size-7 absolute right-0 top-0 rounded-tl-none rounded-br-none"
                            variant={'destructive'}
                            onClick={() => {
                                setIsModalOpen((prev) => !prev)
                            }}
                        >
                            <X size={16} className="shrink-0" />
                        </Button>
                    }
                >
                    <div className="flex gap-2 w-full flex-wrap">
                        <Button
                            onClick={() => handleApprove()}
                            className="flex-1"
                            variant={'destructive'}
                        >
                            Yes, creditor doesn&apos;t need &apos;Kuasa&apos;
                        </Button>
                        <Button
                            className="flex-1"
                            variant={'outline'}
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </Modal>

                <FormField
                    control={form.control}
                    name="namaKuasaHukum"
                    render={({
                        field: { onChange, value, ...restOfFieldValues },
                    }) => (
                        <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Bambang"
                                    value={
                                        kuasaDetail.namaKuasaHukum || undefined
                                    }
                                    onChange={(e) => {
                                        setKuasaDetail((prev) => ({
                                            ...prev,
                                            namaKuasaHukum: e.target.value,
                                        }))
                                        onChange(e)
                                    }}
                                    {...restOfFieldValues}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="alamatKorespondensi"
                    render={({
                        field: { onChange, value, ...restOfFieldValues },
                    }) => (
                        <FormItem>
                            <FormLabel>Alamat Korespondensi</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Type creditor's correspondence adress here."
                                    value={
                                        kuasaDetail.alamatKorespondensi ||
                                        undefined
                                    }
                                    onChange={(e) => {
                                        setKuasaDetail((prev) => ({
                                            ...prev,
                                            alamatKorespondensi: e.target.value,
                                        }))
                                        onChange(e)
                                    }}
                                    {...restOfFieldValues}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="emailKuasaHukum"
                    render={({
                        field: { onChange, value, ...restOfFieldValues },
                    }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter  Legal Representative's Email"
                                    value={
                                        kuasaDetail.emailKuasaHukum || undefined
                                    }
                                    onChange={(e) => {
                                        setKuasaDetail((prev) => ({
                                            ...prev,
                                            emailKuasaHukum: e.target.value,
                                        }))
                                        onChange(e)
                                    }}
                                    {...restOfFieldValues}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="nomorTeleponKuasaHukum"
                    render={({
                        field: { onChange, value, ...restOfFieldValues },
                    }) => (
                        <FormItem>
                            <FormLabel>Nomor Telepon</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter  Legal Representative's Phone Number"
                                    value={
                                        kuasaDetail.nomorTeleponKuasaHukum ||
                                        undefined
                                    }
                                    onChange={(e) => {
                                        setKuasaDetail((prev) => ({
                                            ...prev,
                                            nomorTeleponKuasaHukum:
                                                e.target.value,
                                        }))
                                        onChange(e)
                                    }}
                                    {...restOfFieldValues}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </CreditorFormSection>
    )
}

export default LegalRepresentativeInputs
