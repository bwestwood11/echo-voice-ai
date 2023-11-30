"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import React from "react";

import { Montserrat } from "next/font/google";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GiHamburgerMenu } from "react-icons/gi";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const montserrat = Montserrat({
  subsets: ["latin"],
});

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const NavigationBar = () => {
  const { data: session } = useSession();

  const ToggleMenu = () => {};

  return (
    <nav
      className="w-full h-20 items-center flex bg-white z-10"
      style={{ pointerEvents: "all" }}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto h-full w-full px-4">
        {/* Logo Section */}
        <Link href="/">
          <div className="flex items-center">
            <Image
              src="/fusion-logo-orange.png"
              alt="Logo"
              width={80}
              height={80}
            />
            <span
              className={cn(
                "font-extrabold uppercase text-xl",
                montserrat.className
              )}
            >
              Voice Fusion
            </span>
          </div>
        </Link>
        {/* Navigation Menu Items using Shadcn UI */}
        <div className="sm:block hidden">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Features</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          {/* <Icons.logo className="h-6 w-6" /> */}
                          <div className="mb-2 mt-4 text-lg font-medium">
                            shadcn/ui
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            Beautifully designed components built with Radix UI
                            and Tailwind CSS.
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Introduction">
                      Re-usable components built using Radix UI and Tailwind
                      CSS.
                    </ListItem>
                    <ListItem href="/docs/installation" title="Installation">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Typography"
                    >
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>How It Works</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/docs" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Pricing
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {!session ? (
          <>
            <div className="sm:flex gap-3 hidden">
              <Button onClick={() => signIn("google")}>Sign In</Button>
              <Button onClick={() => signIn("google")} variant="outline">
                Sign Up
              </Button>
            </div>
            <div className="flex sm:hidden">
              <Sheet>
                <SheetTrigger>
                  <GiHamburgerMenu onClick={ToggleMenu} className="w-8 h-8" />
                </SheetTrigger>
                <SheetContent className="h-screen">
                  <SheetHeader>
                    <SheetTitle>
                      <div
                        className={cn(
                          montserrat.className,
                          "flex font-extrabold uppercase items-center"
                        )}
                      >
                        <Image
                          src="/fusion-logo-orange.png"
                          alt="Logo"
                          width={80}
                          height={80}
                        />
                        <Link href="/">Voice Fusion</Link>
                      </div>
                    </SheetTitle>
                    <SheetDescription>
                      <ul
                        className={cn(
                          montserrat.className,
                          "font-bold text-black text-xl gap-10 flex flex-col mt-20"
                        )}
                      >
                        <li>
                          <Link href="/docs">Features</Link>
                        </li>
                        <li>
                          <Link href="/docs">Tutorials</Link>
                        </li>
                        <li>
                          <Link href="/docs">Pricing</Link>
                        </li>
                      </ul>
                      <div className="mt-10 flex gap-6 mx-auto justify-center">
                        <Button
                          variant="orange"
                          onClick={() => signIn("google")}
                        >
                          Sign In
                        </Button>
                        <Button
                          onClick={() => signIn("google")}
                          variant="outline"
                        >
                          Sign Up
                        </Button>
                      </div>
                    </SheetDescription>
                  </SheetHeader>
                </SheetContent>
              </Sheet>
            </div>
          </>
        ) : (
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer" asChild>
                <Avatar>
                  <AvatarImage src={session?.user.image} />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-4 mr-1 z-10">
                <DropdownMenuItem className="mb-2 mt-2">
                  <Link href={`/dashboard`}>Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="mb-2 mt-2">
                  <Link href={`/dashboard`}>Your Account</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="mb-2 mt-2">
                  <Link href={`/dashboard`}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="mb-2 mt-2">
                  <Button onClick={() => signOut()} variant="ghost">
                    Sign out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationBar;
