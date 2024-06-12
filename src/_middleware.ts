import { auth } from "@/auth"
import {
    API_AUTH_PREFIX,
    DEFAULT_LOGIN_REDIRECT,
    authRoutes,
    publicRoutes,
} from "@/auth/routes"
import { getToken } from 'next-auth/jwt'
import { MiddlewareConfig, NextResponse } from "next/server"

// const { auth } = NextAuth(authConfig)
const secret = process.env.AUTH_SECRET as string

export default auth(async (req) => {
    const token = await getToken({ req, secret, salt:'10' });
    const { nextUrl } = req
    const isLoggedIn = !!token;

    const isApiAuthRoute = nextUrl.pathname.startsWith(API_AUTH_PREFIX)
    const isAuthRoute = authRoutes.some((route) =>
        nextUrl.pathname.startsWith(route)
    )
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname)

    if (isApiAuthRoute) {
        // console.log("ALLOW EVERY SINGLE API ROUTE")
        return
    }

    if (isAuthRoute) {
        if (isLoggedIn) {
            // console.log("REDIRECT USER IF THEY ARE LOGGED IN")
            return NextResponse.redirect(
                new URL(DEFAULT_LOGIN_REDIRECT, req.url),
                { status: 303 }
            )
        }
        // console.log("ALLOW AUTH ROUTE FOR NOT LOGGED IN USER")
        return
    }

    if (!isLoggedIn && !isPublicRoute) {
        // console.log(
        //     "REDIRECT USER TO LOGIN IF THEY ARE NOT LOGGED IN AND TRIED TO ACCESS PROTECTED ROUTE"
        // )
        return NextResponse.redirect(new URL("/", req.url))
    }
    // console.log("ALLOW PUBLIC ROUTE")
    return
})

export const config: MiddlewareConfig = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
