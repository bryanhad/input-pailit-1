import { z } from 'zod'

export const creditorFilterSchema = z.object({
    q: z.string().optional(),
    creditorType: z.string().optional(),
    claimType: z.string().optional(),
    createdBy: z.string().optional(),
    // TODO: PERHAPS MAKE A FILTER FOR CREATED AT??
})

export type CreditorFilterValues = z.infer<typeof creditorFilterSchema>

export type FetchCreditorsSearchParams = CreditorFilterValues & {size?:string; page?:string}