import { auth } from '@/auth'
import SignInForm from '@/auth/components/sign-in-form'
import { DEFAULT_LOGIN_REDIRECT } from '@/auth/routes'
import H2 from '@/components/ui/h2'
import { redirect } from 'next/navigation'

async function SignInPage() {
    const session = await auth()
    // if the user is signed in, redirect them to '/dashboard'
    if (session) {
        redirect(DEFAULT_LOGIN_REDIRECT)
    }
  return (
    <div className='w-full max-w-[450px] bg-white px-6 py-8 rounded-md shadow-sm mx-auto mt-[5vh]'>
        <H2 className='text-center text-4xl'>Sign in</H2>
        <SignInForm />
    </div>
  )
}

export default SignInPage