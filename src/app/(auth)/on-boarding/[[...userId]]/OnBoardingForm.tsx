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
        // try {
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
            router.push('/dashboard')
            // TODO: remove comment
        // } catch (err: any) {
            
            // toast({
            //     variant: "destructive",
            //     title: err.title || 'Oh noose!',
            //     description: err.message || 'Something went wrong.',
            // })
            // if (err instanceof LoginError) {
            //     toast({
            //         variant: "destructive",
            //         title: err.title,
            //         description: err.message,
            //     })
            // }
            // toast({
            //     variant: "destructive",
            //     title: 'Oh noose!',
            //     description: 'Something went wrong!',
            // })
        // }
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
