import { PrismaClient } from "@prisma/client"

const prismaClientSingleton = () => {
    // TODO: Make this edge-compatible if deploying to vercel, cuz our middleware would run on the edge!
    // with supabase, just use the connection string that supports serverless..
    return new PrismaClient()
}

declare global {
    var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>
}

const db = globalThis.prismaGlobal ?? prismaClientSingleton()

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db
