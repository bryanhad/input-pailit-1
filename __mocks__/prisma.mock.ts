import { PrismaClient } from "@prisma/client"
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended"
import prismaClientInstance from "../src/lib/db"

jest.mock("../src/lib/db", () => ({
    __esModule: true,
    default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
    mockReset(prismaMock)
})

export const prismaMock =
    prismaClientInstance as unknown as DeepMockProxy<PrismaClient>

// Utility function to handle partials
export function mockResolvedValuePartial<T>({
    mockMethod,
    partialReturn,
}: {
    mockMethod: jest.Mock
    partialReturn: Partial<T>
}) {
    mockMethod.mockResolvedValue(partialReturn as T)
}
