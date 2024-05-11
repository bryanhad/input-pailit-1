"use server"

import { toSlug } from "@/lib/utils"
import { AddCreditorSchema, CreditorFormValues } from "./validation"
import { nanoid } from "nanoid"
import db from "@/lib/db"
import { revalidatePath } from "next/cache"
import { Attachment } from "@prisma/client"

export async function addCreditor(values: CreditorFormValues) {
    const {
        attachments,
        totalTagihan,
        nama,
        jenis,
        sifatTagihan,
        NIKAtauNomorAktaPendirian,
        alamat,
        alamatKuasaHukum,
        email,
        emailKuasaHukum,
        korespondensi,
        namaKuasaHukum,
        nomorTelepon,
        nomorTeleponKuasaHukum,
    } = AddCreditorSchema.parse(values)

    const slug = `${toSlug(nama)}-${nanoid(10)}`

    const attachmentsToBeUploaded = attachments.map((attachment) => {
        return {
            creditorId: "1",
            ...attachment,
        }
    })

    await db.attachment.createMany({
        data: attachmentsToBeUploaded,
        skipDuplicates: true,
    })

    await db.creditor.create({
        data: {
            slug,
            nama,
            totalTagihan: String(totalTagihan),
            jenis: jenis.trim(),
            sifatTagihan: sifatTagihan.trim(),
            NIKAtauNomorAktaPendirian: NIKAtauNomorAktaPendirian?.trim(),
            alamat: alamat?.trim(),
            alamatKuasaHukum: alamatKuasaHukum?.trim(),
            email: email?.trim(),
            emailKuasaHukum: emailKuasaHukum?.trim(),
            korespondensi: korespondensi?.trim(),
            namaKuasaHukum: namaKuasaHukum?.trim(),
            nomorTelepon: nomorTelepon?.trim(),
            nomorTeleponKuasaHukum: nomorTeleponKuasaHukum?.trim(),
        },
    })

    revalidatePath("/dashboard")
}

// TODO: FIX EDIT CREDITOR FUNCTION!
export async function editCreditor(
    values: CreditorFormValues,
    dirtyFields: {
        nama: boolean
        attachments: Omit<Attachment, "id" | "creditorId">[]
    },
    creditorId: string
) {
    const {
        attachments,
        totalTagihan,
        nama,
        jenis,
        sifatTagihan,
        NIKAtauNomorAktaPendirian,
        alamat,
        alamatKuasaHukum,
        email,
        emailKuasaHukum,
        korespondensi,
        namaKuasaHukum,
        nomorTelepon,
        nomorTeleponKuasaHukum,
    } = AddCreditorSchema.parse(values)
    const submitedFormValues = AddCreditorSchema.parse(values)
    console.log({
        namaKuasaHukum,
        alamatKuasaHukum,
        nomorTeleponKuasaHukum,
        emailKuasaHukum,
    })

    const toBeUpdatedFields: Partial<CreditorFormValues & { slug: string }> = {}

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
                    typedKey !== "totalTagihan"
                ) {
                    toBeUpdatedFields[typedKey] =
                        submitedFormValues[typedKey]?.trim()
                } else if (typedKey === "totalTagihan") {
                    toBeUpdatedFields.totalTagihan = String(
                        submitedFormValues[typedKey]
                    )
                }
            }
        }
    }

    // DELETE RELATED ATTACHMENTS BY creditorID
    const deleteCreditorAttachments = db.attachment.deleteMany({
        where: { creditorId },
    })
    // INSERT ALL NEW ATTACHMENTS, IF ANY
    const attachmentsToBeUploaded = attachments.map((attachment) => {
        return { creditorId, ...attachment }
    })
    const addNewAttachments = db.attachment.createMany({
        data: attachmentsToBeUploaded,
    })
    // UPDATE THE CREDITOR DETAILS
    const updateCreditor = db.creditor.update({
        where: { id: creditorId },
        data: {
            ...toBeUpdatedFields,
            namaKuasaHukum: submitedFormValues.namaKuasaHukum || null,
            emailKuasaHukum: submitedFormValues.emailKuasaHukum || null,
            alamatKuasaHukum: submitedFormValues.alamatKuasaHukum || null,
            nomorTeleponKuasaHukum:
                submitedFormValues.nomorTeleponKuasaHukum || null,
        } as any,
    })

    await db.$transaction([
        deleteCreditorAttachments,
        addNewAttachments,
        updateCreditor,
    ])

    revalidatePath("/dashboard")
}
