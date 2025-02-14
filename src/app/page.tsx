"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import authClient from "@/lib/auth-client";

export default function Home() {
  const { data, isPending } = authClient.useSession();
  if (isPending) {
    return <p>waiting....</p>;
  }
  if (!data) {
    return (
      <Link href="/login" className={buttonVariants()}>
        Login
      </Link>
    );
  }

  return (
    <Card className="max-w-md">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">{data.user.name}</CardTitle>
      </CardHeader>
      <CardContent>{data.user.email}</CardContent>
    </Card>
  );
}
