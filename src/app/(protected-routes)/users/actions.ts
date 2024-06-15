"use server"

import { auth } from "@/auth"
import db from "@/lib/db"
import { ActionError } from "@/lib/utils"
import { Role } from "@/types"
import { revalidatePath } from "next/cache"
import { ZodError } from "zod"
import { updateUserProfileSchema } from "./validation"

export async function updateProfile(
    newName: string,
    toBeUpdatedUserId: string
) {
    try {
        const { name: parsedNewName } = updateUserProfileSchema.parse({
            name: newName,
        })
        const session = await auth()
        if (!session) {
            throw new ActionError(
                "You must log in to do this action",
                "Unauthorized"
            )
        }
        if (
            session.user.id !== toBeUpdatedUserId &&
            session.user.role !== Role.Admin
        ) {
            throw new ActionError(
                `You do not have permission to edit this user's profile`,
                "Forbidden"
            )
        }

        const toBeEditedUser = await db.user.findUnique({
            where: { id: toBeUpdatedUserId },
        })
        if (!toBeEditedUser) {
            throw new ActionError(
                `Cannot find user with id '${toBeUpdatedUserId}'`,
                "Not Found"
            )
        }
        await db.user.update({
            where: { id: toBeUpdatedUserId },
            data: {
                name: parsedNewName,
            },
        })
        revalidatePath("/users/me")
        return {
            success: "Successfully updated profile",
        }
    } catch (err) {
        if (err instanceof ActionError) {
            return {
                error: {
                    title: err.title || "Oh Noose!",
                    message: err.message,
                },
            }
        } else if (err instanceof ZodError) {
            return {
                error: {
                    title: "Invalid Input",
                    message: "Please fill in each fields correctly",
                },
            }
        }
        return {
            error: {
                title: "Oh Noose!",
                message: "Something went wrong",
            },
        }
    }
}
