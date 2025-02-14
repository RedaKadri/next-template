import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import LoginForm from "./_components/login-form";

export default function Login() {
  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Login</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
