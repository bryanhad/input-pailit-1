'use client'
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
import { z } from 'zod'
import CancelEditUserButton from './cancel-edit-user-button'
import { User } from '@prisma/client'
import { updateProfile } from '../actions'

type EditUserFormProps = {
    userDetail: Pick<
        User,
        'createdAt' | 'email' | 'emailVerified' | 'image' | 'name' | 'role'
    >
    setIsEditing: (isEditing: boolean) => void
}

const formSchema = z.object({
    name: z.string().min(2).max(50),
})

function EditUserForm({ setIsEditing, userDetail }: EditUserFormProps) {
    const { toast } = useToast()
    const [isPending, startTransition] = useTransition()
    const [formError, setFormError] = useState<string>()
    const [formSuccess, setFormSuccess] = useState<string>()

    const [openCancelConfirmation, setOpenCancelConfirmation] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: userDetail.name || undefined,
        },
    })

    async function onSubmit({ name }: z.infer<typeof formSchema>) {
        setFormError(undefined)
        setFormSuccess(undefined)
        startTransition(async () => {
            const res = await updateProfile(name, userDetail.email)
            if (res?.error) {
                setFormError(res.error.message)
                toast({
                    variant: 'destructive',
                    title: res.error.title,
                    description: res.error.message,
                })
                return
            }
            setFormSuccess(res.success)
            toast({
                title: 'Successfully updated profile',
                // description: res.success,
            })
            setIsEditing(false)
        })
    }

    return (
        <>
            <CancelEditUserButton
                isFormDirty={form.formState.isDirty}
                onApproveCancelEditing={() => setIsEditing(false)}
                openModal={openCancelConfirmation}
                setOpenModal={setOpenCancelConfirmation}
            />
            <div className="space-y-2">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex items-end sm:items-start sm:pr-14 gap-2"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <div className="flex gap-1 flex-col sm:flex-row">
                                        <FormLabel className="md:min-w-[180px] text-base font-medium pt-2">
                                            Name
                                            <span className="ml-2 md:hidden pt-[3px]">
                                                :
                                            </span>
                                        </FormLabel>
                                        <span className="hidden md:block pt-[5px]">
                                            :
                                        </span>
                                        <div className="flex flex-col gap-2 flex-1">
                                            <FormControl>
                                                <Input
                                                    className="flex-1 text-sm min-w-0"
                                                    placeholder="Enter your user name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormResponse
                                                className="hidden sm:flex"
                                                response={formSuccess}
                                                errorMessage={formError}
                                            />
                                        </div>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <LoadingButton
                            type="submit"
                            loading={isPending}
                            disabled={!form.formState.isDirty}
                        >
                            Edit
                        </LoadingButton>
                    </form>
                </Form>
                <FormResponse
                    className="sm:hidden"
                    response={formSuccess}
                    errorMessage={'oh no!'}
                />
            </div>
        </>
    )
}

export default EditUserForm
