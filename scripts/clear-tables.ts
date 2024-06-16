import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    await prisma.$transaction(async (tx) => {
        await tx.attachment.deleteMany()
        await tx.creditor.deleteMany()
        await tx.verificationToken.deleteMany()
        await tx.user.deleteMany()
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
        console.log('Successfully cleared all data on all tables!')
    })
    .catch(async (err) => {
        console.error('Error while clearing tables', err)
        await prisma.$disconnect()
        process.exit(1)
    })
