import db from '@/lib/db'
import { redirect } from 'next/navigation'
import React from 'react'
import OnBoardingForm from './OnBoardingForm'
import MainWrapper from '@/components/ui/main-wrapper'
import { DEFAULT_LOGIN_REDIRECT } from '@/auth/routes'
import { auth } from '@/auth'

async function OnBoardingPage({
    params,
}: {
    params: { userId?: string[] }
}) {
    const session = await auth()
    // if the user is signed in, redirect them to '/dashboard'
    if (session) {
        redirect(DEFAULT_LOGIN_REDIRECT)
    }
    
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