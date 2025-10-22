import React from "react";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "AI Historical Facts Script Generator",
    description:
      "Python-based tool that fetches historical facts or tips from Wikipedia, summarizes them using transformers, and generates narratable scripts.",
    tech: ["Python", "Transformers", "NLP"],
    github: "https://github.com/yourusername/project1",
    demo: "#",
  },
  {
    title: "Embedded CAN Bus Monitor",
    description:
      "Developed an embedded application to monitor and decode automotive CAN messages in real-time with diagnostic support.",
    tech: ["C", "Embedded Systems", "Automotive"],
    github: "https://github.com/yourusername/project2",
    demo: "#",
  },
  {
    title: "AI-powered Jira Tracker",
    description:
      "Prototype for an AI assistant that extracts, summarizes, and predicts Jira ticket trends for agile teams using ML.",
    tech: ["React", "Python", "Flask", "AI"],
    github: "https://github.com/yourusername/project3",
    demo: "#",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="px-6 md:px-20 py-20 flex flex-col justify-center items-center bg-transparent text-gray-100"
    >
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold mb-12 text-cyan-400 text-center"
      >
        Projects
      </motion.h2>

      <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-10 w-full max-w-7xl">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ scale: 1.05, y: -6 }}
            className="glass p-8 rounded-2xl shadow-lg border border-white/10 hover:shadow-cyan-500/20 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-cyan-300 mb-3">
              {project.title}
            </h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="bg-white/5 text-gray-200 text-xs px-3 py-1 rounded-full border border-white/10"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-6 mt-4 text-sm">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:text-cyan-300 transition"
              >
                <Github size={18} /> Code
              </a>
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:text-cyan-300 transition"
              >
                <ExternalLink size={18} /> Demo
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
