"use client"

import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"
import axios from "axios"
import { useState } from "react"

interface SubscriptionButtonProps {
    isPro: boolean
}

export const SubscriptionButton = ({ isPro = false }: SubscriptionButtonProps) => {
    const [loading, setLoading] = useState(false)

  const onClick = async () => {
try {
    setLoading(true)
     const response = await axios.get("/api/stripe")

     window.location.href = response.data.url
} catch (error) {
    console.log("Billing error", error)
} finally {
    setLoading(false)
}
  }

    return (
        <Button disabled={loading} onClick={onClick}>
            {isPro ? "Manage Subscription": "Upgrade to Pro"}
            {!isPro && <Zap className="w-4 h-4 ml-2 fill-yellow-500" />}
        </Button>
    )
}