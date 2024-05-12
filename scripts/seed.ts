import { Creditor, PrismaClient } from "@prisma/client"
import {
    placeholderAttachments,
    placeholderCreditors,
} from "./placeholder-data"

const prisma = new PrismaClient()

async function main() {
    const toBeInsertedCreditors = placeholderCreditors as Creditor[]

    await Promise.all(
        toBeInsertedCreditors.map(async (creditor) => {
            await prisma.creditor.upsert({
                where: {
                    slug: creditor.slug,
                },
                update: creditor,
                create: creditor,
            })
        })
    )
    await Promise.all(
        placeholderAttachments.map(async (attachment) => {
            await prisma.attachment.upsert({
                where: {
                    id: attachment.id,
                },
                update: attachment,
                create: attachment,
            })
        })
    )
}

main()
    .then(async () => {
        await prisma.$disconnect()
        console.log("Successfully seed the database!")
    })
    .catch(async (err) => {
        console.error("Error while seeding database", err)
        await prisma.$disconnect()
        process.exit(1)
    })
