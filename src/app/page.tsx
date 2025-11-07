"use client";

import HeroSection from "@/components/lp/hero-section";
import SectionTwo from "@/components/lp/section-two";
import SectionThree from "@/components/lp/section-three";
import Footer from "@/components/lp/footer";
import Navbar from "@/components/lp/navbar";
import { Nunito } from "next/font/google";
import { useLocomotiveScroll } from "@/hooks/useLocomotiveScroll";

export const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  const { containerRef } = useLocomotiveScroll();

  return (
    <div className={`${nunito.className} bg-gradient-to-b from-white to-blue-50 h-screen flex flex-col`}>
      <Navbar />
      <div ref={containerRef} data-scroll-container className="flex-1">
        <HeroSection />
        <SectionTwo />
        <SectionThree />
        <Footer />
      </div>
    </div>
  );
}