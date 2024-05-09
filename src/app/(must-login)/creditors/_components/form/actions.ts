"use server"

import { toSlug } from "@/lib/utils"
import { AddCreditorSchema, CreditorFormValues } from "./validation"
import { nanoid } from "nanoid"
import db from "@/lib/db"
import { revalidatePath } from "next/cache"

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
export async function editCreditor(values: CreditorFormValues) {
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
