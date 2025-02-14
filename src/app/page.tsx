"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth-client";

export default function Home() {
  const { data, isPending } = authClient.useSession();
  if (isPending) {
    return <p>waiting....</p>;
  }
  if (!data) {
    return <Link href="/login">Login</Link>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button
        onClick={async () => {
          await authClient.signOut();
        }}
      >
        Log out
      </Button>
    </div>
  );
}
