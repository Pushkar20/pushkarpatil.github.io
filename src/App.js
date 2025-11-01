import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import StarryBackground from "./components/StarryBackground";
import Skills from "./components/Skills";

function App() {
  useEffect(() => {
    document.title = "Pushkar Patil - Interactive Resume";
  }, []);
  return (
    <div className="relative bg-gray-950 text-gray-100 min-h-screen overflow-hidden">
      <StarryBackground /> {/* 🌌 Global animated background */}
      <div className="relative z-10">
        {/* Foreground Content */}
        <Navbar />
        <section id="hero">
          <Hero />
        </section>
        
        <section id="about">
          <About />
        </section>

        <section id="experience">
          <Experience />
        </section>

        <section id="skills">
          <Skills />
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
