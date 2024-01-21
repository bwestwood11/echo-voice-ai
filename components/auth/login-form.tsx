"use client"

import * as z from "zod"
import { useState, useTransition } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Input } from "@/components/ui/input";
  import { Button } from "@/components/ui/button";
  import { FormError } from "@/components/form-error";
  import { FormSuccess } from "@/components/form-success";
  import Link from "next/link";
  import { login } from "@/actions/login";

const LoginForm = () => {
    const [showTwoFactor, setShowTwoFactor] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

   const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
    });

    const onSubmit = (values: z.infer<typeof LoginSchema>) => {
        setError("");
        setSuccess("");
        setLoading(true);
        startTransition(() => {
          login(values)
            .then((data) => {
              if (data?.error) {
                setError(data.error);
                setLoading(false);
              }
    
              if (data?.success) {
                form.reset();
                setSuccess(data.success);
                setLoading(false);
              }
    
            //   if (data?.twoFactor) {
            //     setShowTwoFactor(true);
            //   }
            })
            .catch(() => setError("Something went wrong!"));
        });
      };

    return (
        <CardWrapper
          headerLabel="Welcome back"
          title="Login"
          backButtonHref="/auth/register"
          backButtonLabel="Don't have an account?"
          showSocial
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                {showTwoFactor && (
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Two Factor Code</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="123456"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                {!showTwoFactor && (
                  <>
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="john.doe@example.com"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="******"
                              type="password"
                            />
                          </FormControl>
                          <Button
                            size="sm"
                            variant="link"
                            asChild
                            className="px-0 font-normal"
                          >
                            <Link href="/auth/reset">Forgot password?</Link>
                          </Button>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type="submit" disabled={isPending} className="w-full">
                {showTwoFactor && "Confirm"}
                {!showTwoFactor && (loading ? "Loading..." : "Login")}
              </Button>
            </form>
          </Form>
        </CardWrapper>
      );
}

export default LoginForm