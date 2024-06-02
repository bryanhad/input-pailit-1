import type { JestConfigWithTsJest } from "ts-jest"
const config: JestConfigWithTsJest = {
    clearMocks: true,
    preset: "ts-jest",
    testEnvironment: "node",
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
    },
    resolver: "<rootDir>/jest-resolver.js", // Add custom resolver
    setupFilesAfterEnv: ["<rootDir>/__mocks__/prisma.mock.ts"],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
        "^.+\\.(js|jsx)$": [
            "babel-jest",
            { configFile: "./babel-jest.config.js" },
        ],
    },
    transformIgnorePatterns: [
        "/node_modules/(?!(@auth/prisma-adapter|next-auth|@auth/core|oauth4webapi|nanoid))",
    ],
}

export default config
