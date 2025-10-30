import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

/*
  Experiences data (keep images in public/images/)
*/
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

/* ---------------------------
   CHILD: ScrollTimeline
   This component contains the useScroll logic and is only mounted
   when the scroll view is required (prevents hydration errors).
   --------------------------- */
function ScrollTimeline({ items }) {
  // NOTE: useScroll and useTransform are declared here (inside this child component)
  // so they only run when this component is actually mounted.
  const { useScroll, useTransform } = require("framer-motion"); // lazy require keeps top-level import minimal
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll({ container: scrollRef });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const [activeIndex, setActiveIndex] = useState(0);

  // onScroll compute active index
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight - container.clientHeight;
      if (scrollHeight <= 0) {
        setActiveIndex(0);
        return;
      }
      const progress = scrollTop / scrollHeight;
      const newIndex = Math.min(items.length - 1, Math.floor(progress * items.length));
      setActiveIndex(newIndex);
    };
    container.addEventListener("scroll", handleScroll);
    // call once to set initial highlight
    handleScroll();
    return () => container.removeEventListener("scroll", handleScroll);
  }, [items]);

  return (
    <div className="relative flex w-full max-w-5xl h-[72vh] bg-gray-800/30 backdrop-blur-md border border-gray-700 rounded-2xl overflow-hidden shadow-lg">
      <div
        ref={scrollRef}
        className="scroll-container flex-1 overflow-y-scroll p-6 space-y-8 scrollbar-hide"
      >
        {items.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.06 }}
            viewport={{ once: true }}
            className="bg-gray-800/60 rounded-xl border border-gray-700 shadow-md overflow-hidden"
          >
            <div className="relative h-36">
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
              <p className="text-xs text-gray-500 mb-3">{exp.year} • {exp.location}</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                {exp.points.map((point, i) => <li key={i}>{point}</li>)}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Timeline track */}
      <div className="relative w-14 flex flex-col items-center justify-center">
        <div className="absolute top-6 bottom-6 w-[3px] bg-gray-700/50 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 to-blue-500 rounded-full shadow-[0_0_10px_2px_rgba(59,130,246,0.35)]"
            style={{ scaleY, originY: 0 }}
          />
        </div>

        <div className="absolute top-0 bottom-0 flex flex-col justify-between py-6">
          {items.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.4, y: 10 }}
              animate={{
                opacity: activeIndex === i ? 1 : 0.4,
                scale: activeIndex === i ? 1.05 : 1,
                y: 0,
              }}
              transition={{ duration: 0.35 }}
              className={`text-xs font-semibold ${activeIndex === i ? "text-cyan-400" : "text-gray-500"}`}
            >
              {exp.year}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------
   PARENT: Experience
   Shows either the clean vertical timeline (default) or the scroll timeline when toggled.
   --------------------------- */
export default function Experience() {
  // show the CLEAN alternate timeline by default (as you requested)
  const [showScrollView, setShowScrollView] = useState(false);

  return (
    <section
      id="experience"
      className="relative text-gray-200 py-24 px-6 flex flex-col items-center"
    >
      {/* Title + toggle */}
        <motion.h3
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-nevis text-4xl font-bold mt-8 mb-10 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
        >
          Experience
        </motion.h3>

        {/* Toggle Switch */}
        <div className="w-full max-w-5xl flex justify-end mb-10">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-400">Toggle view</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showScrollView}
                onChange={() => setShowScrollView(!showScrollView)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-gray-700 rounded-full peer peer-checked:bg-blue-500 transition"></div>
              <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-5"></span>
            </label>
          </div>
        </div>

      {/* If toggle OFF -> show clean vertical "alternate" timeline (default) */}
      {!showScrollView ? (
        <div className="w-full max-w-5xl relative space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.06 }}
              viewport={{ once: true }}
              className="relative flex flex-col md:flex-row bg-gray-800/30 border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm shadow-md"
            >
              {/* Left content */}
              <div className="relative md:w-2/3 z-10 p-6">
                <div className="absolute -left-8 top-8 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 shadow-[0_0_14px_rgba(59,130,246,0.35)]" />
                <h3 className="text-lg font-semibold text-cyan-300">
                  {exp.role} <span className="text-gray-300 font-medium">• {exp.company}</span>
                </h3>
                <p className="text-sm text-gray-400 mb-3">{exp.year} • {exp.location}</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-300">
                  {exp.points.map((p, i) => <li key={i}>{p}</li>)}
                </ul>
                <div className="mt-3">
                  <a href="#" className="inline-flex items-center text-cyan-400 text-xs hover:underline">
                    <FaExternalLinkAlt className="mr-1" /> View Project
                  </a>
                </div>
              </div>

              {/* Right-side image (half-card fade overlay) */}
              <div className="relative md:w-1/2 h-48 md:h-auto">
                <img
                  src={exp.image}
                  alt={exp.company}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                {/* Left to right fade (black → transparent) */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#090c11] via-[#090c11]/70 to-transparent" />
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        // SHOW the scroll timeline component (which contains useScroll inside)
        <ScrollTimeline items={experiences} />
      )}
    </section>
  );
}
