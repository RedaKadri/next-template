"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import GitHubIcon from "@/components/icons/github-icon";
import { RingResizeSpinner } from "@/components/icons/spinners";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { LoginSchema } from "@/types";

const LoginForm = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function loginEP(values: z.infer<typeof LoginSchema>) {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
      callbackURL: "/",
      fetchOptions: {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    });
  }

  const loginGH = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(loginEP)} className="space-y-4">
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
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="forget-password"
                    className="text-sm underline underline-offset-2 transition-colors hover:text-foreground"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <FormControl>
                  <Input placeholder="password" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-center space-x-2">
                <FormControl>
                  <Checkbox {...field} onCheckedChange={field.onChange} value={String(field.value)} />
                </FormControl>
                <FormLabel className="pb-2">Remember me</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={form.formState.isSubmitting} className="w-full">
            {form.formState.isSubmitting && <RingResizeSpinner />}
            <span>Log in with email</span>
          </Button>
        </form>
      </Form>

      <div className="relative my-3">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <Button disabled={form.formState.isSubmitting} onClick={loginGH} variant="outline" className="w-full">
        <GitHubIcon />
        GitHub
      </Button>
      <div className="pt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="underline">
          Register
        </Link>
      </div>
    </>
  );
};

export default LoginForm;
