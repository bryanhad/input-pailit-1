"use client"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { credentialsSchema, CredentialsValue } from "../../app/auth/validation"
import { loginWithCredentials } from "@/app/auth/actions"
import { useToast } from "../ui/use-toast"

function SignInForm() {
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<CredentialsValue>({
        resolver: zodResolver(credentialsSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit({ email, password }: CredentialsValue) {
        const res = await loginWithCredentials(email, password)
        if (res?.error) {
            return toast({
                variant: "destructive",
                title: res.error.name,
                description: res.error.message,
            })
        }
        toast({
            title: 'Wellcome Bro!'
        })
        router.push('/dashboard')
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
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
                                    placeholder="shadcn@gmail.com"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Sign In</Button>
            </form>
        </Form>
    )
}

export default SignInForm
