import { auth } from "@/app/auth"

export default auth((req) => {
    console.log("ROUTE: ", req.nextUrl.pathname)
})

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}
