"use client"
import LoadingButton from "@/components/LoadingButton"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import H2 from "@/components/ui/h2"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { sendVerificationEmailToNewUser } from "../actions"
import FormResponse from "@/components/form-response"

const formSchema = z.object({
    email: z.string().min(2).max(50),
})

function AddNewUserForm() {
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const [formError, setFormError] = useState<string>()
    const [formSuccess, setFormSuccess] = useState<string>()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit({ email }: z.infer<typeof formSchema>) {
        setFormError(undefined)
        setFormSuccess(undefined)
        startTransition(async () => {
            const res = await sendVerificationEmailToNewUser(email)
            if (res?.error) {
                setFormError(res.error)
                toast({
                    variant: "destructive",
                    title: res.title,
                    description: res.error,
                })
                return
            }
            setFormSuccess(res.success)
            toast({
                title: "Hooray!",
                description: res.success,
            })
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New user&apos;s email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="si-paling-kurator@gmail.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormResponse response={formSuccess} errorMessage={formError} />

                <LoadingButton type="submit" loading={isPending}>
                    Add New User
                </LoadingButton>
            </form>
        </Form>
    )
}

export default AddNewUserForm
