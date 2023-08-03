"use client"

import Link from "next/link";
import Image from "next/image";
import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Volume2Icon, Activity, Settings, Volume1Icon } from "lucide-react";
import { usePathname } from "next/navigation";

const montserrat = Montserrat({
    weight: "600",
    subsets: ["latin"],
})

const routes = [
    {
        label: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
    },
    {
        label: "Voices",
        icon: Volume2Icon,
        href: "/voices",
        color: "text-rose-500",
    },
    {
        label: "Clone Your Voice",
        icon: Activity,
        href: "/clone",
        color: "text-orange-500",
    },
    {
        label: "Your Voices",
        icon: Volume1Icon,
        href: "/yourvoices",
        color: "text-yellow-500",
    },
    {
        label: "Settings",
        icon: Settings,
        href: "/settings",
        color: "text-green-500",
    },

]

const Sidebar = () => {
   const pathname = usePathname()

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
             <div className="px-3 py-2 flex-1">
                 <Link href="/dashboard" className="flex items-center mb-14">
                     <div className="relative w-20 h-20">
                       <Image
                       fill
                       alt='Logo'
                       src="/logo.png"
                       />
                     </div>
                     <h1 className={cn("text-xl font-bold", montserrat.className)}>
                        Echo Sounds AI
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
        </div>
    )

};

export default Sidebar;