import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import StarryBackground from "./components/StarryBackground";
import NeuralSkillMap from "./components/NeuralSkillMap";

function App() {
  return (
    <div className="relative bg-gray-950 text-gray-100 min-h-screen overflow-hidden">
      <StarryBackground /> {/* 🌌 Global animated background */}
      <div className="relative z-10">
        {/* Foreground Content */}
        <Navbar />
        <section id="hero">
          <Hero />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="skills" className="bg-transparent py-20">
          <NeuralSkillMap />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
    </div>
  );
}

export default App;
