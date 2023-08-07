import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { cn } from "@/lib/utils"
import { getServerSession } from "next-auth"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({
  weight: "600",
  subsets: ["latin"],
})

const DashboardPage = async () => {
  const session = await getServerSession(authOptions)
  return (
    <div className="w-full">
      <h1 className={cn("text-center font-bold text-2xl", montserrat.className)}>{session?.user.name}'s Dashboard Page</h1>
    </div>
  )
}

export default DashboardPage