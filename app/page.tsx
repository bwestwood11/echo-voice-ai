'use client'

import FAQ from "@/components/FAQ"
import LogoClouds from "@/components/Logos"
import Hero from "@/components/Hero"
import HeroSection from "@/components/hero-section"
import VideoSection from "@/components/Video-Example"


export default function Home() {
  
    return (
        <>
         <Hero />
          <LogoClouds />
          <VideoSection />
          <FAQ />
        </>
    )

}
