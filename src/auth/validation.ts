import { z } from "zod"

const emailSchema = z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email")

const passwordSchema = z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .regex(/\d/, { message: "Password must contain at least one number" })

export const signupSchema = z.object({
    name: z.string().min(2).max(50),
    email: z.string().min(2).max(50),
    password: z.string().min(2).max(50),
})

export type SignupFormValues = z.infer<typeof signupSchema>

export const loginSchema = z.object({
    email: emailSchema,
    password: passwordSchema,
})

export type LoginFormValues = z.infer<typeof loginSchema>

export const onBoardingSchema = z
    .object({
        name: z.string().min(3, "Name must be atleast 3 characters long"),
        password: passwordSchema,
        confirmPassword: z.string().min(1, "Confirming password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords must match",
        path: ["confirmPassword"], // Path of the error
    })

export type OnBoardingFormValues = z.infer<typeof onBoardingSchema>