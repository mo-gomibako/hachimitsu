import { router, Slot } from "expo-router";
import { useEffect } from "react";

import { useSession } from "@/components/SessionProvider";

export default function Layout() {
  const { data } = useSession();

  useEffect(() => {
    if (data === "nologin") {
      router.push("/sign-in");
    }
  }, [data]);

  return <Slot />;
}
