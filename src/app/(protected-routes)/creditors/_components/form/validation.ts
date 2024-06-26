import { ClaimType, CreditorType } from "@/types"
import { z } from "zod"

const optionalEmailSchema = z
    .string()
    .max(100)
    .email()
    .optional()
    .or(z.literal(""))

const attachmentsSchema = z.array(
    z.object({
        nama: z.string().min(1, "Nama lampiran tidak boleh kosong").max(100),
        ready: z.coerce.boolean(),
        deskripsi: z.string().max(255).optional(),
    })
)

const kuasaHukumSchema = z.object({
    namaKuasaHukum: z
        .string()
        .min(1, "Nama kuasa hukum harus diisi")
        .max(255)
        .optional(),
    emailKuasaHukum: optionalEmailSchema,
    nomorTeleponKuasaHukum: z.string().min(5).max(255).optional(),
    alamatKorespondensi: z.string().min(5).max(255).optional(),
})

export const AddCreditorSchema = z
    .object({
        nama: z
            .string({ required_error: "Nama kreditor harus diisi" })
            .min(1, "Nama kreditor harus diisi")
            .max(255),
        jenis: z
            .string()
            .min(1)
            .refine(
                (input) =>
                    (Object.values(CreditorType) as string[]).includes(input),
                {
                    message: "Pilih jenis dari kreditor",
                }
            ),
        NIKAtauNomorAktaPendirian: z.string().optional(),
        alamat: z.string().min(5).max(255).optional().or(z.literal("")),
        email: optionalEmailSchema,
        nomorTelepon: z.string().min(5).max(255).optional().or(z.literal("")),
        tagihanPokok: z.coerce
            .number()
            .min(100, "Minimum total tagihan adalah Rp 100"),
        bungaTagihan: z.coerce.number().optional(),
        dendaTagihan: z.coerce.number().optional(),
        sifatTagihan: z
            .string()
            .min(1)
            .refine(
                (input) =>
                    (Object.values(ClaimType) as string[]).includes(input),
                { message: "Sifat tagihan salah" }
            ),
        attachments: attachmentsSchema,
    })
    .and(kuasaHukumSchema.optional())

export type CreditorFormValues = {
    tagihanPokok: string | number
    bungaTagihan: string | number
    dendaTagihan: string | number
} & Omit<z.infer<typeof AddCreditorSchema>, "tagihanPokok" | 'bungaTagihan' | 'dendaTagihan'>

export type EditCreditorFormValues = {}
