"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import FloatingIcons from "./floating-icons";
import PhoneMockup from "./phone-mockup";
import Link from "next/link";

export default function HeroSection() {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const y = useTransform(scrollYProgress, [0, 1], isMobile ? [0, -50] : [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  return (
    <motion.section 
      ref={ref}
      style={{ y, opacity }}
      className="relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6"
            >
              Pantau Keuangan Bisnis
              <span className="text-blue-600 block">Lebih Mudah & Efisien</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl"
            >
              Solusi lengkap untuk mengelola keuangan bisnis Anda. Pantau arus kas, buat laporan keuangan, dan dapatkan wawasan bisnis yang berharga.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link
                href={"/login"}
                className="px-8 py-4 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-colors text-center shadow-lg hover:shadow-xl"
              >
                Mulai Sekarang
              </Link>
              <Link
                href={"/register"}
                className="px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-full font-medium hover:bg-gray-50 transition-colors text-center"
              >
                Pelajari Lebih Lanjut
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className={`relative mt-12 lg:mt-0 ${isMobile ? 'w-full max-w-md mx-auto' : 'absolute right-0'}`}
          >
            <PhoneMockup />
            {!isMobile && <FloatingIcons />}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
