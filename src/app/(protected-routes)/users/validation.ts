import { z } from "zod";

export const updateUserProfileSchema = z.object({
    name: z.string().min(3).max(50),
})

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>