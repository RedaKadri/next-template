import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

import { IconLogout } from "@tabler/icons-react";
import { toast } from "sonner";

import { auth } from "@/server/lib/auth";

import { Button } from "./ui/button";
import { ModeToggle } from "./ui/theme/mode-toggle";

async function Header() {
  const userSession = await auth.api.getSession({ headers: await headers() });

  const onSubmit = async () => {
    "use server";
    const res = await auth.api.signOut({ headers: await headers() });
    if (res.success) {
      redirect("/login");
    } else {
      toast.error("something went wrong");
    }
  };

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 mx-auto flex w-[90%] items-center justify-between py-6 backdrop-blur">
      <Link href="/" className="font-mono text-3xl font-bold text-muted-foreground">
        &lt;<span className="mx-1 text-foreground">Next Temp</span>&#47;&gt;
      </Link>
      <div className="flex justify-center gap-4">
        {userSession && (
          <form action={onSubmit}>
            <Button variant="outline" size={"icon"} type="submit">
              <IconLogout />
            </Button>
          </form>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
