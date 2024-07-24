"use client";

import Appbar from "@repo/ui/Appbar";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function AppBarClient() {
  const router = useRouter();
  const session = useSession();
  return (
    <div>
      <Appbar
        onSignin={signIn}
        onSignout={async () => {
          await signOut();
          router.push("/signin");
        }}
        user={session.data?.user}
      />
    </div>
  );
}
export default AppBarClient;
