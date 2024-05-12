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
import { useForm } from "react-hook-form"
import { z } from "zod"
import { signInSchema } from "./validation"
import { SignInResponse, signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

function SignInForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit({ email }: z.infer<typeof signInSchema>) {
        try {
            const res = await signIn("credentials", {email, callbackUrl: '/dashboard', redirect:false})
            if (res?.error) {
                throw new Error('WHAT THE FUCK')
            }
            alert("SUCCESS LOGIN")
            router.push('/dashboard')
        } catch (err) {
            alert("NGAPAIN LU KESINI???")
        }
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
                <Button type="submit">Sign In</Button>
            </form>
        </Form>
    )
}

export default SignInForm
