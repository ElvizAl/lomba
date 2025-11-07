// app/page.tsx
'use client';

import HeroSection from "@/components/lp/hero-section";
import SectionTwo from "@/components/lp/section-two";
import SectionThree from "@/components/lp/section-three";
import Footer from "@/components/lp/footer";
import Navbar from "@/components/lp/navbar";
import { Nunito } from "next/font/google";

export const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <main className={`${nunito.className} bg-gradient-to-b from-white to-blue-50`}>
      <Navbar />
      <div className="relative">
        <HeroSection />
        <SectionTwo />
        <SectionThree />
        <Footer />
      </div>
    </main>
  );
}