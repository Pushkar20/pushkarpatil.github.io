import React from "react";
import { motion } from "framer-motion";
import { Cpu, Code, Settings, Brain } from "lucide-react";

const skills = [
  { icon: <Cpu size={28} />, name: "Embedded C/C++" },
  { icon: <Code size={28} />, name: "Python" },
  { icon: <Brain size={28} />, name: "AI & ML Tools" },
  { icon: <Settings size={28} />, name: "Automotive Software" },
];

const softSkills = [
  "Creativity",
  "Debugging",
  "Problem Solving",
  "Communication",
  "Teamwork",
  "Adaptability",
  "Learning",
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative bg-gray-900 text-gray-200 py-20 px-6 flex flex-col items-center overflow-hidden"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-10 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
      >
        Skills
      </motion.h2>

      {/* Core Technical Skills */}
      <div className="flex flex-wrap justify-center gap-8 max-w-5xl mb-12">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.1, rotate: 1 }}
            className="flex flex-col items-center bg-gray-800/40 backdrop-blur-md border border-gray-700 rounded-2xl p-8 w-48 text-center shadow-md hover:shadow-blue-400/30 transition-all"
          >
            <div className="text-blue-400 mb-3">{skill.icon}</div>
            <p className="text-base font-medium">{skill.name}</p>
          </motion.div>
        ))}
      </div>

      {/* Soft Skill Orbs */}
      <div className="relative flex flex-wrap justify-center gap-6 max-w-4xl">
        {softSkills.map((skill, index) => (
          <motion.div
            key={index}
            drag
            dragElastic={0.6}
            dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
            whileTap={{ scale: 1.1 }}
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0px rgba(56,189,248,0.0)",
                "0 0 20px rgba(56,189,248,0.4)",
                "0 0 0px rgba(56,189,248,0.0)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.2,
            }}
            className="cursor-grab active:cursor-grabbing bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 font-semibold rounded-full px-6 py-4 text-sm select-none shadow-lg"
            style={{
              touchAction: "none",
            }}
          >
            {skill}
          </motion.div>
        ))}
      </div>

      <p className="mt-8 text-gray-400 italic text-sm">
        (Drag the orbs around ✨)
      </p>
    </section>
  );
};

export default Skills;
