"use client"
import { updateUserNameAndPasswordThenSignIn } from "@/app/auth/actions"
import { LoginError } from "@/app/auth/constructors"
import { OnBoardingValues, onBoardingSchema } from "@/app/auth/validation"
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
import { useForm } from "react-hook-form"

type OnBoardingFormProps = {
    userId: string
}

function OnBoardingForm({ userId }: OnBoardingFormProps) {
    const router = useRouter()
    const { toast } = useToast()
    const form = useForm<OnBoardingValues>({
        resolver: zodResolver(onBoardingSchema),
        defaultValues: {
            name: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit({ name, password }: OnBoardingValues) {
        const res = await updateUserNameAndPasswordThenSignIn(
            userId,
            name,
            password
        )
        if (res?.error) {
            return toast({
                variant: "destructive",
                title: res.error.title,
                description: res.error.message,
            })
        }
        toast({
            title: `Wellcome on board ${name}!`,
        })
        // I DON'T KNOW HOW TO REDIRECT THE USER AFTER SUCCESSFUL LOGIN VIA THE signIn FUNCTION FROM AUTHJS V5!! D:<
        // THE DOCS DOESN'T FOCKING WORKKK??!!!! this is my reference for the doc: https://authjs.dev/getting-started/session-management/login
        // SO IN DESPERATION I USE THE ABOMINATION BELOW! AND SURPRISINGLY IT WORKS AHAHAHAHA
        // IT IS WHAT IT IS COUNTER: 1 :D
        setTimeout(() => {
            router.push('/dashboard')
        }, 100);
    }

    return (
        <div>
            <H1>Wellcome new comer!</H1>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
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
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
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
        </div>
    )
}

export default OnBoardingForm
