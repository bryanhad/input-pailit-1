import { mustNotLogin } from "@/auth/actions"
import SignInForm from "@/auth/components/sign-in-form"
import H2 from "@/components/ui/h2"

async function SignInPage() {
    await mustNotLogin()
    
    return (
        <div className="w-full max-w-[450px] bg-white px-6 py-8 rounded-md shadow-sm mx-auto mt-[5vh]">
            <H2 className="text-center text-4xl">Sign in</H2>
            <SignInForm />
        </div>
    )
}

export default SignInPage
