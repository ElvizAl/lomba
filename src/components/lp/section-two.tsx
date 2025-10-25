'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect } from 'react';

export default function SectionTwo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  return (
    <motion.section 
      ref={ref}
      style={{ y, opacity }}
      className="overflow-hidden h-screen bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-3xl mx-auto mb-10 mt-40"
        >
          <h2 className="text-6xl md:text-6xl font-bold text-gray-900 mb-4">
            Tampilan Bersih 
            <br />dan Informatif
          </h2>
          <p className="text-lg text-gray-600">
            Kelola keuangan bisnis dengan lebih efisien dan efektif bersama Glofin
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden w-[350px] mx-auto"
        >
          <div className="relative">
            <img
              src="/mockups/laporan-screen.png"
              alt="Laporan Glofin"
              className="rounded-[2rem] border border-gray-200 shadow-2xl w-full h-auto"
            />
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}