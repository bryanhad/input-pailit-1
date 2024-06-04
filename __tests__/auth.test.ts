import { sendVerificationEmailToNewUser } from "../src/app/auth/actions"
import { mockResolvedValue_ReturnPartial, prismaMock } from "../__mocks__/prisma.mock"
import { User } from "@prisma/client"

// describe("testing function createVerificationTokenTEST()", () => {
//     beforeEach(() => {
//         jest.clearAllMocks()
//     })
//     it("should return a string", async () => {
//         const TEST_EMAIL = "emailtest@gmail.com"
//         const testVerificationToken = {
//             email: TEST_EMAIL,
//             token: "TEEEEEST",
//             expires: new Date(Date.now() + 30 * 24 * 3600 * 1000),
//         }

//         prismaMock.verificationToken.create.mockResolvedValue(
//             testVerificationToken
//         )

//         await expect(createVerificationTokenTEST(TEST_EMAIL)).resolves.toEqual(TEST_EMAIL)
//     })
// })

describe("Admin tries to create user with an email of existing user", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test to avoid interference
      });

      it('should throw an error if user already exists', async () => {
        const testEmail = 'TEST_MAIL@gmail.com' 
        mockResolvedValue_ReturnPartial<User>({mockMethod: prismaMock.user.findUnique, partialReturn: {email:testEmail}});
    
        const res = await sendVerificationEmailToNewUser(testEmail);
    
        expect(res).toEqual({
          error: { title: 'Cannot use this email', message: 'User with this email already exists.' },
        });
      });
})
