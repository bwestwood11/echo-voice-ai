import { checkSubscription } from "@/lib/subscription"
import { cn } from "@/lib/utils"
import { Settings } from "lucide-react"
import { SubscriptionButton } from "@/components/subscription-button"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

const SettingsPage = async () => {
    const isPro = await checkSubscription()
    const session = await getServerSession(authOptions)
  return (
    <div>
          <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
        <div className={cn("p-2 w-fit rounded-md bg-gray-700/10")}>
          <Settings className={cn("w-10 h-10 text-gray-700")} />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Settings</h2>
          <p className="text-sm text-muted-foreground">
            Manage Account Settings
          </p>
        </div>
      </div>
      <div className="px-4 lg:px-8 space-y-4">
       <div className="text-gray-500 text-sm">
      {isPro ? "You are currently on a pro plan." : "You are currently on a free plan."}
       </div>
       <SubscriptionButton isPro={isPro} />
      </div>
    </div>
  
  )
}

export default SettingsPage