export const db = {
    user: {
      findUnique: jest.fn(), // Mock implementation for the database query
    },
    verificationToken: {
        create: jest.fn()
    }
  };

export const sendVerificationEmail = jest.fn(); // Mock implementation for the email function
