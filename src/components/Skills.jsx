import React from "react";
import { motion } from "framer-motion";
import { Code2, Cpu, Database, GitBranch, Settings, Terminal } from "lucide-react";

const skills = [
  { name: "Embedded C/C++", icon: <Cpu size={30} /> },
  { name: "Python", icon: <Terminal size={30} /> },
  { name: "Automotive Software", icon: <Settings size={30} /> },
  { name: "Linux / RTOS", icon: <Code2 size={30} /> },
  { name: "Git & Version Control", icon: <GitBranch size={30} /> },
  { name: "Data Handling / Parsing", icon: <Database size={30} /> },
];

const Skills = () => {
  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-gray-100 px-6 py-16"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-10"
      >
        Skills
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.1 }}
            className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-2xl shadow-md hover:shadow-lg cursor-pointer"
          >
            <div className="text-blue-400 mb-3">{skill.icon}</div>
            <p className="text-sm font-medium text-center">{skill.name}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
