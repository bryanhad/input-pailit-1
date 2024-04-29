"use client"

import LoadingButton from "@/components/LoadingButton"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { capitalizeFirstLetter } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import LegalRepresentativeInputs from "./LegalRepresentativeInputs"
import { FormProviderAddCreditor, useAddCreditorForm } from "."
import AttachmentsField from "./AttachmentsField"
import { AddCreditorValues } from "./validation"

function AddCreditorForm() {
    const [selectedImage, setSelectedImage] = useState<string>()
    const [withLegalRepresentative, setWithLegalRepresentative] =
        useState<boolean>()

    const form = useAddCreditorForm()

    function onSubmit(values: AddCreditorValues) {
        console.log(values)
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
                                name="category"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>
                                            Select creditor&apos;s category
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-1"
                                            >
                                                {[
                                                    "INSTANSI/PERUSAHAAN",
                                                    "PRIBADI",
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
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter a name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Address</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                placeholder="Type creditor's address here."
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
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter a email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Phone Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter a phone number"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="creditorType"
                                render={({ field }) => (
                                    <FormItem className="space-y-3">
                                        <FormLabel>
                                            Select creditor type
                                        </FormLabel>
                                        <FormControl>
                                            <RadioGroup
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                                className="flex space-x-1"
                                            >
                                                {[
                                                    "SEPARATIS",
                                                    "PREFEREN",
                                                    "KONKUREN",
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
                                    Uses legal representative
                                </Button>
                            )}
                            {withLegalRepresentative && (
                                <LegalRepresentativeInputs
                                    onCloseClicked={() =>
                                        setWithLegalRepresentative(false)
                                    }
                                    form={form}
                                />
                            )}
                            <h2 className="font-bold text-2xl">Attachments</h2>
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
