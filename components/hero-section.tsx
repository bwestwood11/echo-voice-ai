"use client";

import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import AudioPlayer from "./audioPlayer";


const navigation = [
  { name: "Pricing", href: "/pricing" },
  { name: "Features", href: "/features" },
  { name: "Contact Us", href: "/contact" },
  { name: "About", href: "/about" },
];

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
});


export default function HeroSection() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [voice, setVoice] = useState("");
  const [image, setImage ] = useState("");
  const [hightlightedGirl, setHighlightedGirl] = useState(false);
  const [hightlightedBoy, setHighlightedBoy] = useState(false);

const { data: session, status } = useSession();
console.log(session);


  return (
    <div className="bg-white">
      {/* Navigation section for not signed in users */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          className="flex items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center lg:flex-1">
            <Image src="/logo.png" alt="Logo" width={80} height={80} />
            <span className={cn("font-bold text-xl", montserrat.className)}>
              Echo Sounds AI
            </span>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
           {!session ?
            (<Button onClick={() => signIn('google', {callbackUrl: 'http://localhost:3000/dashboard'})} variant="outline">
              Sign in
            </Button>) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="cursor-pointer" asChild>
                        <Avatar>
                   <AvatarImage src={session?.user.image} />
  <AvatarFallback>CN</AvatarFallback>
            </Avatar>
                </DropdownMenuTrigger>
       <DropdownMenuContent className="mt-4 mr-1 z-10">
       <DropdownMenuItem className='mb-2 mt-2'>
                  <Link href={`/dashboard`}>
                    Dashboard
                  </Link>
                </DropdownMenuItem>
       <DropdownMenuItem className='mb-2 mt-2'>
                  <Link href={`/dashboard`}>
                    Your Account
                  </Link>
                </DropdownMenuItem>
       <DropdownMenuItem className='mb-2 mt-2'>
                  <Link href={`/dashboard`}>
                    Settings
                  </Link>
                </DropdownMenuItem>
       <DropdownMenuItem className='mb-2 mt-2'>
                  <Button onClick={() => signOut()} variant='ghost'>
                    Sign out
                  </Button>
                </DropdownMenuItem>
       </DropdownMenuContent>
            </DropdownMenu>
            )}
                  </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-40 lg:py-56">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Sign in with your Google Account and Receive 5 Credits!{" "}
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Convert Text to Natural-Sounding Speech
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Enhance Your Content Creation: Unlock Creative Possibilities by
              Choosing from a Diverse Range of Voices to Transform Text into
              Speech.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button onClick={() => signIn('google')} variant="outline">Get Started</Button>
              <Button variant="secondary">Learn More</Button>
            </div>
            <div>
                <h2 className="font-bold text-2xl mt-16">Listen to two voices of the many voices we offer!</h2>
            </div>
            <div className="grid grid-cols-2 gap-10 mt-6">
                <div className="flex flex-col">
                       <Image 
            className={cn("mx-auto cursor-pointer hover:border-2 hover:border-gray-100 hover:rounded-lg", hightlightedBoy && 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500')}
            src='/male1.png'
            alt='male'
            width={200}
            height={200}
            />
            <h3 className="font-semibold mb-4">John - American Male Accent</h3> 
            <AudioPlayer src="/johnamericanvoice.mp3" />
                </div>
          <div className="flex flex-col">
          <Image 
            className={cn("mx-auto cursor-pointer hover:border-2 hover:border-gray-100 hover:rounded-lg", hightlightedGirl && 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500')}
            src='/girl6.png'
            alt='gir3'
            width={200}
            height={200}
            />
            <h3 className="font-semibold mb-4">Nicole - American Woman Accent</h3>
            <AudioPlayer src="/nicoleamericanvoice.mp3" />
          </div>
             </div>
          </div>
        </div>
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
