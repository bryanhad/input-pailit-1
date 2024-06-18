import { Creditor, PrismaClient, User } from "@prisma/client"
import {
    placeholderAttachments,
    placeholderCreditors,
    placeholderUsers,
} from "./placeholder-data"
import { hash } from "bcryptjs"
import { UserStatus } from "../src/types"

const prisma = new PrismaClient()

async function main() {
    const toBeInsertedUsers = placeholderUsers as User[]
    const toBeInsertedCreditors = placeholderCreditors.map((creditor) => {
        const filteredToBeInsertedUsers = toBeInsertedUsers.filter((user) => {
            return (
                [UserStatus.active, UserStatus.inactive] as string[]
            ).includes(user.status)
        })

        const randomUserIndex = Math.floor(
            Math.random() * filteredToBeInsertedUsers.length
        )
        return {
            ...creditor,
            userId: filteredToBeInsertedUsers[randomUserIndex].id,
        }
    }) as Creditor[]

    await Promise.all(
        toBeInsertedUsers.map(async (user) => {
            let seedPassword = user.password
            if (seedPassword) {
                const hashedPassword = await hash(seedPassword as string, 10)
                seedPassword = hashedPassword
            }
            await prisma.user.upsert({
                where: {
                    id: user.id,
                },
                update: { ...user, password: seedPassword },
                create: { ...user, password: seedPassword },
            })
        })
    )
    await Promise.all(
        toBeInsertedUsers.map(async (user) => {
            if (user.status !== UserStatus.notVerified) {
                await prisma.session.upsert({
                    where: { userId: user.id },
                    update: {
                        expires: new Date(Date.now() + 30 * 24 * 3600 * 1000), // Session expires in 30 days
                        userId: user.id,
                        sessionToken: crypto.randomUUID(),
                    },
                    create: {
                        expires: new Date(Date.now() + 30 * 24 * 3600 * 1000), // Session expires in 30 days
                        userId: user.id,
                        sessionToken: crypto.randomUUID(),
                    },
                })
            }
        })
    )

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
