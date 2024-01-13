"use client"

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from "@/components/ui/card";
import { Header } from "./header";
import { Social } from "./social";
import { BackButton } from "./back-button";


interface CardWrapperProps {
    children: React.ReactNode;
    headerLabel: string;
    backButtonLabel: string;
    backButtonHref: string;
    showSocial?: boolean;
    title: string;
  }

export const CardWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref, showSocial, title}: CardWrapperProps) => {
return (
    <Card className="xl:w-1/4 md:w-1/2 shadow-md">
          <CardHeader>
            <Header label={headerLabel} title={title} />
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
          {showSocial && (
            <CardFooter>
                <Social />
            </CardFooter>
         )}
         <CardFooter>
            <BackButton label={backButtonLabel} href={backButtonHref} />
         </CardFooter>
    </Card> 
)
}