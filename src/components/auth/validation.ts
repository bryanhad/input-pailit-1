import { z } from "zod"

export const emailSchema = z
    .string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email")
    
export const signInSchema = z.object({
    email: emailSchema,
})
