"use client"

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Volume2Icon, Activity, Settings, Volume1Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import FreeCounter from "./FreeCounter";
import { useSession } from "next-auth/react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { Badge } from "./ui/badge";


const montserrat = Montserrat({
    subsets: ["latin"],
})

interface SidebarProps {
    apiLimitCount: number;
    isPro: boolean;
    characterCount: number;
}

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-[#ff8303]",
    },
    {
        label: "Voices",
        icon: Volume2Icon,
        href: "/voices",
        color: "text-[#ff8303]",
    },
    {
        label: "Video Editor",
        icon: Activity,
        href: "/video-editor",
        color: "text-[#ff8303]",
    },
    {
        label: "Saved Voices",
        icon: Volume1Icon,
        href: "/saved-voices",
        color: "text-[#ff8303]",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        color: "text-[#ff8303]",
    },

]

const Sidebar = ({ apiLimitCount = 0, isPro = false, characterCount = 0 }: SidebarProps) => {
   const pathname = usePathname()

   const { data: session } = useSession()

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
             <div className="px-3 py-2 flex-1">
                 <Link href="/" className="flex items-center mb-5">
                     <div className="relative w-16 h-16">
                       <Image
                       fill
                       alt='Logo'
                       src="/fusion-logo-orange.png"
                       />
                     </div>
                     <h1 className={cn("text-lg uppercase font-extrabold", montserrat.className)}>
                        Voice Fusion
                        </h1>
                    </Link>
                   {session && 
                   <div className="flex flex-row gap-2 mb-10 items-start w-full p-4">
                        <Image
                        src={session.user.image}
                        alt="avatar"
                        width={30}
                        height={30}
                        className="rounded-full"
                        />
                        <div className="flex flex-col gap-1">
                             <h4>{session.user.name}</h4>
                             {isPro && <Badge className="bg-[#ff8303] hover:bg-[#ff8303]/80 inline-flex w-1/3 text-white font-bold">Pro</Badge>}
                             {!isPro && <Badge className="bg-[#ff8303] hover:bg-[#ff8303]/80 inline-flex w-1/3 text-white font-bold">Free</Badge>}
                        </div>
                    </div>
                    }
                    <div className="space-y-1">
                        {routes.map((route) => (
                            <Link href={route.href} key={route.href} className={cn("text-sm group flex p-4 w-full font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                            pathname === route.href ? "bg-white/10 text-white" : "text-zinc-400"
                            )}>
                             <div className="flex items-center flex-1">
                             <route.icon className={cn("w-6 h-6 mr-3", route.color)} />
                             {route.label}
                             </div>
                            </Link>
                                 ))}
                    </div>
             </div>
             <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} characterCount={characterCount}/>
        </div>
    )

};

export default Sidebar;