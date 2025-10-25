import { motion } from "framer-motion";

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
    <div className="fixed bottom-0 right-1/2 translate-x-1/2 lg:right-[10%] lg:translate-x-0 w-[600px] lg:w-[700px] h-[800px] pointer-events-none">
      {icons.map((icon, index) => {
        const floatAnimation = {
          y: [0, -15, 0, 15, 0],
          x: [0, 10, 0, -10, 0],
        };

        return (
          <motion.div
            key={index}
            className={`absolute ${icon.className} z-0`}
            initial={{ 
              opacity: 0,
              x: icon.position.x,
              y: icon.position.y,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1,
              ...floatAnimation,
              x: icon.position.x,
              y: icon.position.y
            }}
            transition={{
              duration: icon.duration,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
              delay: icon.delay,
              opacity: { duration: 0.8, ease: "easeOut" },
              scale: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              x: { 
                duration: 10 + Math.random() * 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              },
              y: { 
                duration: 8 + Math.random() * 4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              willChange: 'transform, opacity'
            }}
          >
            <img
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