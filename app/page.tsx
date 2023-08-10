"use client"

import FAQ from "@/components/FAQ"
import LogoClouds from "@/components/Logos"
import HeroSection from "@/components/hero-section"
import Link from "next/link"
import { useState } from "react"

export default function Home() {
    const [message, setMessage] = useState("")



    return (
        <>
          <HeroSection  />
          <LogoClouds />
          <FAQ />
        </>
    )

}
