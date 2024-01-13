"use server";

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { sendPasswordResetEmail } from "@/lib/mail";
import { generatePasswordResetToken } from "@/lib/tokens";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  // Validate the input values
  const validatedFields = ResetSchema.safeParse(values);

  // If the values are invalid, return an error
  if (!validatedFields.success) {
    return { error: "Invalid email address" };
  }

  // Destructure the email address from the validated fields
  const { email } = validatedFields.data;

  // Check if a user exists with the given email address
  const existingUser = await getUserByEmail(email);

  // If no user exists, return an error
  if (!existingUser) {
    return { error: "Email not found" };
  }

  // Generate a password reset token and send it to the user's email address
  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset email sent" };
};
