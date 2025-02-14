"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { RingResizeSpinner } from "@/components/icons/spinners";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { ForgetPasswordSchema } from "@/types";

export default function ForgetPassword() {
  const form = useForm<z.infer<typeof ForgetPasswordSchema>>({
    resolver: zodResolver(ForgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function forgetPassword(values: z.infer<typeof ForgetPasswordSchema>) {
    await authClient.forgetPassword({
      email: values.email,
      redirectTo: "/reset-password",
      fetchOptions: {
        onSuccess: () => {
          toast.success("We've sent a password reset link to your email");
        },
        onError: () => {
          toast.error("An error occurred. Please try again");
        },
      },
    });
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Forgot password</CardTitle>
        <CardDescription className="text-xs md:text-sm">Enter your email to reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(forgetPassword)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="user@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
              {form.formState.isSubmitting && <RingResizeSpinner />}
              <span>Send reset link</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
