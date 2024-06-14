import { z } from "zod"

export const userFilterSchema = z.object({
    uq: z.string().optional(),
    urole: z.string().optional(),
    // TODO: PERHAPS MAKE A FILTER FOR CREATED AT??
    // createdAt: z.string().optional(),
})

export type UserFilterValues = z.infer<typeof userFilterSchema>;
