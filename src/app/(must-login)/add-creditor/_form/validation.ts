import { z } from 'zod'

const optionalEmailSchema = z
    .string()
    .max(100)
    .email()
    .optional()
    .or(z.literal(''))

const attachmentsSchema = z.array(
    z.object({
        nama: z.string().min(1, 'Nama lampiran tidak boleh kosong').max(100),
        ready: z.coerce.boolean(),
        deskripsi: z.string().max(255).optional(),
    })
)

const kuasaHukumSchema = z.object({
    namaKuasaHukum: z.string().min(4).max(255).optional(),
    emailKuasaHukum: optionalEmailSchema,
    nomorTeleponKuasaHukum: z.string().min(5).max(255).optional(),
    alamatKuasaHukum: z.string().min(5).max(255).optional(),
})

export const AddCreditorSchema = z
    .object({
        nama: z.string().min(2).max(255),
        jenis: z
            .string()
            .min(1)
            .refine(
                (input) => ['INSTANSI/PERUSAHAAN', 'PRIBADI'].includes(input),
                {
                    message: 'Pilih jenis dari kreditor',
                }
            ),
        NIKAtauNomorAktaPendirian: z.string().optional(),
        alamat: z.string().min(2).max(255).optional(),
        email: optionalEmailSchema,
        nomorTelepon: z.string().min(2).max(255).optional(),
        korespondensi: z.string().optional(),
        totalTagihan: z.coerce
            .number()
            .min(100, 'Minimum total tagihan adalah Rp 100'),
        sifatTagihan: z
            .string()
            .min(1)
            .refine(
                (input) =>
                    ['SEPARATIS', 'PREFEREN', 'KONKUREN'].includes(input),
                { message: 'Sifat tagihan salah' }
            ),
        attachments: attachmentsSchema,
    })
    .and(kuasaHukumSchema.optional())

export type AddCreditorValues = z.infer<typeof AddCreditorSchema>
