'use server'

import { auth } from '@/auth'
import db from '@/lib/db'
import { ActionError } from '@/lib/utils'
import { Role } from '@/types'
import { revalidatePath } from 'next/cache'

export async function updateProfile(
    newName: string,
    toBeUpdatedUserId: string
) {
    try {
        const session = await auth()
        if (!session) {
            throw new ActionError(
                `You do not have permission to edit this user's profile`,
                'Forbidden'
            )
        }

        if (
            session.user.id !== toBeUpdatedUserId &&
            session.user.role !== Role.Admin
        ) {
            throw new ActionError(
                `You do not have permission to edit this user's profile`,
                'Forbidden'
            )
        }

        const toBeEditedUser = await db.user.findUnique({
            where: { id: toBeUpdatedUserId },
        })
        if (!toBeEditedUser) {
            throw new ActionError(
                `Cannot find user with id '${toBeUpdatedUserId}'`,
                'Not Found'
            )
        }
        await db.user.update({
            where: { id: toBeUpdatedUserId },
            data: {
                name: newName,
            },
        })
        revalidatePath('/users/me')
        return {
            success: 'Successfully updated profile',
        }
    } catch (err) {
        if (err instanceof ActionError) {
            return {
                error: {
                    title: err.title || 'Oh Noose!',
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
