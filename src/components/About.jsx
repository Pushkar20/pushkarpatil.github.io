import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center bg-gray-50 text-gray-800 px-6 py-16"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-6"
      >
        About Me
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-3xl bg-white shadow-lg rounded-2xl p-8 text-center"
      >
        <p className="text-lg leading-relaxed">
          Hi, I’m <span className="font-semibold text-blue-600">Pushkar Patil</span>, 
          a passionate <span className="font-semibold">Software Developer</span> 
          with experience in <span className="font-semibold">Embedded Systems</span> 
          and <span className="font-semibold">Automotive Software</span>. 
          I enjoy designing efficient, scalable, and impactful solutions that 
          bridge software and hardware systems.
        </p>
        <p className="text-lg mt-4 leading-relaxed">
          When I’m not coding, I explore AI-driven automation tools, 
          learn about tech innovations, or work on projects that blend creativity 
          with technology.
        </p>
      </motion.div>
    </section>
  );
};

export default About;
