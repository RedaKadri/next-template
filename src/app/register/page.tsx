import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import RegisterForm from "./_components/register-form";

export default function Register() {
  return (
    <Card className="z-50 max-w-md rounded-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Register</CardTitle>
        <CardDescription className="text-xs md:text-sm">Enter your information to create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
