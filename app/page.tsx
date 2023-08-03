"use client"

import HeroSection from "@/components/hero-section"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
    const [message, setMessage] = useState("")



    return (
        <>
          <HeroSection  />
            <input className="border border-1 bg-gray-50" type="text" value={message} onChange={(e) => setMessage(e.target.value)} /> 

            <Link href={`/test/${message}`}>
              Click Me
        </Link>
        </>
    )

}
