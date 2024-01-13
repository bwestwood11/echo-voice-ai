import { BsExclamationCircle } from "react-icons/bs";

import { CardWrapper } from "@/components/auth/card-wrapper";

export const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something went wrong!"
      title="Error"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="w-full flex justify-center items-center">
      <BsExclamationCircle className="text-destructive" />
      </div>
    </CardWrapper>
  );
};