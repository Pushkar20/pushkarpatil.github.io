import React, { useEffect } from "react";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import StarryBackground from "./components/StarryBackground";
import NeuralSkillMap from "./components/NeuralSkillMap";

function App() {
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @font-face {
        font-family: 'OstrichSansFont';
        src: url(${process.env.PUBLIC_URL}/fonts/OstrichSansInline-Regular.otf) format('opentype');
      }
      @font-face {
        font-family: 'SoriaFont';
        src: url(${process.env.PUBLIC_URL}/fonts/soria-font.ttf) format('truetype');
      }
      @font-face {
        font-family: 'SkyscrapersFont';
        src: url(${process.env.PUBLIC_URL}/fonts/Skyscapers.ttf) format('truetype');
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <div className="relative bg-gray-950 text-gray-100 min-h-screen overflow-hidden">
      <StarryBackground /> {/* 🌌 Global animated background */}
      <div className="relative z-10">
        {/* Foreground Content */}
        <Navbar />
        <section id="about">
          <About />
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
