"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenbyToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { database } from "@/lib/prismadb";

export const newPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null) => {
if (!token) {
    return { error: "Missing token" };
}

const validatedFields = NewPasswordSchema.safeParse(values);

if (!validatedFields.success) {
    return { error: "Invalid password" };
}

const { password } = validatedFields.data;

const existingToken = await getPasswordResetTokenbyToken(token);

if (!existingToken) {
    return { error: "Invalid token" };
}

const hasExpired = new Date(existingToken.expires) < new Date();

if (hasExpired) {
    return { error: "Token has expired" };
}

const existingUser = await getUserByEmail(existingToken.email);

if (!existingUser) {
    return { error: "Email does not exist" };
}

const hashedPassword = await bcrypt.hash(password, 10);

await database.user.update({
    where: {
        id: existingUser.id
    },
    data: {
        password: hashedPassword
    }
});

await database.passwordResetToken.delete({
    where: {
        id: existingToken.id
    }
});

return { success: "Password updated" };
}