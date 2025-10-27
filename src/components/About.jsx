import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      // Removed solid background — only use slight transparency for blending with stars
      className="relative text-gray-200 py-24 px-6 flex flex-col items-center"
    >
      {/* About Me Heading */}
      <motion.h3
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="font-nevis text-4xl font-bold mt-8 mb-10 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
      >
        About Me
      </motion.h3>

      {/* About Me Box */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        // soft glass look (not solid, not too dark)
        className="font-nevis max-w-3xl text-center text-gray-300 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg p-8 leading-relaxed"
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
        className="font-nevis mt-10"
      >
        <a
          href="#projects"
          className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-white px-6 py-3 rounded-full text-lg font-medium transition-all shadow-md"
        >
          View My Projects
        </a>
      </motion.div>
    </section>
  );
};

export default About;
