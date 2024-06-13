import { Creditor, PrismaClient, User } from '@prisma/client'
import {
    placeholderAttachments,
    placeholderCreditors,
    placeholderUsers,
} from './placeholder-data'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
    const toBeInsertedUsers = placeholderUsers as User[]
    const toBeInsertedCreditors = placeholderCreditors.map((creditor) => {
        const randomUserIndex = Math.floor(
            Math.random() * toBeInsertedUsers.length
        )
        return {
            ...creditor,
            userId: toBeInsertedUsers[randomUserIndex].id,
        }
    }) as Creditor[]

    await Promise.all(
        toBeInsertedUsers.map(async (user) => {
            const hashedPassword = await hash(user.password as string, 10)
            await prisma.user.upsert({
                where: {
                    id: user.id,
                },
                update: { ...user, password: hashedPassword },
                create: { ...user, password: hashedPassword },
            })
        })
    )
    await Promise.all(
        toBeInsertedUsers.map(async (user) => {
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
        console.log('Successfully seed the database!')
    })
    .catch(async (err) => {
        console.error('Error while seeding database', err)
        await prisma.$disconnect()
        process.exit(1)
    })
