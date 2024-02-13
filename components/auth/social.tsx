"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

export const Social = () => {
  const searchParams = useSearchParams();

  const DEFAULT_LOGIN_REDIRECT = "/dashboard";
  const callbackUrl = searchParams.get("callbackUrl");
  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        onClick={() => onClick("google")}
        size="lg"
        className="w-full"
        variant="outline"
      >
        <FcGoogle className="h-5 w-5" />
      </Button>
    </div>
  );
};
