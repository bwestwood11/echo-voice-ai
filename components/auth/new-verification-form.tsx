"use client";

import { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "@/components/auth/card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return
    if (!token) {
      setError("Token is missing");
      return;
    }

    newVerification(token).then((data) => {
      setSuccess(data.success);
      setError(data.error);
    }).catch(() => {
      setError("Something went wrong");
    })
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit, success, error]);

  return (
    <CardWrapper
      headerLabel="Confirming your verification"
      title="Confirming your verification"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && (
          <BeatLoader />
        )}
        <FormSuccess message={success} />
        {!success && (
           <FormError message={error} />
        )}
      </div>
    </CardWrapper>
  );
};