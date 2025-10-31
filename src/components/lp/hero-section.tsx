"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import FloatingIcons from "./floating-icons";
import PhoneMockup from "./phone-mockup";
import Link from "next/link";

export default function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  return (
    <motion.section 
      ref={ref}
      style={{ y, opacity }}
      className="h-screen relative overflow-hidden flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20"
    >
      <div className="max-w-xl text-center lg:text-left z-10">
        <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
          <Image src="/logo.png" width={64} height={64} alt="Glofin" />
          <span className="font-semibold text-lg text-gray-900">Glofin</span>
        </div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4"
        >
          Pantau Keuangan Bisnis Anda
          dengan Mudah
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 mb-6"
        >
          Catat semua keuangan bisnis Anda dengan mudah.
        </motion.p>

        <div className="flex gap-3 justify-center lg:justify-start">
          <Link href={"/login"} className="px-5 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition">
            Buka Aplikasi
          </Link>
          <Link href={"/register"} className="px-5 py-3 border border-gray-300 rounded-full hover:bg-gray-100 transition">
            Daftar Gratis
          </Link>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95}}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        className="absolute -bottom-10 right-20 will-change-transform"
      >
        <PhoneMockup />
        <FloatingIcons />
      </motion.div>
    </motion.section>
  );
}
