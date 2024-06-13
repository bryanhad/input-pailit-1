'use server'

import db from '@/lib/db'
import { ActionError } from '@/lib/utils'
import { revalidatePath } from 'next/cache'

export async function updateProfile(newName: string, userEmail: string) {
    try {
        const toBeEditedUser = await db.user.findUnique({
            where: { email: userEmail },
        })
        if (!toBeEditedUser) {
            throw new ActionError(
                `Cannot find user with email '${userEmail}'`,
                'Not Found'
            )
        }
        await db.user.update({
            where: { email: userEmail },
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
                title:'Oh Noose!',
                message: 'Something went wrong',
            },
        }
    }
}
