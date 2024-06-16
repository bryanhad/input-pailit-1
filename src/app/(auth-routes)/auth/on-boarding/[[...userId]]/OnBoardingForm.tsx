'use client'

import { updateUserNameAndPasswordThenSignIn } from '@/auth/actions'
import { OnBoardingFormValues, onBoardingSchema } from '@/auth/validation'
import LoadingButton from '@/components/LoadingButton'
import FormResponse from '@/components/form-response'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'

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
            name: '',
            password: '',
            confirmPassword: '',
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
                    variant: 'destructive',
                    title: res.title,
                    description: res.error,
                })
                return
            }
            toast({
                title: `Wellcome on board ${name}!`,
            })
        })
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
                                <div className="flex gap-2 max-lg:justify-center">
                                    <FormLabel className="pt-1">Name</FormLabel>
                                    <span className="text-sm font-light">
                                        (Can be changed later)
                                    </span>
                                </div>
                                <FormControl>
                                    <Input
                                        placeholder="Bambang si Kreditor Ganteng"
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
                                    <FormLabel>
                                        Password
                                    </FormLabel>
                                
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
                    <FormResponse
                        response={formSuccess}
                        errorMessage={formError}
                    />

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
