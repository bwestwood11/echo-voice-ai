
import MobileSidebar from "@/components/mobile-sidebar";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";


const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount()
  const isPro = await checkSubscription()
   const session = await getServerSession(authOptions)
   console.log("session", session)
    return (
        <div className="flex items-center p-4">
             <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />
             <div className="flex w-full justify-end">
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
                <Link href={'/signout'}>
       <DropdownMenuItem className='mb-2 mt-2'>
                  Sign out
                </DropdownMenuItem>
                </Link>
       </DropdownMenuContent>
            </DropdownMenu>
             </div>
        </div>
    )
}

export default Navbar;