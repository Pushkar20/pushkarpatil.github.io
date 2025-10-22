import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-[70vh] flex flex-col justify-center items-center bg-gray-900 text-gray-100 px-6 py-16"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-10"
      >
        Contact
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-center text-gray-300 max-w-xl mb-8 leading-relaxed"
      >
        I’m always open to discussing new opportunities, collaborations, or sharing ideas.  
        Feel free to connect with me on any of the platforms below 👇
      </motion.p>

      <div className="flex gap-8 mt-4">
        <motion.a
          href="mailto:pushkarpatil@example.com"
          whileHover={{ scale: 1.15 }}
          className="text-gray-300 hover:text-blue-400 transition flex items-center gap-2"
        >
          <Mail size={24} /> <span>Email</span>
        </motion.a>

        <motion.a
          href="https://linkedin.com/in/pushkarpatil"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          className="text-gray-300 hover:text-blue-400 transition flex items-center gap-2"
        >
          <Linkedin size={24} /> <span>LinkedIn</span>
        </motion.a>

        <motion.a
          href="https://github.com/pushkarpatil"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.15 }}
          className="text-gray-300 hover:text-blue-400 transition flex items-center gap-2"
        >
          <Github size={24} /> <span>GitHub</span>
        </motion.a>
      </div>

      <p className="text-sm text-gray-500 mt-10">
        © {new Date().getFullYear()} Pushkar Patil — Built with React & Tailwind
      </p>
    </section>
  );
};

export default Contact;
