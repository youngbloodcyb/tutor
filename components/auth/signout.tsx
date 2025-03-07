"use client";

import { signOut } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function SignOut() {
  const router = useRouter();
  return (
    <Button
      onClick={() => {
        signOut();
        router.refresh();
      }}
    >
      Log out
    </Button>
  );
}
