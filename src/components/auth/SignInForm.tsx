"use client"
import { loginWithCredentials } from "@/app/auth/actions"
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
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { CredentialsValue, credentialsSchema } from "../../app/auth/validation"
import { useToast } from "../ui/use-toast"
import { useTransition } from "react"
import LoadingButton from "../LoadingButton"

function SignInForm() {
    const router = useRouter()
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()

    const form = useForm<CredentialsValue>({
        resolver: zodResolver(credentialsSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit({ email, password }: CredentialsValue) {
        startTransition(async () => {
            const res = await loginWithCredentials(email, password)
            if (res?.error) {
                toast({
                    variant: "destructive",
                    title: res.error.title,
                    description: res.error.message,
                })
                return
            }
            toast({
                title: `Wellcome on board ${res.success}!`,
            })
            // I DON'T KNOW HOW TO REDIRECT THE USER AFTER SUCCESSFUL LOGIN VIA THE signIn FUNCTION FROM AUTHJS V5!! D:<
            // THE DOCS DOESN'T FOCKING WORKKK??!!!! this is my reference for the doc: https://authjs.dev/getting-started/session-management/login
            // SO IN DESPERATION I USE THE ABOMINATION BELOW! AND SURPRISINGLY IT WORKS AHAHAHAHA
            // IT IS WHAT IT IS COUNTER: 1 :D            
            setTimeout(() => {
                router.push('/dashboard')
            }, 100);
        })
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
                  <LoadingButton type='submit' loading={isPending}>
                Sign In Bro
                </LoadingButton>
            </form>
        </Form>
    )
}

export default SignInForm
