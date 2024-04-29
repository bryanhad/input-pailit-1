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
import { AddCreditorValues } from './validation'

type LegalRepresentativeInputsProps = {
    form: UseFormReturn<AddCreditorValues>
    onCloseClicked: () => void
}

function LegalRepresentativeInputs({
    form,
    onCloseClicked,
}: LegalRepresentativeInputsProps) {
    return (
        <div className="border border-input p-4 rounded-md relative">
            <button
                className="p-1 absolute right-0 top-0 translate-x-[5px] translate-y-[-5px] text-destructive border border-destructive rounded-full bg-white"
                onClick={onCloseClicked}
            >
                <X className="shrink-0" size={16} />
            </button>
            <FormField
                control={form.control}
                name="namaKuasaHukum"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nama Kuasa Hukum</FormLabel>
                        <FormControl>
                            <Input placeholder="Bambang" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="alamatKuasaHukum"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Alamat Kuasa Hukum</FormLabel>
                        <FormControl>
                            <Textarea
                                {...field}
                                placeholder="Type Legal Representative Address's address here."
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="nomorTeleponKuasaHukum"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nomor Telepon Kuasa Hukum</FormLabel>
                        <FormControl>
                            <Input
                                placeholder="Enter  Legal Representative's Phone Number"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}

export default LegalRepresentativeInputs
