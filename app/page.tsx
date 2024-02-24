'use client'

import FAQ from "@/components/landing-page/FAQ"
import LogoClouds from "@/components/landing-page/Logos"
import Hero from "@/components/landing-page/Hero"
import VideoSection from "@/components/landing-page/Video-Example"
import WhyUs from "@/components/landing-page/why-us"
import UseCases from "@/components/landing-page/UseCases"
import { ReactComponent as MarketingAnimationSvg } from '@/components/marketingAnimationSvg'


export default function Home() {
  
    return (
        <div className="relative">
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>
         <Hero />
          <LogoClouds />
          <VideoSection />
          <WhyUs />
          <UseCases />
          <FAQ />
        </div>
    )

}
