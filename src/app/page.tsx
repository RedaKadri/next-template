"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { signOut, useSession } from "@/lib/auth-client";

export default function Home() {
  const { data, isPending } = useSession();
  if (isPending) {
    return <p>waiting....</p>;
  }
  if (!data) {
    return <Link href="/sign-in">Login</Link>;
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <Button
        onClick={async () => {
          await signOut();
        }}
      >
        Log out
      </Button>
    </div>
  );
}
