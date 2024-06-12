import { mustNotLogin } from '@/auth/actions'
import MainWrapper from '@/components/ui/main-wrapper'
import db from '@/lib/db'
import { redirect } from 'next/navigation'
import OnBoardingForm from './OnBoardingForm'

async function OnBoardingPage({
    params,
}: {
    params: { userId?: string[] }
}) {
    await mustNotLogin()
    
    // 1. secure the userId from url params
    const userId = params.userId ? params.userId[0] : undefined
    if (!userId) {
        redirect("/")
    }
    // 2. get user from userId and verify it
    const user = await db.user.findUnique({where: {id:userId}})
    if (!user) {
        return <div>INVALID USER ID</div>
    }
    // TODO: SHOULD BE HANDLED BY MIDDLEWARE
    // // 3. kick the user if they've already filled in their name and password 
    // if (user.name && user.password) {
    //     redirect('/')
    // }

  return (
    <div>
        <MainWrapper title={'Wellcome new comer!'} titleDesc='Complete your account set up to sign in'>
        <OnBoardingForm userId={userId}/>

        </MainWrapper>
    </div>
  )
}

export default OnBoardingPage