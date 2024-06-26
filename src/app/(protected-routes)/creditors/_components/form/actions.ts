"use server"

import { toSlug } from "@/lib/utils"
import { AddCreditorSchema, CreditorFormValues } from "./validation"
import { nanoid } from "nanoid"
import db from "@/lib/db"
import { revalidatePath } from "next/cache"
import { Attachment } from "@prisma/client"
import { ZodError } from "zod"

export async function addCreditor(userId: string, values: CreditorFormValues) {
    try {
        const {
            attachments,
            nama,
            tagihanPokok,
            bungaTagihan,
            dendaTagihan,
            jenis,
            sifatTagihan,
            NIKAtauNomorAktaPendirian,
            alamat,
            email,
            emailKuasaHukum,
            alamatKorespondensi,
            namaKuasaHukum,
            nomorTelepon,
            nomorTeleponKuasaHukum,
        } = AddCreditorSchema.parse(values)

        const slug = `${toSlug(nama)}-${nanoid(10)}`

        await db.$transaction(async (tx) => {
            const createdCreditor = await tx.creditor.create({
                data: {
                    slug,
                    nama,
                    userId,
                    tagihanPokok: String(tagihanPokok),
                    bungaTagihan:
                        bungaTagihan && bungaTagihan > 0
                            ? String(bungaTagihan)
                            : null,
                    dendaTagihan:
                        dendaTagihan && dendaTagihan > 0
                            ? String(dendaTagihan)
                            : null,
                    jenis: jenis.trim(),
                    sifatTagihan: sifatTagihan.trim(),
                    NIKAtauNomorAktaPendirian:
                        NIKAtauNomorAktaPendirian?.trim(),
                    alamat: alamat?.trim(),
                    alamatKorespondensi: alamatKorespondensi?.trim(),
                    email: email?.trim(),
                    emailKuasaHukum: emailKuasaHukum?.trim(),
                    namaKuasaHukum: namaKuasaHukum?.trim(),
                    nomorTelepon: nomorTelepon?.trim(),
                    nomorTeleponKuasaHukum: nomorTeleponKuasaHukum?.trim(),
                },
            })
            await tx.attachment.createMany({
                data: attachments.map((attachment) => {
                    return {
                        creditorId: createdCreditor.id,
                        ...attachment,
                    }
                }),
                skipDuplicates: true,
            })
        })
        revalidatePath("/dashboard")
        return {
            success: {
                title: "Successfully added new creditor",
                message: `Creditor '${nama}' has been added`,
            },
        }
    } catch (err) {
        if (err instanceof ZodError) {
            return {
                error: {
                    title: "Invalid Fields",
                    message: "Please enter all required fields",
                },
            }
        }
        return {
            error: {
                title: "Oh Noose!",
                message: "Something went wrong",
            },
        }
    }
}

export async function editCreditor(
    userId: string,
    values: CreditorFormValues,
    dirtyFields: {
        nama: boolean
        attachments: Omit<Attachment, "id" | "creditorId">[]
    },
    creditorId: string
) {
    try {
        const submitedFormValues = AddCreditorSchema.parse(values)

        const toBeUpdatedFields: Partial<
            CreditorFormValues & { slug: string }
        > = {}

        // Loop through dirtyfields, if the field is dirty, store the key value pair into toBeUpdatedFields
        for (const [key, value] of Object.entries(dirtyFields)) {
            if (value === true) {
                // Check if the key exists in submitedFormValues
                if (key in submitedFormValues) {
                    const typedKey = key as keyof CreditorFormValues
                    if (typedKey === "nama") {
                        toBeUpdatedFields.nama = submitedFormValues.nama
                        toBeUpdatedFields.slug = `${toSlug(
                            submitedFormValues.nama
                        )}-${creditorId}`
                    } else if (
                        typedKey !== "attachments" &&
                        typedKey !== "tagihanPokok" &&
                        typedKey !== "bungaTagihan" &&
                        typedKey !== "dendaTagihan"
                    ) {
                        toBeUpdatedFields[typedKey] =
                            submitedFormValues[typedKey]?.trim()
                    } else if (
                        typedKey === "tagihanPokok" ||
                        typedKey === "bungaTagihan" ||
                        typedKey === "dendaTagihan"
                    ) {
                        toBeUpdatedFields[typedKey] = String(
                            submitedFormValues[typedKey]
                        )
                    }
                }
            }
        }

        // INSERT ALL NEW ATTACHMENTS, IF ANY
        const attachmentsToBeUploaded = submitedFormValues.attachments.map(
            (attachment) => {
                return { creditorId, ...attachment }
            }
        )

        const updatedUserName = await db.$transaction(async (tx) => {
            // DELETE RELATED ATTACHMENTS BY creditorID
            await tx.attachment.deleteMany({
                where: { creditorId },
            })
            await tx.attachment.createMany({
                data: attachmentsToBeUploaded,
            })
            // UPDATE THE CREDITOR DETAILS
            const updatedUser = await tx.creditor.update({
                where: { id: creditorId },
                data: {
                    ...toBeUpdatedFields,
                    namaKuasaHukum: submitedFormValues.namaKuasaHukum || null,
                    emailKuasaHukum: submitedFormValues.emailKuasaHukum || null,
                    alamatKorespondensi:
                        submitedFormValues.alamatKorespondensi || null,
                    nomorTeleponKuasaHukum:
                        submitedFormValues.nomorTeleponKuasaHukum || null,
                    lastUpdatedByUserId: userId,
                } as any,
            })
            return updatedUser.nama
        })

        revalidatePath("/dashboard")
        return {
            success: {
                title: "Successfully edited creditor",
                message: `Creditor '${updatedUserName}' has been edited`,
            },
        }
    } catch (err) {
        if (err instanceof ZodError) {
            return {
                error: {
                    title: "Invalid Fields",
                    message: "Please enter all required fields",
                },
            }
        }
        return {
            error: {
                title: "Oh Noose!",
                message: "Something went wrong",
            },
        }
    }
}
