"use client"
import { sendVerificationEmail } from "@/app/auth/actions"
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
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import H2 from "../ui/h2"
import { useToast } from "../ui/use-toast"

const formSchema = z.object({
    email: z.string().min(2).max(50),
})

function AddNewUserForm() {
    const { toast } = useToast()
    const [isEmailSent, setIsEmailSent] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit({ email }: z.infer<typeof formSchema>) {
        try {
            const res = await sendVerificationEmail(email)
            toast({
                title: "Hooray!",
                description: res,
            })
        } catch (err: any) {
            toast({
                variant: "destructive",
                title: "Oh Noose!",
                description: err.message,
            })
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-2 border-2 border-black p-4 rounded-md m-4"
            >
                <H2>ADD A NEW USER!</H2>
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

export default AddNewUserForm
