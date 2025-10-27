import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-gray-900/40 backdrop-blur-md">
      {/* Name */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="font-skyscrapers text-5xl sm:text-6xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
      >
        Pushkar Patil
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="font-soria mt-4 text-xl text-gray-300"
      >
        Software Developer | Embedded Systems | Automotive Software
      </motion.p>

      {/* About Me Heading */}
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-soria text-4xl font-bold mt-16 mb-8 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
      >
        About Me
      </motion.h3>

      {/* About Me Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="font-soria max-w-3xl text-center text-gray-300 bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl shadow-lg p-8 leading-relaxed"
      >
        <p className="mb-4">
          Hi, I'm <span className="text-blue-400 font-semibold">Pushkar Patil</span>, a passionate Software Developer with 2.5+ years of experience in Embedded Systems and Automotive Software.
        </p>
        <p className="mb-4">
          I specialize in <span className="text-blue-400 font-semibold">C++</span>, <span className="text-blue-400 font-semibold">Python</span>, and communication protocols like <span className="text-blue-400 font-semibold">CAN</span> and <span className="text-blue-400 font-semibold">Ethernet</span>. My work spans the entire software development lifecycle — from designing robust solutions to building scalable, reliable systems in fast-paced, agile environments.
        </p>
        <p className="mb-4">
          I'm also deeply involved in AI-driven automation tools and creative AI projects that blend technology with imagination 🚀. In addition to my technical expertise, I love pushing boundaries in test infrastructure automation — recently, I built and currently own a <span className="text-blue-400 font-semibold">farm of 100+ automated testbenches</span>, enabling CI/CD integration and ensuring system reliability through <span className="text-blue-400 font-semibold">Ansible</span> and automation workflows.
        </p>
        <p>
          When I'm not coding, I enjoy exploring innovative ways to bridge software with hardware, delivering impactful solutions that improve efficiency and scalability. Check out this page, which I’ve completely built using AI and a few prompts! 🤖✨
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="font-soria mt-10"
      >
        <a
          href="#projects"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium transition-all"
        >
          View My Projects
        </a>
      </motion.div>
    </section>
  );
};

export default About;
