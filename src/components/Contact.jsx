import React from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github } from "lucide-react";

const Contact = () => {
  return (
    <footer
      id="contact"
      className="bg-gray-900 text-gray-300 py-12 flex flex-col items-center border-t border-gray-800"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-semibold mb-6 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
      >
        Let's Connect
      </motion.h2>

      <div className="flex gap-6 mb-4">
        <a href="mailto:your@email.com" className="hover:text-blue-400 transition">
          <Mail />
        </a>
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition"
        >
          <Linkedin />
        </a>
        <a
          href="https://github.com/yourusername"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-blue-400 transition"
        >
          <Github />
        </a>
      </div>

      <p className="text-s text-gray-500">
        (This is still a work in progress. I'm exploring Node.js via this 😉)
      </p>

      <p className="text-xs text-gray-500">
        © {new Date().getFullYear()} Pushkar Patil — Built with React & Tailwind
      </p>
    </footer>
  );
};

export default Contact;
