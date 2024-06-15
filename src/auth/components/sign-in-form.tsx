"use client"
import LoadingButton from "@/components/LoadingButton"
import FormResponse from "@/components/form-response"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"
import { login } from "../actions"
import { LoginFormValues, loginSchema } from "../validation"

type SignInFormProps = {
    onSuccess?: () => void
}

function SignInForm({ onSuccess }: SignInFormProps) {
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const [formError, setFormError] = useState<string>()
    const [formSuccess, setFormSuccess] = useState<string>()

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: LoginFormValues) {
        setFormError(undefined)
        setFormSuccess(undefined)
        startTransition(async () => {
            const res = await login(values)
            if (res?.error) {
                setFormError(res.error)
                return
            }
            if (onSuccess) {
                onSuccess()
            }
            setFormSuccess("Successfully signed in")
            toast({
                title: res.success,
            })
        })
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4 w-full flex-1"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    // placeholder="kurator-asp-01@gmail.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormResponse response={formSuccess} errorMessage={formError} />

                <LoadingButton
                    type="submit"
                    loading={isPending}
                    className="w-full"
                >
                    Sign In
                </LoadingButton>
            </form>
        </Form>
    )
}

export default SignInForm
