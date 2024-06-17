import { z } from "zod";

export const updateUserProfileSchema = z.object({
    name: z.string().min(3).max(50),
})

export type UpdateUserProfileValues = z.infer<typeof updateUserProfileSchema>

export const userDetailFilterSchema = z.object({
    q: z.string().optional(),
    creditorType: z.string().optional(),
    claimType: z.string().optional(),
})

export type  userDetailFilterValues = z.infer<typeof userDetailFilterSchema>
