'use server'

import { auth } from '@/auth'
import db from '@/lib/db'
import { ActionError } from '@/lib/utils'
import { Role } from '@/types'

// TODO: DEDUPLICATE NEXT-AUTH REQUEST!
// you can use cache function from react, and just wrap your auth function with it and use it anywhere in your code.
// https://www.youtube.com/shorts/n0Q1KKstNb0

async function checkIfAdmin() {
    const session = await auth()
    if (!session) {
        throw new ActionError(
            'You must log in to do this action',
            'Unauthorized'
        )
    }
    if (session.user.role !== Role.Admin) {
        throw new ActionError(
            'Only user with admin role can do this action',
            'Forbidden'
        )
    }
    return session.user.role === Role.Admin
}

export async function toggleUserActiveStatus(email: string) {
    try {
        await checkIfAdmin()
        const toBeUpdatedUser = await db.user.findUnique({ where: { email } })
        if (!toBeUpdatedUser) {
            throw new ActionError(
                `Cannot find user with email ${email}`,
                'Not Found'
            )
        }
        await db.user.update({
            where: { email },
            data: { isActive: !toBeUpdatedUser.isActive },
        })
        return {
            success: {
                title: 'Successfully Updated User Status',
                message: `User '${toBeUpdatedUser.name}' is now ${
                    toBeUpdatedUser.isActive ? 'inactive' : 'active'
                }.`,
            },
        }
    } catch (err) {
        if (err instanceof ActionError) {
            return {
                error: {
                    title: err.title,
                    message: err.message,
                },
            }
        }
        return {
            error: {
                title: 'Oh Noose!',
                message: 'Something went wrong',
            },
        }
    }
}

export async function toggleUserRole(email: string) {
    try {
        await checkIfAdmin()

        const toBeUpdatedUser = await db.user.findUnique({ where: { email } })
        if (!toBeUpdatedUser) {
            throw new ActionError(
                `Cannot find user with email ${email}`,
                'Not Found'
            )
        }
        const newRole =
            toBeUpdatedUser.role === Role.User ? Role.Admin : Role.User
        await db.user.update({
            where: { email },
            data: { role: newRole },
        })
        return {
            success: {
                title: 'Successfully Updated Role',
                message: `${toBeUpdatedUser.name}'s role has been updated to ${newRole}`,
            },
        }
    } catch (err) {
        if (err instanceof ActionError) {
            return {
                error: {
                    title: err.title,
                    message: err.message,
                },
            }
        }
        return {
            error: {
                title: 'Oh Noose!',
                message: 'Something went wrong',
            },
        }
    }
}
