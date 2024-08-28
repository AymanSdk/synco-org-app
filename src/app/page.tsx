"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { signOut } = useAuthActions();

  return (
    <div>
      <h1>Logged In Yaay!!</h1>
      <Button onClick={() => signOut()}>log out</Button>
    </div>
  );
}
