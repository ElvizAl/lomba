"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function SectionThree() {
    return (
        <section className="bg-gray-900 text-white py-24">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-16">
                {/* Left Images */}
                <div className="grid grid-cols-2 gap-4 mb-10 md:mb-0 w-full md:w-1/2">
                    <div className="col-span-2">
                        <Image
                            src="/img/1.webp"
                            alt="Conference"
                            width={500}
                            height={300}
                            className="rounded-2xl object-cover w-full h-56 md:h-72"
                        />
                    </div>
                    <Image
                        src="/img/2.jpg"
                        alt="Audience"
                        width={250}
                        height={200}
                        className="rounded-2xl object-cover w-full h-40 md:h-56"
                    />
                    <Image
                        src="/img/3.webp"
                        alt="Stage"
                        width={250}
                        height={200}
                        className="rounded-2xl object-cover w-full h-40 md:h-56"
                    />
                </div>

                {/* Right Text */}
                <div className="md:w-1/2 md:pl-10 text-center md:text-left w-full">
                    <motion.h1
                        className="text-3xl md:text-5xl font-bold leading-tight"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        Welcome to the greatest <span className="text-blue-600">designers conference 2024</span>
                    </motion.h1>

                    <p className="text-white mt-6">
                        Embark on a transformative journey at the <strong>Design Summit</strong>, an immersive convergence of creativity and innovation. Join industry pioneers, thought leaders and visionaries as we explore the forefront of design, setting the stage for a future shaped by ingenuity and collaborative brilliance.
                    </p>

                    <p className="text-white mt-4">
                        <strong>Design Summit</strong> is where inspiration meets execution, defining the next era of design excellence. Don’t miss your chance to be part of this unparalleled experience!
                    </p>

                    <button className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                        Read More
                    </button>
                </div>
            </div>
        </section>
    );
}
