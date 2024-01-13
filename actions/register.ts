"use server";

import * as z from "zod";
import { database } from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.parse(values);

  if (!validatedFields) {
    return { error: "Invalid fields" };
  }

  const { email, password, name, confirmPassword } = validatedFields;
  const hashedPassword = await bcrypt.hash(password, 10);

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await database.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  await sendVerificationEmail(email, verificationToken.token);

  return { success: "Confirmation email sent!" };
};
