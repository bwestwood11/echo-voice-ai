"use client"

import HeroSection from "@/components/hero-section"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
    const [message, setMessage] = useState("")



    return (
        <>
          <HeroSection  />
        </>
    )

}
