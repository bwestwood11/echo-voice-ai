"use server";

import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import * as z from "zod";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  // Validate the input values
  const validatedFields = LoginSchema.safeParse(values);

  // If the values are invalid, return an error
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  // Destructure the email and password from the validated fields
  const { email, password, code } = validatedFields.data;

  // Check if a user exists with the given email address
  const existingUser = await getUserByEmail(email);
  console.log("email in login action", email);
  console.log("existing User login page", existingUser);

  // If no user exists, return an error
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist." };
  }

  // If the user's email is not verified, send a verification email
  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return { success: "Confirmation email sent" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }

    throw error;
  }
};
