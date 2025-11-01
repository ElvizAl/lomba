// app/page.tsx
import HeroSection from "@/components/lp/hero-section";
import SectionTwo from "@/components/lp/section-two";
import Navbar from "@/components/lp/navbar";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export default function Home() {
  return (
    <main className={nunito.className + " bg-gradient-to-b from-white to-blue-50"}>
      <Navbar />
      {/* <ScrollWrapper> */}
        <div className="scroll-section h-screen w-full snap-start">
          <HeroSection />
          <SectionTwo />
        </div>
      {/* </ScrollWrapper> */}
    </main>
  );
}