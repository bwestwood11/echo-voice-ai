'use client'

import FAQ from "@/components/FAQ"
import LogoClouds from "@/components/Logos"
import Hero from "@/components/Hero"
import VideoSection from "@/components/Video-Example"
import WhyUs from "@/components/why-us"


export default function Home() {
  
    return (
        <>
         <Hero />
          <LogoClouds />
          <VideoSection />
          <WhyUs />
          <FAQ />
        </>
    )

}
