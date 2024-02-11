import MobileSidebar from "@/components/mobile-sidebar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getFreeCharacterCount, getProCharacterCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import { User2Icon } from "lucide-react";
import { currentUser } from "@/lib/auth";
import { logout } from "@/actions/logout";

const Navbar = async () => {
  const freeCharacteCount = await getFreeCharacterCount();
  const proCharacterCount = await getProCharacterCount();
  const isPro = await checkSubscription();
  const session = await currentUser();
  console.log("session", session);

  const signingOut = () => {
   logout()
  };
  return (
    <div className="flex items-center p-4 bg-slate-100">
      <MobileSidebar
        isPro={isPro}
        freeCharacteCount={freeCharacteCount}
        proCharacterCount={proCharacterCount}
      />
      <div className="flex w-full justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <Avatar>
              <AvatarImage src={session?.image ?? ''} />
              <AvatarFallback>
                <User2Icon />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-4 mr-1 z-10">
            <DropdownMenuItem className="mb-2 mt-2">
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="mb-2 mt-2">
              <Link href="/dashboard">Your Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="mb-2 mt-2">
              <Link href="/settings">Settings</Link>
            </DropdownMenuItem>   
            <DropdownMenuItem className="my-2 cursor-pointer">
                Sign out
              </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
