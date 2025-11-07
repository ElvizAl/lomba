import { motion } from "framer-motion";
import Image from "next/image";

const icons = [
  {
    src: "/svg/Group 68.svg",
    position: { x: -300, y: -240 },
    className: "w-18 h-18 lg:w-36 lg:h-36",
    duration: 4,
    delay: 0.2
  },
  {
    src: "/svg/Group 69.svg",
    position: { x: 220, y: -240 },
    className: "w-28 h-28 lg:w-36 lg:h-36",
    duration: 4.5,
    delay: 0.3
  },
  {
    src: "/svg/Group 70.svg",
    position: { x: -340, y: -60 },
    className: "w-18 h-18 lg:w-36 lg:h-36",
    duration: 4.2,
    delay: 0.1
  },
  {
    src: "/svg/Group 71.svg",
    position: { x: 270, y: 0 },
    className: "w-28 h-28 lg:w-36 lg:h-36",
    duration: 5,
    delay: 0.4
  },
  {
    src: "/svg/Group 69.svg",
    position: { x: -280, y: 240 },
    className: "w-28 h-28 lg:w-36 lg:h-36",
    duration: 4.8,
    delay: 0.2
  },
  {
    src: "/svg/Group 70.svg",
    position: { x: 180, y: 240 },
    className: "w-28 h-28 lg:w-36 lg:h-36",
    duration: 4.3,
    delay: 0.3
  },
];

export default function FloatingIcons() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none opacity-10">
      {icons.map((icon, index) => {
        return (
          <motion.div
            key={index}
            className={`absolute ${icon.className} z-0`}
            initial={{
              opacity: 0,
              x: icon.position.x,
              y: icon.position.y,
            }}
            animate={{
              opacity: [0.05, 0.15, 0.05],
              x: icon.position.x,
              y: icon.position.y,
              rotate: [0, 360]
            }}
            transition={{
              duration: 20 + (Math.random() * 10),
              ease: "linear",
              repeat: Infinity,
              repeatType: "loop",
              opacity: {
                duration: 5 + (Math.random() * 5),
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          >
            <Image
              width={100}
              height={100}
              src={icon.src}
              alt=""
              className="w-full h-full object-contain"
            />
          </motion.div>
        );
      })}
    </div>
  );
}