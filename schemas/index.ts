import * as z from 'zod';

export const RegisterSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    name: z.string().min(1, {
        message: "Name is required"
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters long"
    })
})

export const LoginSchema = z.object({
    email: z.string().email({
      message: "Email is required",
    }),
    password: z.string().min(1, {
      message: "Password is required",
    }),
    code: z.optional(z.string()),
  });

  export const NewPasswordSchema = z.object({
    password: z.string().min(6, {
      message: "Minimum of 6 characters required",
    }),
  });

  export const ResetSchema = z.object({
    email: z.string().email({
      message: "Email is required",
    }),
  });

  export const SettingsSchema = z
  .object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    image: z.optional(z.string().url()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }

      return true;
    },
    {
      message: "New password is required",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }

      return true;
    },
    {
      message: "Password is required",
      path: ["password"],
    }
  );
