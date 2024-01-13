"use server";

import * as z from "zod";

import { database } from "@/lib/prismadb";
import { update } from "@/auth";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail, getUserByID } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";

export const settings = async (values: z.infer<typeof SettingsSchema>) => {
  // Find the current user
  const user = await currentUser();

  // If the user is not logged in, return an error
  if (!user) {
    return { error: "You must be logged in to update settings!" };
  }

  // Find the user in the database
  const dbUser = await getUserByID(user.id);

  // If the user is not found, return an error
  if (!dbUser) {
    return { error: "User not found!" };
  }

  // If the user is using OAuth, remove the email, password, and 2FA fields
  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
  }

  // If the user is not using OAuth, validate the email and password fields
  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    // If the email is already in use, return an error
    if (existingUser && existingUser.id !== user.id) {
      return { error: "Email already in use!" };
    }

    // If the email is not already in use, update the user's email
    const verificationToken = await generateVerificationToken(values.email);

    // Send the verification email
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    // Return a success message
    return { success: "Verification email sent!" };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const passwordsMatch = await bcrypt.compare(
      values.password,
      dbUser.password
    );

    if (!passwordsMatch) {
      return { error: "Incorrect password!" };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.password = hashedPassword;
    values.newPassword = undefined;
  }
  const updatedUser = await database.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });

  update({
    user: {
      name: updatedUser.name,
      email: updatedUser.email,
    },
  });

  return { success: "Settings updated!" };
};
