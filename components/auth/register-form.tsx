"use client"

import * as z from "zod";
import { useState, useTransition } from "react";
import { CardWrapper } from "./card-wrapper";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { register } from "@/actions/register";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";


const RegisterForm = () => {
const [success, setSuccess] = useState<string | undefined>("");
const [error, setError] = useState<string | undefined>("");
const [loading, setLoading] = useState<boolean>(false);
const [isPending, startTransition] = useTransition();

const form = useForm<z.infer<typeof RegisterSchema>>({
  resolver: zodResolver(RegisterSchema),
  defaultValues: {
    email: "",
    name: "",
    password: "",
  }
});

const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
  setError("");
  setSuccess("");
  setLoading(true);
  startTransition(() => {
     register(values).then((data) => {
      setSuccess(data.success);
      setError(data.error);
      setLoading(false);
     })
  });
}

  return (
    <CardWrapper
     headerLabel="Create an account"
     title="Register"
     backButtonHref="/auth/login"
     backButtonLabel="Already have an account?"
     showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input 
                  {...field}
                  placeholder="John Doe"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                  {...field}
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
                  placeholder="******"
                  type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input 
                  {...field}
                  placeholder="******"
                  type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
            />
            </div>
            <FormSuccess message={success} />
            <FormError message={error} />
            <Button disabled={isPending} type="submit" className="w-full">
              {loading ? "Loading..." : "Register"}
            </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}

export default RegisterForm