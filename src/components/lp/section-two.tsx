'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

export default function SectionTwo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

  return (
    <motion.section
      ref={ref}
      style={{ y, opacity }}
      className="w-full bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 xl:gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <div className="space-y-4 md:space-y-6">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Tampilan Bersih 
                <span className="block text-blue-600">
                  dan Informatif
                </span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
                Kelola keuangan bisnis dengan lebih efisien dan efektif bersama Glofin.
                Dapatkan wawasan mendalam tentang arus kas dan kinerja bisnis Anda.
              </p>
            </div>

            <div className="mt-8 md:mt-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                {[
                  { text: 'Laporan Keuangan Real-time', icon: '📊' },
                  { text: 'Analisis Bisnis Mendalam', icon: '📈' },
                  { text: 'Manajemen Pengeluaran', icon: '💸' },
                  { text: 'Integrasi Bank', icon: '🏦' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                    <span className="text-2xl">{feature.icon}</span>
                    <span className="text-gray-800 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <button className="px-6 py-3 bg-black  text-white rounded-full font-medium hover:bg-black/80 transition-colors">
                  Mulai Sekarang
                </button>
              </div>
            </div>
          </motion.div>

          {/* Image Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true, margin: "-100px" }}
            className="w-full max-w-md lg:max-w-2xl mx-auto lg:mx-0 relative"
          >
            <div className="relative">
              <div className="absolute -z-10 blur-xl"></div>
                <Image
                  src="/img/mockups.png"
                  alt="Tampilan Aplikasi Glofin"
                  width={1200}
                  height={1200}
                  className="w-auto h-auto"
                  priority
                />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}