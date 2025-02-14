"use client";

import { useRouter, useSearchParams } from "next/navigation";

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
import { ResetPasswordSchema } from "@/types";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  async function resetPassword(values: z.infer<typeof ResetPasswordSchema>) {
    if (!token) {
      toast.error("Invalid or missing reset password token");
      return;
    }
    await authClient.resetPassword({
      newPassword: values.password,
      token,
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
        },
        onError: (ctx) => {
          console.log(ctx);
          toast.error(ctx.error.message);
        },
      },
    });
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>Enter new password and confirm it to reset your password</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(resetPassword)} className="space-y-5">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password_confirmation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
              {form.formState.isSubmitting && <RingResizeSpinner />}
              <span>Rest password</span>
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
