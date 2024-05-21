import { z } from "zod"

const emailSchema = z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email")

const passwordSchema = z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/\d/, { message: "Password must contain at least one number" })

export const credentialsSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
})

export type CredentialsValue = z.infer<typeof credentialsSchema>

export const onBoardingSchema = z
    .object({
        name: z.string().min(3, "Name must be atleast 3 characters long"),
        password: passwordSchema,
        confirmPassword: z.string().min(1, "Verify password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"], // Path of the error
    })

export type OnBoardingValues = z.infer<typeof onBoardingSchema>
