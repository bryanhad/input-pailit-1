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
import { signInSchema } from "../../auth/validation"
import { loginWithEmail } from "@/auth/actions"

function SignInForm() {
    const router = useRouter()
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit({ email }: z.infer<typeof signInSchema>) {
        // try {
            try {
                const res = await loginWithEmail(email)
                console.log(res)
                if (res?.error) {
                    res.error
                }
            } catch (err) {
                
                console.log(err)
                
            }
            // if (res?.error) {
            //     throw new Error('WHAT THE FUCK')
            // }
            // alert("SUCCESS LOGIN")
            // router.push('/dashboard')
        // } catch (err) {
        //     alert("NGAPAIN LU KESINI???")
        // }
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
