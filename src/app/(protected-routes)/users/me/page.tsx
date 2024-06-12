import { mustLogin } from '@/auth/actions'
import React from 'react'

async function MePage() {
    const user = await mustLogin()
  return (
    <div></div>
  )
}

export default MePage