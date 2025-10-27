import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const experiences = [
  {
    year: "2023–Present",
    role: "Junior Software Developer",
    company: "Mercedes-Benz Research and Development India",
    location: "Bengaluru, Karnataka",
    image: `${process.env.PUBLIC_URL}/images/mercedes-banner.jpg`,
    points: [
      "Designed, developed, and validated ADAS software modules in C++ using V-SDLC and Agile.",
      "Built automated HIL/SIL test frameworks and diagnostic tools in Python/CAPL, integrating CANoe.",
      "Built and own a farm of 100+ automated testbenches for CI testing.",
      "Implemented health monitoring and self-recovery automations using Ansible and Python."
    ],
  },
  {
    year: "2022–2023",
    role: "IoT and Embedded Systems Developer - Intern",
    company: "Uilatech LLP",
    location: "Belagavi, Karnataka",
    image: `${process.env.PUBLIC_URL}/images/uilatech-banner.jpg`,
    points: [
      "Programmed embedded systems using C/C++ for home automation using ESP microcontrollers.",
      "Integrated AWS for cloud-based monitoring and control of automation systems."
    ],
  },
  {
    year: "2022–2023",
    role: "Research Intern",
    company: "KLE’s Dr. Prabhakar Kore Hospital & Medical Research Centre",
    location: "Belagavi, Karnataka",
    image: `${process.env.PUBLIC_URL}/images/kle-banner.jpg`,
    points: [
      "Compared U-Net, V-Net, and nnU-net for segmentation.",
      "Achieved a Dice score of 0.95 and 97% accuracy in classification algorithms."
    ],
  },
];

const Experience = () => {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      const progress = scrollTop / scrollHeight;
      const newIndex = Math.min(
        experiences.length - 1,
        Math.floor(progress * experiences.length)
      );
      setActiveIndex(newIndex);
    };
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="experience"
      className="relative bg-gray-900/40 backdrop-blur-md text-gray-200 py-16 px-6 flex flex-col items-center"
    >
      {/* Section Title */}
      {/* <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
      >
        Experience
      </motion.h2> */}

      {/* Outer Container */}
      <div className="relative flex w-full max-w-5xl h-[75vh] bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-2xl overflow-hidden shadow-lg">

        {/* Scrollable Inner Section */}
        <div
          ref={scrollRef}
          className="scroll-container flex-1 overflow-y-scroll p-6 space-y-8 scrollbar-hide"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-800/60 rounded-xl border border-gray-700 shadow-md overflow-hidden"
            >
              <div className="relative h-32">
                <img
                  src={exp.image}
                  alt={exp.company}
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
              </div>

              <div className="p-5">
                <h3 className="text-lg font-semibold text-blue-400">{exp.role}</h3>
                <p className="text-sm text-gray-400">{exp.company}</p>
                <p className="text-xs text-gray-500 mb-3">
                  {exp.year} • {exp.location}
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                  {exp.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Custom Animated Timeline */}
        <div className="relative w-14 flex flex-col items-center justify-center">
          {/* Timeline Track */}
          <div className="absolute top-6 bottom-6 w-[3px] bg-gray-700/50 rounded-full overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full shadow-[0_0_10px_2px_rgba(59,130,246,0.4)]"
              style={{ scaleY, originY: 0 }}
            />
          </div>

          {/* Year Markers */}
          <div className="absolute top-0 bottom-0 flex flex-col justify-between py-6">
            {experiences.map((exp, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.4, y: 10 }}
                animate={{
                  opacity: activeIndex === i ? 1 : 0.4,
                  scale: activeIndex === i ? 1.1 : 1,
                  y: 0,
                }}
                transition={{ duration: 0.4 }}
                className={`text-xs font-semibold ${
                  activeIndex === i ? "text-cyan-400" : "text-gray-500"
                }`}
              >
                {exp.year}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
