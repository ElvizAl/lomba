'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function SectionTwo() {
  return (
    <section className="w-full bg-white pt-20 md:pt-28 relative overflow-hidden" id="fitur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 xl:gap-12">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px 0px -100px 0px" }}
            className="w-full lg:w-1/2 text-center lg:text-left"
          >
            <motion.div 
              className="space-y-4 md:space-y-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px 0px -100px 0px" }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
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
            </motion.div>

            <motion.div 
              className="mt-8 md:mt-12"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px 0px -100px 0px" }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
                {[
                  { text: 'Laporan Keuangan Real-time', icon: '📊' },
                  { text: 'Smart AI untuk Analisis', icon: '📈' },
                  { text: 'Pencatatan Mudah dengan Fitur Pindai Struk', icon: '💸' },
                ].map((feature, index) => (
                  <div key={index} className="items-start gap-3 rounded-xl hover:bg-gray-100 transition-colors text-center">
                    <div className="text-2xl">{feature.icon}</div>
                    <div className="text-gray-800 font-medium">{feature.text}</div>
                  </div>
                ))}
              </div>
              
              <div className="mt-10">
                <Link href="/register" className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-black/80 transition-colors">
                  Mulai Sekarang
                </Link>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-50px 0px -100px 0px" }}
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
    </section>
  );
}