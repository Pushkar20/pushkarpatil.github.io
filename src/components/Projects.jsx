import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "AI Historical Facts Script Generator",
    description:
      "A Python-based tool that fetches historical facts from Wikipedia, summarizes them using transformers, and generates narratable scripts.",
    tech: ["Python", "Transformers", "NLP"],
    github: "https://github.com/yourusername/project1",
  },
  {
    title: "Embedded CAN Bus Monitor",
    description:
      "An embedded application that monitors and decodes CAN messages in real time with diagnostics support.",
    tech: ["C", "Embedded Systems", "Automotive"],
    github: "https://github.com/yourusername/project2",
  },
  {
    title: "AI-powered Jira Tracker",
    description:
      "An AI assistant that extracts, summarizes, and predicts Jira ticket trends for agile teams.",
    tech: ["React", "Flask", "Machine Learning"],
    github: "https://github.com/yourusername/project3",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative bg-gray-950 text-gray-200 py-20 px-6 flex flex-col items-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-10 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
      >
        Projects
      </motion.h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {projects.map((p, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ scale: 1.03, rotate: 1 }}
            className="bg-gray-900/40 backdrop-blur-md border border-gray-800 rounded-2xl shadow-lg hover:shadow-blue-500/30 p-6 transition-all"
          >
            <h3 className="text-xl font-semibold mb-2 text-blue-400">{p.title}</h3>
            <p className="text-gray-300 text-sm mb-4">{p.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {p.tech.map((t, j) => (
                <span
                  key={j}
                  className="bg-gray-800 text-gray-200 text-xs px-3 py-1 rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              <a
                href={p.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition"
              >
                <Github size={18} /> <span>Code</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition"
              >
                <ExternalLink size={18} /> <span>Demo</span>
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
