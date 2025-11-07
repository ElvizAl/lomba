"use client";

import { useRef, useEffect } from 'react';
import Image from "next/image";
import { motion } from "framer-motion";

const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: (i = 0) => ({
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            delay: 0.1 * i,
            ease: [0.25, 0.1, 0.25, 1.0]
        }
    })
};

export default function SectionThree() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle image loading
    useEffect(() => {
        const images = containerRef.current?.querySelectorAll('img');
        if (images) {
            let loadedImages = 0;
            const totalImages = images.length;

            const imageLoaded = () => {
                loadedImages++;
                if (loadedImages === totalImages) {
                    // All images loaded
                }
            };

            images.forEach(img => {
                if (img.complete) imageLoaded();
                else img.addEventListener('load', imageLoaded);
            });
        }
    }, []);

    return (
        <section
            ref={containerRef}
            id="section-three"
            className="bg-gray-900 text-white py-16 md:py-24 overflow-hidden relative z-10"
        >
            <div
                className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 lg:px-8 py-8 md:py-12"
            >
                {/* Left Images */}
                <motion.div
                    className="grid grid-cols-2 gap-4 mb-10 md:mb-0 w-full md:w-1/2 md:pr-10"
                    data-scroll
                    data-scroll-speed="-0.5"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    <motion.div
                        className="col-span-2"
                        variants={slideUp as any}
                        custom={0}
                    >
                        <Image
                            src="/img/1.webp"
                            alt="Conference"
                            width={500}
                            height={300}
                            className="rounded-2xl object-cover w-full h-56 md:h-72"
                        />
                    </motion.div>

                    <motion.div
                        variants={slideUp as any}
                        custom={1}
                    >
                        <Image
                            src="/img/2.jpg"
                            alt="Audience"
                            width={250}
                            height={200}
                            className="rounded-2xl object-cover w-full h-40 md:h-56"
                        />
                    </motion.div>

                    <motion.div
                        variants={slideUp as any}
                        custom={2}
                    >
                        <Image
                            src="/img/3.webp"
                            alt="Stage"
                            width={250}
                            height={200}
                            className="rounded-2xl object-cover w-full h-40 md:h-56"
                        />
                    </motion.div>
                </motion.div>

                {/* Right Text */}
                <motion.div
                    className="w-full md:w-1/2 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
                    data-scroll
                    data-scroll-speed="0.5"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6 }}
                >
                    {/* Left Stat */}
                    <motion.div
                        className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="space-y-2">
                            <p className="text-5xl md:text-6xl font-bold text-white text-center">
                                60<span className="text-blue-600">%</span>
                            </p>
                            <p className="text-lg md:text-xl text-gray-300">
                                Kontribusi PDB Indonesia
                            </p>
                            <p className="text-sm text-gray-400">
                                Sumber: Kementerian Koordinator Bidang Perekonomian
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Stat */}
                    <motion.div
                        className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="space-y-2">
                            <p className="text-5xl md:text-6xl font-bold text-white text-center">
                                77<span className="text-blue-600">%</span>
                            </p>
                            <p className="text-lg md:text-xl text-gray-300">
                                Tidak Punya Laporan Keuangan
                            </p>
                            <p className="text-sm text-gray-400">
                                Sumber: Kementerian Keuangan
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}