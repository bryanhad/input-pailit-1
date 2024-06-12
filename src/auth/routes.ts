/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication!
 * @type {string[]}
 */
export const publicRoutes = [
    '/',
    // '/dashboard'
]

/**
 * An array of routes that are accessible for authentication purposes
 * Routes that start with this prefix are used for authentication purposes
 * @type {string[]}
 */
export const authRoutes = [
    '/auth/on-boarding/',
    '/auth/confirmation/',
    '/auth/sign-in'
]

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const API_AUTH_PREFIX = '/api/auth'

/**
 * The default redirect path after loggin in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = '/dashboard'

