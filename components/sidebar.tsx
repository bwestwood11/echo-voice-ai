"use client"

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Volume2Icon, Activity, Settings, Volume1Icon } from "lucide-react";
import { usePathname } from "next/navigation";
import FreeCounter from "./FreeCounter";

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
        href: "/your-voices",
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

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
             <div className="px-3 py-2 flex-1">
                 <Link href="/" className="flex items-center mb-14">
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