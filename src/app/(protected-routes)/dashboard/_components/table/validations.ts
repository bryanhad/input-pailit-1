import { z } from "zod"

export const creditorFilterSchema = z.object({
    q: z.string().optional(),
    creditorType: z.string().optional(),
    claimType: z.string().optional(),
})

export type CreditorFilterValues = z.infer<typeof creditorFilterSchema>;
