'use client'

import FAQ from "@/components/landing-page/FAQ"
import LogoClouds from "@/components/landing-page/Logos"
import Hero from "@/components/landing-page/Hero"
import VideoSection from "@/components/landing-page/Video-Example"
import WhyUs from "@/components/landing-page/why-us"
import UseCases from "@/components/landing-page/UseCases"



export default function Home() {
  
    return (
        <>
         <Hero />
          <LogoClouds />
          <VideoSection />
          <WhyUs />
          <UseCases />
          <FAQ />
        </>
    )

}
