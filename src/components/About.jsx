import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
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
        className="max-w-3xl text-center bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl shadow-lg text-gray-300 p-8 leading-relaxed"
      >
        <p className="mb-4">
          Hi, I'm <span className="text-blue-400 font-semibold">Pushkar Patil</span>, a passionate Software Developer with 2.5+ years of experience in Automotive Software, Automation and Embedded systems.
        </p>
        <p className="mb-4">
          I specialize in <span className="text-blue-400 font-semibold">Python</span>, <span className="text-blue-400 font-semibold">C++</span>, and communication protocols like <span className="text-blue-400 font-semibold">CAN</span> and <span className="text-blue-400 font-semibold">Ethernet</span>. Over the years, I’ve worked across the entire software development lifecycle, from designing and coding to validation and optimization, always aiming to build systems that are reliable, scalable, and efficient.
        </p>
        <p className="mb-4">
          Currently, I’m working on a project where I’ve built and maintain a <span className="text-blue-400 font-semibold">'farm' of 100+ automated testbenches</span>. These benches are used across the organization for testing and validation, with full <span className="text-blue-400 font-semibold">CI/CD</span> integration and ensuring automated health monitoring using <span className="text-blue-400 font-semibold">Ansible</span> and other custom workflows.
        </p>
        <p className="mb-4">
          Beyond my core work, I love exploring <span className="text-blue-400 font-semibold">AI</span>-driven automation tools and creative AI projects that blend technology with imagination 🚀. When I’m not coding, I’m usually experimenting with ideas that connect software and hardware, anything that challenges me to think differently.
        </p>
        <p>
          This page is just a small reflection of that curiosity. I've made it to showcase what’s possible when creativity meets the right tools 🤖✨
        </p>
      </motion.div>

      {/* CTA Button */}
      {/* <motion.div
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
      </motion.div> */}
    </section>
  );
};

export default About;
