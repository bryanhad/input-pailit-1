"use client"

import { updateUserNameAndPasswordThenSignIn } from "@/auth/actions"
import { OnBoardingFormValues, onBoardingSchema } from "@/auth/validation"
import LoadingButton from "@/components/LoadingButton"
import FormResponse from "@/components/form-response"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import H1 from "@/components/ui/h1"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { useForm } from "react-hook-form"

type OnBoardingFormProps = {
    userId: string
}

function OnBoardingForm({ userId }: OnBoardingFormProps) {
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const [formError, setFormError] = useState<string>()
    const [formSuccess, setFormSuccess] = useState<string>()

    const form = useForm<OnBoardingFormValues>({
        resolver: zodResolver(onBoardingSchema),
        defaultValues: {
            name: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit({ name, password }: OnBoardingFormValues) {
        setFormError(undefined)
        setFormSuccess(undefined)
        startTransition(async () => {
            const res = await updateUserNameAndPasswordThenSignIn(
                userId,
                name,
                password
            )
            if (res?.error) {
                setFormError(res.error)
                toast({
                    variant: "destructive",
                    title: res.title,
                    description: res.error,
                })
                return
            }
            toast({
                title: `Wellcome on board ${name}!`,
            })
        })
        // I DON'T KNOW HOW TO REDIRECT THE USER AFTER SUCCESSFUL LOGIN VIA THE signIn FUNCTION FROM AUTHJS V5!! D:<
        // THE DOCS DOESN'T FOCKING WORKKK??!!!! this is my reference for the doc: https://authjs.dev/getting-started/session-management/login
        // SO IN DESPERATION I USE THE ABOMINATION BELOW! AND SURPRISINGLY IT WORKS AHAHAHAHA
        // IT IS WHAT IT IS COUNTER: 1 :D
        // setTimeout(() => {
        //     router.push("/dashboard")
        // }, 100)
    }

    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="shadcn@gmail.com"
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
                                    <Input
                                        placeholder="Your super secret password"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Match your password above"
                                        type="password"
                                        {...field}
                                    />
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
        </div>
    )
}

export default OnBoardingForm
