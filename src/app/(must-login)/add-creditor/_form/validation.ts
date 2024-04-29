import { z } from "zod"

const imageSchema = z
    .custom<File | undefined>()
    .refine((input) => {
        return (
            !input || (input instanceof File && input.type.startsWith("image/"))
        )
    }, "Please select an image file")
    .refine((input) => {
        // if input is not provided, is okey..
        // if it is provided, must be less than 2 MB
        return !input || input.size < 1024 * 1024 * 2
    }, "File must less than 2MB")

const attachmentsSchema = z.array(
    z
        .object({
            attachmentName: z
                .string()
                .max(100)
                .email()
                .optional()
                .or(z.literal("")),
            attachmentFile: imageSchema,
            attachmentDescription: z.string().max(50).optional(),
        })
        .refine((data) => data.attachmentFile || data.attachmentDescription, {
            message: "Image or Description is required",
            path: ["attachmentFile"],
        })
)

export const AddCreditorSchema = z
    .object({
        name: z.string().min(2).max(50),
        address: z.string().min(2).max(50),
        email: z.string().min(2).max(50),
        phoneNumber: z.string().min(2).max(50),
        category: z.string().min(2).max(50),
        legalRepresentativeName: z.string().min(2).max(50),
        legalRepresentativePhoneNumber: z.string().min(2).max(50),
        legalRepresentativeAddress: z.string().min(2).max(50),
        creditorType: z.string().min(2).max(50),
        totalClaimAmount: z.string().min(2).max(50),
        paidClaimAmount: z.string().min(2).max(50),
        claimAmount: z.string().min(2).max(50),
        attachments: attachmentsSchema,
    })

export type AddCreditorValues = z.infer<typeof AddCreditorSchema>
