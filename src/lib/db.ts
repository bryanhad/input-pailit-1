import {PrismaClient} from '@prisma/client'

declare global {
    var globalPrisma: PrismaClient | undefined
}

const db = globalThis.globalPrisma || new PrismaClient()

export default db;

if (process.env.NODE_ENV !== 'production') globalThis.globalPrisma = db